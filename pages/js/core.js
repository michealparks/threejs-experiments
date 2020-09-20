
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/controls/OrbitControls.js'
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/webxr/VRButton.js'
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/shaders/FXAAShader.js'

import { COLORS, LIGHTS, CAMERA } from './constants.js'

export {
  THREE,
  GLTFLoader,
  OrbitControls,
  VRButton
}

let frame
let isPostprocessing = false

const canvas = document.querySelector('canvas')
const antialias = true
const powerPreference = 'high-performance'
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias,
  powerPreference
})

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.VSMShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.outputEncoding = THREE.sRGBEncoding
renderer.physicallyCorrectLights = true

const camera = new THREE.PerspectiveCamera(
  CAMERA.fov,
  CAMERA.aspect,
  CAMERA.near,
  CAMERA.farad)

camera.position.set(
  CAMERA.position.x,
  CAMERA.position.y,
  CAMERA.position.z
)

const scene = new THREE.Scene()

const size = renderer.getDrawingBufferSize(new THREE.Vector2())
const renderTarget = new THREE.WebGLMultisampleRenderTarget(
  size.width,
  size.height,
  { format: THREE.RGBFormat, stencilBuffer: false }
)

renderTarget.samples = 16

const composer = new EffectComposer(renderer, renderTarget)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

const setBloomPass = ({ strength = 1.5, radius = 0.4, threshold = 0.85 }) => {
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    strength,
    radius,
    threshold
  )

  composer.addPass(bloomPass)

  return bloomPass
}

const setFxaaPass = () => {
  const fxaaPass = new ShaderPass(FXAAShader)
  fxaaPass.material.uniforms.resolution.value.x = 1 / (window.innerWidth * window.devicePixelRatio)
  fxaaPass.material.uniforms.resolution.value.y = 1 / (window.innerHeight * window.devicePixelRatio)
  composer.addPass(fxaaPass)

  return fxaaPass
}

const renderToDisplaySize = (canvas, renderer, scene, camera) => {
  const pixelRatio = window.devicePixelRatio
  const width = canvas.clientWidth * pixelRatio | 0
  const height = canvas.clientHeight * pixelRatio | 0

  if (canvas.width === width && canvas.height === height) {
    return renderer.render(scene, camera)
  }

  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
}

export const renderComposerToDisplaySize = (canvas, renderer, composer, scene, camera) => {
  const pixelRatio = window.devicePixelRatio
  const { clientWidth, clientHeight } = canvas
  const width = clientWidth * pixelRatio | 0
  const height = clientHeight * pixelRatio | 0

  if (canvas.width === width && canvas.height === height) {
    return composer.render(scene, camera)
  }

  renderer.setSize(clientWidth, clientHeight, false)
  composer.setSize(clientWidth, clientHeight, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  composer.render(scene, camera)
}

const render = (time) => {
  frame(time, canvas, renderer, scene, camera)
  renderToDisplaySize(canvas, renderer, scene, camera)
}

const renderComposer = (time) => {
  frame(time)
  renderComposerToDisplaySize(canvas, renderer, composer, scene, camera)
}

const setAnimationLoop = async (config) => {
  frame = config.frame

  if (frame === null) {
    return renderer.setAnimationLoop(null)
  }

  const isXR = await navigator.xr.isSessionSupported('immersive-vr')

  if (isXR === false && config.postprocessing) {
    const pixelRatio = window.devicePixelRatio
    const width = canvas.clientWidth * pixelRatio | 0
    const height = canvas.clientHeight * pixelRatio | 0
    composer.setSize(width, height, false)
    renderer.setAnimationLoop(renderComposer)
    isPostprocessing = true
  } else {
    renderer.setAnimationLoop(render)
    isPostprocessing = false
  }
}

const ambientLight = new THREE.AmbientLight(
  COLORS.warmLight,
  LIGHTS.ambient.intensity
)

scene.add(ambientLight)

const orbitControls = () => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.autoRotate = true
  return controls
}

const initXR = async () => {
  if (await navigator.xr.isSessionSupported('immersive-vr') === false) {
    return
  }

  renderer.xr.enabled = true
  const xrButton = VRButton.createButton(renderer)
  xrButton.addEventListener('click', () => {
    if (isPostprocessing === false) return

    let fn = frame
    setAnimationLoop(null)
    setAnimationLoop({ frame: fn, postprocessing: false })
  })
  document.body.appendChild(xrButton)
}

const postprocessing = {
  setBloomPass,
  setFxaaPass
}

export {
  renderer,
  camera,
  scene,
  ambientLight,
  postprocessing,
  setAnimationLoop,
  orbitControls,
  initXR
}
