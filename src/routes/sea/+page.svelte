<script lang='ts'>

import * as THREE from 'three'
import { three } from 'trzy'
import vertexShader from '$lib/shaders/water/vert.glsl'
import fragmentShader from '$lib/shaders/water/frag.glsl'
import { debug } from '$lib/debug'

const { scene, camera, update } = three()

const ambient = new THREE.AmbientLight(undefined, 1)
scene.add(ambient)

const pane = debug.addPane('game')

const updateUniforms = () => {
  for (const [key, value] of Object.entries(parameters)) {
    material.uniforms[key].value = typeof value === 'string' ? new THREE.Color(value) : value
  }
}

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

for (const input of Object.keys(parameters)) {
  pane.addInput(parameters, input).on('change', updateUniforms)
}

const geometry = new THREE.PlaneGeometry(10, 20, 512, 512)
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

scene.add(mesh)
camera.position.set(4, 2, 0)
camera.lookAt(mesh.position)

update((time: number) => {
  material.uniforms.uTime.value = time / 1000
})

updateUniforms()

</script>
