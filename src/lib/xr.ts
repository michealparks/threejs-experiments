import type {
  WebGLRenderer,
  Scene
} from 'three'

import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
import type { XRHandPrimitiveModelOptions } from 'three/examples/jsm/webxr/XRHandPrimitiveModel'

const xrEnabled = () => {
  return (
    'xr' in navigator &&
    navigator.xr?.isSessionSupported('immersive-vr')
  )
}

const initControls = (renderer: WebGLRenderer, scene: Scene) => {
  const controllerModelFactory = new XRControllerModelFactory()
  const handModelFactory = new XRHandModelFactory()

  handModelFactory.setPath('/assets/fbx/')

  for (const i of [0, 1]) {
    const controllerGrip = renderer.xr.getControllerGrip(i)
    controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip))
    scene.add(controllerGrip)

    const hand = renderer.xr.getHand(i)
    scene.add(hand)

    const options: XRHandPrimitiveModelOptions = {}
    const model = handModelFactory.createHandModel(hand, 'mesh', options)
    hand.add(model)
  }
}

const createXRButton = (renderer: WebGLRenderer, scene: Scene): HTMLButtonElement => {
  const TEXT = {
    enter: 'ENTER VR',
    exit: 'EXIT VR'
  }

  const button = document.createElement('button')
  button.id = 'XRButton'
  button.className = 'xr-button'
  button.textContent = TEXT.enter

  let currentSession: XRSession | undefined

  const handleSessionEnd = () => {
    button.textContent = TEXT.enter
    currentSession = undefined
  }

  button.onclick = async () => {
    if (currentSession) {
      return currentSession.end()
    }

    if (!navigator.xr) {
      return
    }

    // WebXR's requestReferenceSpace only works if the corresponding feature
    // was requested at session creation time. For simplicity, just ask for
    // the interesting ones as optional features, but be aware that the
    // requestReferenceSpace call will fail if it turns out to be unavailable.
    // ('local' is always available for immersive sessions and doesn't need to
    // be requested separately.)
    const sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'] }
    const session = await navigator.xr.requestSession('immersive-vr', sessionInit)

    session.addEventListener('end', handleSessionEnd, { once: true })

    renderer.xr.setSession(session)

    button.textContent = TEXT.enter

    currentSession = session

    initControls(renderer, scene)
  }

  return button
}

export {
  xrEnabled,
  createXRButton
}
