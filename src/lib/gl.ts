import * as THREE from 'three'
import Stats from '@drecom/stats.js'
import TWEEN from '@tweenjs/tween.js'
import Renderer from './renderer'

import {
  COLOR_AMBIENT_LIGHT,
} from './constants'

type Callback = { (...any): void }

const intensity = 1.0

export class GL {
  clock = new THREE.Clock()
  listener = new THREE.AudioListener()
  ambientLight = new THREE.AmbientLight(COLOR_AMBIENT_LIGHT, intensity)

  renderer: Renderer
  stats: Stats
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  canvas: HTMLCanvasElement
  fn: Callback

  constructor (canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas)
    this.scene = this.renderer.scene
    this.camera = this.renderer.camera
    this.canvas = this.renderer.canvas

    if (import.meta.env.MODE === 'development') {
      this.stats = new Stats({ maxFPS: Infinity, maxMem: Infinity })
      document.body.appendChild(this.stats.dom)
    }
  }

  init = async (config = {}): Promise<void> => {
    await this.renderer.init(config)
    this.renderer.camera.add(this.listener)
    this.renderer.scene.add(this.ambientLight)
  }

  update = (): void => {
    if (import.meta.env.MODE === 'development') {
      this.stats.begin()
    }
  
    const dt = this.clock.getDelta()
    const elapsed = this.clock.getElapsedTime()
  
    TWEEN.update()
    this.renderer.update()
  
    this.fn(dt, elapsed)
  
    if (import.meta.env.MODE === 'development') {
      this.stats.end()
    }
  }

  setAnimationLoop = (frame: Callback | null): void => {
    if (frame !== null) {
      this.fn = frame
    }
  
    this.renderer.setAnimationLoop(this.update)
  }
}
