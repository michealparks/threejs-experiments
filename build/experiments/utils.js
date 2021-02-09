import {
  BoxBufferGeometry,
  MeshPhongMaterial,
  Mesh,
  PointLight,
  SpotLight,
  HemisphereLight,
  DirectionalLight,
  SphereGeometry,
  BackSide
} from "../_snowpack/pkg/three.js";
import {COLORS, SHADOW_MAP} from "./constants.js";
const createCube = (size = 1, color = 4500104) => {
  return new Mesh(new BoxBufferGeometry(size, size, size), new MeshPhongMaterial({color}));
};
const createPointLight = () => {
  const intensity = 3;
  const color = COLORS.warmLight;
  const light = new PointLight(color, intensity);
  light.castShadow = true;
  light.shadow.mapSize.width = SHADOW_MAP.width;
  light.shadow.mapSize.height = SHADOW_MAP.height;
  light.shadow.radius = 8;
  light.shadow.bias = -1e-4;
  return light;
};
const createSpotLight = () => {
  const intensity = 5;
  const light = new SpotLight(COLORS.warmLight, intensity);
  light.castShadow = true;
  light.angle = 50;
  light.penumbra = 1;
  light.shadow.mapSize.width = SHADOW_MAP.width;
  light.shadow.mapSize.height = SHADOW_MAP.height;
  light.shadow.radius = 8;
  light.shadow.bias = -1e-4;
  return light;
};
const createHemisphereLight = () => {
  const intensity = 0.3;
  const light = new HemisphereLight(COLORS.white, intensity);
  return light;
};
const createDirectionalLight = () => {
  const intensity = 1;
  const light = new DirectionalLight(COLORS.white, intensity);
  return light;
};
export const createSkySphere = (size = 80, segments = 12) => {
  const mat = new MeshPhongMaterial({color: 2733814});
  const geo = new SphereGeometry(size, segments, segments);
  mat.side = BackSide;
  return new Mesh(geo, mat);
};
const clearScene = (scene) => {
  const toDelete = new Set();
  scene.traverse((obj) => {
    toDelete.add(obj);
  });
  for (const obj of toDelete) {
    scene.remove(obj);
    if (obj instanceof Mesh) {
      obj.geometry.dispose();
      if (Array.isArray(obj.material)) {
        for (const m of obj.material) {
          m.dispose();
        }
      } else {
        obj.material.dispose();
      }
    }
  }
};
export const utils = {
  createCube,
  createPointLight,
  createSpotLight,
  createHemisphereLight,
  createDirectionalLight,
  createSkySphere,
  clearScene
};
