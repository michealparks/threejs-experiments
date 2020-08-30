import { THREE } from './core.js'
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/shaders/FXAAShader.js'

let isWebGL2

const createComposer = (renderer, scene, camera, MXAA) => {
  isWebGL2 = renderer.capabilities.isWebGL2

  let composer

  if (isWebGL2 === false) {
    composer = new EffectComposer(renderer)
  } else {
    const size = renderer.getDrawingBufferSize(new THREE.Vector2())
    const renderTarget = new THREE.WebGLMultisampleRenderTarget(
      size.width,
      size.height,
      { format: THREE.RGBFormat, stencilBuffer: false }
    )

    renderTarget.samples = 16

    composer = new EffectComposer(renderer, renderTarget)
  }

  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)
  return composer
}

const setBloomPass = ({ composer, strength = 1.5, radius = 0.4, threshold = 0.85 }) => {
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    strength,
    radius,
    threshold
  )

  composer.addPass(bloomPass)

  return bloomPass
}

const setFxaaPass = (composer) => {
  const fxaaPass = new ShaderPass(FXAAShader)
  fxaaPass.material.uniforms.resolution.value.x = 1 / (window.innerWidth * window.devicePixelRatio)
  fxaaPass.material.uniforms.resolution.value.y = 1 / (window.innerHeight * window.devicePixelRatio)
  composer.addPass(fxaaPass)

  return fxaaPass
}

export const postprocessing = {
  createComposer,
  setBloomPass,
  setFxaaPass
}
