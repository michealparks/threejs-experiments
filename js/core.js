import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.119.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@v0.119.0/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@v0.119.0/examples/jsm/loaders/GLTFLoader.js'
import { COLORS } from './constants.js'

const loader = new GLTFLoader()

export const loadGLSL = async (src) => {
  const response = await window.fetch(src)
  const glsl = await response.text()
  return glsl
}

export const loadGLTF = async (src) => {
  const model = await loader.loadAsync(src)

  // @TODO: some nice features like adding shadows, etc

  return model
}

export const createRenderer = (canvas) => {
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

  return renderer
}

export const createCamera = ({
  fov = 75,
  aspect = 2,
  near = 0.01,
  far = 10
}) => {
  return new THREE.PerspectiveCamera(fov, aspect, near, far)
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

export const createCore = ({
  canvas,
  camera: cameraConfig = {},
  ambientLight = 0.6
}) => {
  const renderer = createRenderer(canvas)
  const camera = createCamera(cameraConfig)
  const scene = new THREE.Scene()

  const render = (fn, time) => {
    fn(time, canvas, renderer, scene, camera)
    renderToDisplaySize(canvas, renderer, scene, camera)
  }

  const setAnimationLoop = (fn) => {
    renderer.setAnimationLoop(fn === undefined ? null : render.bind(undefined, fn))
  }
  if (ambientLight > 0.0) {
    const light = new THREE.AmbientLight(COLORS.warmLight, ambientLight)
    scene.add(light)
  }

  return {
    renderer,
    camera,
    scene,
    setAnimationLoop
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
