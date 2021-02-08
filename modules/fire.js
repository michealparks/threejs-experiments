import {Object3D, InstancedMesh} from "../_snowpack/pkg/three.js";
import {utils} from "./utils.js";
const NUM = 100;
const dummy = new Object3D();
const embers = [];
const init = (parent, templates) => {
  for (const template of templates) {
    template.matrixAutoUpdate = true;
    template.position.set(0, 0, 0);
    if (Array.isArray(template.material)) {
      throw new Error();
    }
    const mesh = new InstancedMesh(template.geometry.clone(), template.material.clone(), NUM);
    const obj = {
      mesh,
      p: new Float32Array(NUM * 3),
      r: new Float32Array(NUM * 3),
      s: new Float32Array(NUM),
      pv: new Float32Array(NUM * 3),
      sv: new Float32Array(NUM * 3)
    };
    mesh.position.set(0, 0.5, 0);
    let i = 0;
    while (i < NUM) {
      setPropsAtIndex(i, obj);
      i += 1;
    }
    embers.push(obj);
    parent.add(mesh);
  }
};
const setPropsAtIndex = (i, ember) => {
  const ii = i * 3;
  const [px, py] = utils.randPointInCircle(1.25);
  ember.p[ii + 0] = px;
  ember.p[ii + 1] = utils.randNumInRange(0.1, 0.75);
  ember.p[ii + 2] = py;
  ember.s[i] = 1;
  ember.sv[i] = utils.randNumInRange(-0.1, -0.03);
  ember.pv[ii + 0] = utils.randNumInRange(-0.01, 0.05);
  ember.pv[ii + 1] = utils.randNumInRange(0.01, 0.05);
  ember.pv[ii + 2] = utils.randNumInRange(-0.01, 0.05);
};
const update = (dt) => {
  for (const ember of embers) {
    const {mesh, p, s, pv, sv} = ember;
    let i = 0;
    while (i < NUM) {
      const ii = i * 3;
      s[i] += sv[i];
      if (s[i] <= 0) {
        setPropsAtIndex(i, ember);
      }
      p[ii + 0] += pv[ii + 0];
      p[ii + 1] += pv[ii + 1];
      p[ii + 2] += pv[ii + 2];
      dummy.position.set(p[ii], p[ii + 1], p[ii + 2]);
      dummy.scale.set(s[i], s[i], s[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      i += 1;
    }
    mesh.instanceMatrix.needsUpdate = true;
  }
};
export const fire = {init, update};
