import {Vector3} from "../_snowpack/pkg/three.js";
import {gl} from "../core/gl.js";
import {assets} from "../core/assets.js";
import {orbitControls} from "../core/orbitControls.js";
import {utils} from "./utils.js";
export const init = async () => {
  gl.camera.position.set(-10, 10, -10);
  gl.camera.lookAt(new Vector3());
  assets.queue("room_1.glb");
  await assets.load();
  const room = assets.get("room_1.glb").scene;
  gl.scene.add(room);
  const light = utils.createPointLight();
  light.intensity = 3;
  light.position.set(1, 4, 1);
  gl.scene.add(light);
  const frame = (dt) => {
    orbitControls.update();
  };
  gl.ambientLight.intensity = 0.5;
  gl.setAnimationLoop(frame);
  return () => {
    gl.scene.remove(room, light);
    gl.setAnimationLoop(null);
  };
};
