<script lang='ts'>

import * as THREE from 'three'
import Pane from '$lib/components/Pane.svelte'
import { GL } from '$lib/gl'
import { OrbitControls } from '$lib/orbit-controls'
import vertexShader from './shaders/water/vert.glsl'
import fragmentShader from './shaders/water/frag.glsl'

const parameters = {
  uDepthColor: '#003aff',
  uSurfaceColor: '#ffda88',
  uColorOffset: 0.07,
  uColorMultiplier: 1.9,
  uBigWavesSpeed: 0.86,
  uBigWavesElevation: 0.2,
  uBigWavesFrequency: new THREE.Vector2(2.35, 1.2),
  uSmallWavesElevation: 0.077,
  uSmallWavesFrequency: 1.5,
  uSmallWavesSpeed: 0.46,
  uSmallIterations: 4.3,
}

const inputs = {
  uDepthColor: undefined,
  uSurfaceColor: undefined,
  uColorOffset: undefined,
  uColorMultiplier: undefined,
  uBigWavesSpeed: undefined,
  uBigWavesElevation: undefined,
  uBigWavesFrequency: undefined,
  uSmallWavesElevation: undefined,
  uSmallWavesFrequency: undefined,
  uSmallWavesSpeed: undefined,
  uSmallIterations: undefined,
}

const geometry = new THREE.PlaneGeometry(6, 6, 512, 512)
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: { uTime: { value: 0 } }
})
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = -Math.PI / 2

for (const [key, value] of Object.entries(parameters)) {
  material.uniforms[key] = { value }
}

const updateUniforms = () => {
  for (const [key, value] of Object.entries(parameters)) {
    material.uniforms[key].value = typeof value === 'string' ? new THREE.Color(value) : value
  }
}

const gl = GL()
const controls = new OrbitControls(gl.camera, gl.canvas)

updateUniforms()

gl.scene.add(mesh)
gl.camera.lookAt(mesh.position)

gl.setAnimationLoop((_, elapsed) => {
  material.uniforms.uTime.value = elapsed
  controls.update()
})

</script>

<Pane {parameters} {inputs} on:change={updateUniforms} />
