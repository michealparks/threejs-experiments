<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { OrbitControls } from '$lib/orbitControls'
import { Pane } from 'tweakpane'

let canvas
let container

const parameters = {
  count: 10_000,
  pointSize: 0.001,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.38,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

let geometry = null
let material = null
let points = null

const generateGalaxy = (scene: THREE.Scene) => {
  if (points !== null) {
    geometry.dispose()
    material.dispose()
    scene.remove(points)
  }

  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(parameters.count * 3)
  const colors = new Float32Array(parameters.count * 3)

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  for (let i = 0, i3 = 0; i < parameters.count * 3; i += 1, i3 = i * 3) {
    const radius = Math.random() * parameters.radius
    const spinAngle = radius * parameters.spin
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

    positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[i3 + 0] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  material = new THREE.PointsMaterial()
  material.size = parameters.pointSize
  material.sizeAttenuation = true
  material.depthWrite = false
  material.blending = THREE.AdditiveBlending
  material.vertexColors = true

  points = new THREE.Points(geometry, material)

  scene.add(points)
}

onMount(async () => {
  const gl = new GL(canvas)
  const controls = new OrbitControls(gl.camera, gl.canvas as HTMLElement)
  controls.minDistance = -Infinity
  
  await gl.init()

  generateGalaxy(gl.scene)

  const pane = new Pane({ container })
  pane.addInput(parameters, 'count', { min: 100, max: 1_000_000, step: 100 })
  pane.addInput(parameters, 'pointSize', { min: 0.001, max: 0.1, step: 0.001 })
  pane.addInput(parameters, 'radius', { min: 0.1, max: 10, step: 0.01 })
  pane.addInput(parameters, 'branches', { min: 2, max: 20, step: 1 })
  pane.addInput(parameters, 'spin', { min: -5, max: 5, step: 0.001 })
  pane.addInput(parameters, 'randomness', { min: 0, max: 2, step: 0.001 })
  pane.addInput(parameters, 'randomnessPower', { min: 1, max: 10, step: 0.001 })
  pane.addInput(parameters, 'insideColor')
  pane.addInput(parameters, 'outsideColor')
  pane.on('change', () => generateGalaxy(gl.scene))

  gl.setAnimationLoop((delta) => {
    controls.update()
  })
})

</script>

<canvas bind:this={canvas} />
<div class='pane' bind:this={container} />