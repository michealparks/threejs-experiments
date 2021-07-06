import {assets} from "../core/assets.js";
import {Color} from "../_snowpack/pkg/three.js";
import {gl} from "../core/gl.js";
import {orbitControls} from "../core/orbitControls.js";
import {utils} from "./utils.js";
export const init = async () => {
  gl.ambientLight.intensity = 0.95;
  gl.camera.position.set(20, 2, 15);
  orbitControls.target.y = 3;
  const light = utils.createSpotLight();
  light.color = new Color(0, 89, 255);
  light.intensity = 2;
  light.position.set(2.6, 18, -8.6);
  gl.scene.add(light);
  await assets.queue("spooky_house.glb").load();
  const house = assets.get("spooky_house.glb").scene;
  gl.scene.add(house);
  const moon = house.getObjectByName("Moon");
  moon.material.color.set(new Color(16777215));
  moon.needsUpdate = true;
  const frame = () => {
    orbitControls.update();
  };
  gl.setAnimationLoop(frame);
  return () => {
    orbitControls.target.y = 0;
    gl.scene.remove(house, light);
    gl.setAnimationLoop(null);
  };
};
