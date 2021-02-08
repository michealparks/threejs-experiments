import {Matrix4, Vector3} from "../_snowpack/pkg/three.js";
import {gl} from "../core/gl.js";
import {utils} from "./utils.js";
import {COLORS} from "./constants.js";
export const init = async () => {
  const light1 = utils.createPointLight();
  light1.intensity = 100;
  light1.position.set(0, 3, 0);
  const light2 = utils.createPointLight();
  light2.intensity = 50;
  light2.position.set(0, 3, 2);
  const light3 = utils.createPointLight();
  light3.intensity = 10;
  light3.position.set(2, 1, 2);
  gl.scene.add(light1, light2, light3);
  const rotationMatrix = new Matrix4().makeRotationX(5e-3).multiply(new Matrix4().makeRotationY(5e-3)).multiply(new Matrix4().makeRotationZ(5e-3));
  const translateMatrix = new Matrix4();
  const numCubes = 27;
  const cubes = [];
  let i = 0;
  const cubeTranslation = (i2, n) => {
    const x2 = i2 % 3 * n - n;
    const y = (i2 % 9 / 3 | 0) * n - n;
    const z = (i2 / 9 | 0) * n - n;
    translateMatrix.makeTranslation(x2, y, z);
  };
  while (i < numCubes) {
    const cube = utils.createCube(1, COLORS.lightBlue);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cubes.push(cube);
    gl.scene.add(cube);
    cubeTranslation(i, 1);
    cube.applyMatrix4(translateMatrix);
    i += 1;
  }
  let x = 0;
  const frame = (dt, elapsed) => {
    x += 0.05;
    gl.camera.applyMatrix4(rotationMatrix);
    for (const [i2, cube] of cubes.entries()) {
      cubeTranslation(i2, Math.sin(x / 2) * 0.01);
      cube.applyMatrix4(translateMatrix);
    }
  };
  gl.camera.position.set(0, 1, 10);
  gl.camera.lookAt(new Vector3());
  gl.setAnimationLoop(frame);
  return () => {
    gl.scene.remove(...cubes, light1, light2, light3);
    gl.setAnimationLoop(null);
  };
};
