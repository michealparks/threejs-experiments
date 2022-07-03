<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { OrbitControls } from '$lib/orbitControls'
import { Pane } from 'tweakpane'
import { randPointOnSphere } from '$lib/util';

let container: HTMLDivElement

const parameters = {
  count: 1000,
  pointSize: 0.02,
  sphereSize: 3
}

let geometry: THREE.BufferGeometry
let material: THREE.PointsMaterial
let points: THREE.Points

const generate = (scene: THREE.Scene) => {
  if (points) {
    geometry.dispose()
    material.dispose()
    scene.remove(points)
  }

  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(parameters.count * 3)

  for (let i = 0; i < parameters.count * 3; i += 3) {
    const [x, y, z] = randPointOnSphere(parameters.sphereSize)
    positions[i + 0] = x
    positions[i + 1] = y
    positions[i + 2] = z
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  material = new THREE.PointsMaterial()
  material.size = parameters.pointSize
  material.sizeAttenuation = true
  material.depthWrite = false
  material.blending = THREE.AdditiveBlending

  points = new THREE.Points(geometry, material)

  scene.add(points)
}

onMount(async () => {
  const gl = GL()
  const controls = new OrbitControls(gl.camera, gl.canvas)
  controls.minDistance = -Infinity

  generate(gl.scene)

  const pane = new Pane({ container })
  pane.addInput(parameters, 'count', { min: 100, max: 1_000_000, step: 100 })
  pane.addInput(parameters, 'pointSize', { min: 0.001, max: 0.1, step: 0.001 })
  pane.addInput(parameters, 'sphereSize', { min: 1, max: 100, step: 1 })
  pane.on('change', () => generate(gl.scene))

  gl.setAnimationLoop(() => {
    controls.update()
  })
})

</script>

<div class='pane' bind:this={container} />
