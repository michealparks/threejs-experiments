import { VRButton } from './core.js'

export const initXR = async ({ renderer }) => {
  if (await navigator.xr.isSessionSupported('immersive-vr')) {
    renderer.xr.enabled = true
    document.body.appendChild(VRButton.createButton(renderer))
  }
}
