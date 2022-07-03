<script lang='ts'>

import * as THREE from 'three'
import { GL } from '$lib/gl'
import { OrbitControls } from '$lib/orbit-controls'
import { randPointOnSphere } from '$lib/util';
import Pane from '$lib/components/Pane.svelte'

const parameters = {
  count: 1000,
  pointSize: 0.02,
  sphereSize: 3
}

const inputs = {
  count: { min: 100, max: 1_000_000, step: 100 },
  pointSize: { min: 0.001, max: 0.1, step: 0.001 },
  sphereSize: { min: 1, max: 100, step: 1 },
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

  for (let index = 0; index < parameters.count * 3; index += 3) {
    const [x, y, z] = randPointOnSphere(parameters.sphereSize)
    positions[index + 0] = x
    positions[index + 1] = y
    positions[index + 2] = z
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

const gl = GL()
const controls = new OrbitControls(gl.camera, gl.canvas)
controls.minDistance = Number.NEGATIVE_INFINITY

generate(gl.scene)

gl.setAnimationLoop(() => {
  controls.update()
})

</script>

<Pane
  {parameters}
  {inputs}
  on:change={() => generate(gl.scene)}
/>
