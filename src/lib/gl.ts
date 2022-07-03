import * as THREE from 'three'
import Stats from '@drecom/stats.js'
import TWEEN from '@tweenjs/tween.js'

import {
	EffectComposer,
	RenderPass,
	EffectPass,
	SMAAEffect,
	SMAAPreset,
  BloomEffect,
  KernelSize,
	Effect
} from 'postprocessing'

import {
  COLOR_AMBIENT_LIGHT,
} from './constants'

type Callback = { (delta: number, elapsed: number): void }

const intensity = 1

export const GL = (canvasElement?: HTMLCanvasElement, bloomIntensity = 1, effects?: Effect[]) => {
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
  const scene = new THREE.Scene()
  const clock = new THREE.Clock()
  const listener = new THREE.AudioListener()
  const ambientLight = new THREE.AmbientLight(COLOR_AMBIENT_LIGHT, intensity)
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  })
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.physicallyCorrectLights = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const canvas = renderer.domElement

  if (!canvasElement) {
    canvas.id = 'renderer'
    document.body.append(canvas)
  }

  const composer = new EffectComposer(renderer, {
    frameBufferType: THREE.HalfFloatType
  })

  const smaaEffect = new SMAAEffect({
    preset: SMAAPreset.ULTRA
  })

  const bloomEffect = new BloomEffect({
    height: 480,
    intensity: bloomIntensity,
    kernelSize: KernelSize.VERY_LARGE
  })

  composer.addPass(new RenderPass(scene, camera))

  composer.addPass(new EffectPass(
    camera,
    smaaEffect,
    bloomEffect,
    ...(effects ?? [])
  ))

  let stats: Stats
  let callback: Callback

  camera.add(listener)
  scene.add(ambientLight)

  if (import.meta.env.MODE === 'development') {
    stats = new Stats({ maxFPS: Number.POSITIVE_INFINITY, maxMem: Number.POSITIVE_INFINITY })
    document.body.append(stats.dom)
  }

  const update = (): void => {
    if (import.meta.env.MODE === 'development') {
      stats.begin()
    }
  
    const dt = clock.getDelta()
    const elapsed = clock.getElapsedTime()
  
    TWEEN.update()

    const delta = clock.getDelta()
		const dpi = Math.min(devicePixelRatio, 2)
		const width = canvas.clientWidth * dpi | 0
		const height = canvas.clientHeight * dpi | 0

		if (canvas.width === width && canvas.height === height) {
			composer.render(delta)
		} else {
			camera.aspect = width / height

			camera.updateProjectionMatrix()
			renderer.setSize(width, height, false)
			composer.setSize(width, height, false)
		}

    callback(dt, elapsed)
  
    if (import.meta.env.MODE === 'development') {
      stats.end()
    }
  }

  const setAnimationLoop = (frame: Callback | null): void => {
    if (frame !== null) {
      callback = frame
    }
  
    renderer.setAnimationLoop(update)
  }

  return {
    canvas,
    scene,
    camera,
    renderer,
    ambientLight,
    setAnimationLoop
  }
}
