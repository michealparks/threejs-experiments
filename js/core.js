
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/controls/OrbitControls.js'
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@v0.120.0/examples/jsm/webxr/VRButton.js'
import { COLORS } from './constants.js'

export {
  THREE,
  GLTFLoader,
  OrbitControls,
  VRButton
}

export const createRenderer = (canvas, alpha) => {
  const antialias = true
  const powerPreference = 'high-performance'
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha,
    antialias,
    powerPreference
  })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.VSMShadowMap

  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.physicallyCorrectLights = true

  return renderer
}

export const createCamera = (config = {}) => {
  const {
    fov = 75,
    aspect = 2,
    near = 0.01,
    far = 10,
    position = { x: 1, y: 2, z: 2.5 }
  } = config

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(position.x, position.y, position.z)

  return camera
}

export const renderToDisplaySize = (canvas, renderer, scene, camera) => {
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
  const width = canvas.clientWidth * pixelRatio | 0
  const height = canvas.clientHeight * pixelRatio | 0

  if (canvas.width === width && canvas.height === height) {
    return composer.render(scene, camera)
  }

  renderer.setSize(width, height, false)
  composer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  composer.render(scene, camera)
}

export const createCore = (config = {}) => {
  const {
    canvas,
    alpha = false,
    ambientLight = 0.6
  } = config

  const renderer = createRenderer(canvas, alpha)
  const camera = createCamera(config.camera)
  const scene = new THREE.Scene()

  let rafid, callback, composer

  const render = (time) => {
    rafid = window.requestAnimationFrame(render)
    callback(time, canvas, renderer, scene, camera)
    renderToDisplaySize(canvas, renderer, scene, camera)
  }

  const renderComposer = (time) => {
    rafid = window.requestAnimationFrame(renderComposer)
    callback(time)
    renderComposerToDisplaySize(canvas, renderer, composer, scene, camera)
  }

  const setAnimationLoop = (config) => {
    callback = config.frame
    composer = config.composer

    if (composer) {
      const pixelRatio = window.devicePixelRatio
      const width = canvas.clientWidth * pixelRatio | 0
      const height = canvas.clientHeight * pixelRatio | 0
      composer.setSize(width, height, false)
      rafid = window.requestAnimationFrame(renderComposer)
    } else {
      rafid = window.requestAnimationFrame(render)
    }
  }

  const stopAnimationLoop = () => {
    window.cancelAnimationFrame(rafid)
  }

  if (ambientLight > 0.0) {
    const light = new THREE.AmbientLight(COLORS.warmLight, ambientLight)
    scene.add(light)
  }

  return {
    renderer,
    camera,
    scene,
    setAnimationLoop,
    stopAnimationLoop
  }
}

export const createOrbitControls = ({ renderer, camera, rotate = true }) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.autoRotate = rotate
  return controls
}

export const createCube = (config = {}) => {
  const {
    size = 1,
    color = 0x44aa88,
    mat = new THREE.MeshPhongMaterial({ color })
  } = config

  const geo = new THREE.BoxBufferGeometry(size, size, size)
  return new THREE.Mesh(geo, mat)
}

export const createSkySphere = (config = {}) => {
  const {
    size = 80,
    segments = 4,
    mat = new THREE.MeshPhongMaterial({ color: 0x29B6F6 })
  } = config

  mat.side = THREE.BackSide

  const geo = new THREE.SphereGeometry(size, segments, segments)
  return new THREE.Mesh(geo, mat)
}
