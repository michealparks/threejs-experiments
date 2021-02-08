import {
  UnsignedByteType,
  PMREMGenerator,
  InstancedMesh,
  Matrix4
} from "../_snowpack/pkg/three.js";
import {RGBELoader} from "../_snowpack/pkg/three/examples/jsm/loaders/RGBELoader.js";
import {gl} from "../core/gl.js";
import {assets} from "../core/assets.js";
import {orbitControls} from "../core/orbitControls.js";
const HDR = {
  overpass: "https://threejs.org/examples/textures/equirectangular/pedestrian_overpass_1k.hdr",
  quarry: "https://threejs.org/examples/textures/equirectangular/quarry_01_1k.hdr",
  spot: "https://threejs.org/examples/textures/equirectangular/spot1Lux.hdr",
  sunset: "https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr"
};
const randNum = (range) => {
  return Math.random() * range * 2 - range;
};
const loadRGBE = (url) => {
  return new Promise((resolve) => {
    return new RGBELoader().setDataType(UnsignedByteType).load(url, resolve);
  });
};
export const init = async () => {
  gl.ambientLight.intensity = 0.5;
  const texture = await loadRGBE(HDR.sunset);
  const pmremGenerator = new PMREMGenerator(gl.renderer);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  gl.scene.background = envMap;
  gl.scene.environment = envMap;
  texture.dispose();
  pmremGenerator.dispose();
  await assets.queue("mug.glb").load();
  const n = 300;
  const mesh = assets.get("mug.glb").scene.getObjectByName("Mug");
  const instancedMesh = new InstancedMesh(mesh.geometry, mesh.material, n);
  const matrix = new Matrix4();
  let i = 0;
  while (i < n) {
    matrix.setPosition(randNum(4), randNum(4), randNum(4));
    instancedMesh.setMatrixAt(i, matrix);
    i += 1;
  }
  gl.scene.add(instancedMesh);
  const frame = () => {
    orbitControls.update();
  };
  gl.setAnimationLoop(frame);
  return () => {
    gl.scene.remove(instancedMesh);
    gl.scene.background = null;
    gl.scene.environment = null;
    gl.setAnimationLoop(null);
  };
};
