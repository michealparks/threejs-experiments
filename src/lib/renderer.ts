import {
	Clock,
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	ACESFilmicToneMapping,
	sRGBEncoding,
	PCFSoftShadowMap,
	HalfFloatType
} from 'three'

import {
	EffectComposer,
	RenderPass,
	EffectPass,
	SMAAImageLoader,
	SMAAEffect,
	SMAAPreset,
  BloomEffect,
  KernelSize
	// @ts-ignore
} from '../../node_modules/postprocessing/build/postprocessing.esm'

export default class Renderer extends WebGLRenderer {
	clock = new Clock()
	scene = new Scene()
	zoom = 10
	near = 0.1
	far = 1000
	camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
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
		this.toneMapping = ACESFilmicToneMapping
		this.toneMappingExposure = 1
		this.outputEncoding = sRGBEncoding
		this.physicallyCorrectLights = true
		this.shadowMap.enabled = true
		this.shadowMap.type = PCFSoftShadowMap

		this.composer = new EffectComposer(this, {
			frameBufferType: HalfFloatType
		})
	}

	async init (config): Promise<void> {
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
		this.composer.addPass(new EffectPass(this.camera, smaaEffect, bloomEffect))
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
