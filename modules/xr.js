import {XRControllerModelFactory} from "../_snowpack/pkg/three/examples/jsm/webxr/XRControllerModelFactory.js";
import {XRHandModelFactory} from "../_snowpack/pkg/three/examples/jsm/webxr/XRHandModelFactory.js";
const xrEnabled = () => {
  return "xr" in navigator && navigator.xr.isSessionSupported("immersive-vr");
};
const initControls = (renderer, scene) => {
  const controllerModelFactory = new XRControllerModelFactory();
  const handModelFactory = new XRHandModelFactory();
  handModelFactory.setPath("/assets/fbx/");
  for (const i of [0, 1]) {
    const controllerGrip = renderer.xr.getControllerGrip(i);
    controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
    scene.add(controllerGrip);
    const hand = renderer.xr.getHand(i);
    scene.add(hand);
    const model = handModelFactory.createHandModel(hand, "oculus", {model: "lowpoly"});
    hand.add(model);
  }
};
const createXRButton = (renderer, scene) => {
  const TEXT = {
    enter: "ENTER VR",
    exit: "EXIT VR"
  };
  const button = document.createElement("button");
  button.id = "XRButton";
  button.className = "xr-button";
  button.textContent = TEXT.enter;
  let currentSession = null;
  const handleSessionEnd = () => {
    button.textContent = TEXT.enter;
    currentSession = null;
  };
  button.onclick = async () => {
    if (currentSession === null) {
      const sessionInit = {optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"]};
      const session = await navigator.xr.requestSession("immersive-vr", sessionInit);
      session.addEventListener("end", handleSessionEnd, {once: true});
      renderer.xr.setSession(session);
      button.textContent = TEXT.enter;
      currentSession = session;
      initControls(renderer, scene);
    } else {
      currentSession.end();
    }
  };
  return button;
};
export {
  xrEnabled,
  createXRButton
};
