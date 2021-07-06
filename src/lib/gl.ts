import {
  AmbientLight,
  AudioListener,
  Clock,
  Scene,
  PerspectiveCamera
} from 'three'

import Stats from '@drecom/stats.js'
import TWEEN from '@tweenjs/tween.js'
import Renderer from './renderer'

import {
  COLOR_AMBIENT_LIGHT,
} from './constants'

type Callback = { (...any): void }

const intensity = 1.0

export class GL {
  clock = new Clock()
  listener = new AudioListener()
  ambientLight = new AmbientLight(COLOR_AMBIENT_LIGHT, intensity)

  renderer: Renderer
  stats: Stats
  scene: Scene
  camera: PerspectiveCamera
  canvas: HTMLCanvasElement | OffscreenCanvas
  fn: Callback

  constructor (canvas: HTMLCanvasElement | OffscreenCanvas) {
    this.renderer = new Renderer(canvas)
    this.scene = this.renderer.scene
    this.camera = this.renderer.camera
    this.canvas = this.renderer.canvas

    if (import.meta.env.MODE === 'development') {
      this.stats = new Stats({ maxFPS: Infinity, maxMem: Infinity })
      document.body.appendChild(this.stats.dom)
    }
  }

  init = async () => {
    await this.renderer.init()
    this.renderer.camera.add(this.listener)
    this.renderer.scene.add(this.ambientLight)
  }

  update = () => {
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

  setAnimationLoop = (frame: Callback | null) => {
    if (frame !== null) {
      this.fn = frame
    }
  
    this.renderer.setAnimationLoop(this.update)
  }
}
