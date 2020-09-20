const createXRButton = (renderer) => {
  const TEXT = {
    enter: 'ENTER VR',
    exit: 'EXIT VR'
  }

  const button = document.createElement('button')
  button.id = 'XRButton'
  button.className = 'xr-button'
  button.textContent = TEXT.enter

  let currentSession = null

  const handleSessionEnd = () => {
    button.textContent = TEXT.enter
    currentSession = null
  }

  button.onclick = async () => {
    console.log(currentSession)
    if (currentSession === null) {
      console.log('here')
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
    } else {
      currentSession.end()
    }
  }

  return button
}

export { createXRButton }
