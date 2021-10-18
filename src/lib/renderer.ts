import * as THREE from 'three'

import {
	EffectComposer,
	RenderPass,
	EffectPass,
	SMAAImageLoader,
	SMAAEffect,
	SMAAPreset,
  BloomEffect,
  KernelSize,
	Effect
} from '../../node_modules/postprocessing/build/postprocessing.esm'

interface Config {
	bloomIntensity?: number
	effects?: Effect[]
}

export default class Renderer extends THREE.WebGLRenderer {
	clock = new THREE.Clock()
	scene = new THREE.Scene()
	zoom = 10
	near = 0.1
	far = 1000
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
  canvas: HTMLCanvasElement

	composer: EffectComposer

	constructor (canvas: HTMLCanvasElement) {
		super({
      canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    })

    this.canvas = canvas
		this.toneMapping = THREE.ACESFilmicToneMapping
		this.toneMappingExposure = 1
		this.outputEncoding = THREE.sRGBEncoding
		this.physicallyCorrectLights = true
		this.shadowMap.enabled = true
		this.shadowMap.type = THREE.PCFSoftShadowMap

		this.composer = new EffectComposer(this, {
			frameBufferType: THREE.HalfFloatType
		})
	}

	async init (config: Config): Promise<void> {
		const smaaImageLoader = new SMAAImageLoader()

		const [search, area] = await new Promise((resolve) =>
			smaaImageLoader.load(resolve)
		)

		const smaaEffect = new SMAAEffect(search, area, SMAAPreset.ULTRA)

    const bloomEffect = new BloomEffect({
      height: 480,
      intensity: config.bloomIntensity ?? 1,
      kernelSize: KernelSize.VERY_LARGE
    })

		this.composer.addPass(new RenderPass(this.scene, this.camera))
		this.composer.addPass(new EffectPass(
			this.camera,
			smaaEffect,
			bloomEffect,
			...(config.effects ?? [])
		))
	}

	update = (): number => {
		const delta = this.clock.getDelta()
		const canvas = this.domElement
		const dpi = Math.min(devicePixelRatio, 2)
		const width = canvas.clientWidth * dpi | 0
		const height = canvas.clientHeight * dpi | 0

		if (canvas.width === width && canvas.height === height) {
			this.composer.render(delta)
		} else {
			this.camera.aspect = width / height

			this.camera.updateProjectionMatrix()
			this.setSize(width, height, false)
			this.composer.setSize(width, height, false)
		}

    return delta
	}
}
