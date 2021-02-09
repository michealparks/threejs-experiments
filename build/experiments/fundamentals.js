import {SpotLight} from "../_snowpack/pkg/three.js";
import {COLORS} from "./constants.js";
import {gl} from "../core/gl.js";
import {utils} from "./utils.js";
export const init = () => {
  const cube = utils.createCube();
  gl.scene.add(cube);
  gl.camera.position.set(3, 3, 3);
  gl.camera.lookAt(cube.position);
  {
    const intensity = 5;
    const light = new SpotLight(COLORS.warmLight, intensity);
    light.castShadow = true;
    light.position.set(1.2, 1, 1.2);
    light.target.position.set(0, 0, 0);
    gl.scene.add(light);
  }
  const frame = (dt) => {
    cube.rotation.x += dt;
    cube.rotation.y += dt;
  };
  gl.setAnimationLoop(frame);
  return () => {
    gl.scene.remove(cube);
    gl.setAnimationLoop(null);
  };
};
