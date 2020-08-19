import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.119.0/build/three.module.js'
import { COLORS } from './constants.js'

const createRenderer = (canvas) => {
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

const createCamera = () => {
  const fov = 75
  const aspect = 2
  const near = 0.01
  const far = 10
  return new THREE.PerspectiveCamera(fov, aspect, near, far)
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

export const createCore = ({ canvas, ambientLight = 0.6 }) => {
  const renderer = createRenderer(canvas)
  const camera = createCamera()
  const scene = new THREE.Scene()

  const render = (fn, time) => {
    fn(time)
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
