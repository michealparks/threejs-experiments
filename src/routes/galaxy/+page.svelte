<script lang='ts'>

import * as THREE from 'three'
import { three } from 'trzy'
import { debug } from '$lib/debug'

const { scene, camera } = three()

camera.current.position.set(0, 4, 4)
camera.current.lookAt(0, 0, 0)

const parameters = {
  count: 10_000,
  pointSize: 0.001,
  radius: 1.82,
  branches: 10,
  spin: 1.304,
  randomness: 0.413,
  randomnessPower: 3.543,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

let geometry: THREE.BufferGeometry
let material: THREE.PointsMaterial
let points: THREE.Points

const generateGalaxy = () => {
  if (points) {
    geometry.dispose()
    material.dispose()
    scene.remove(points)
  }

  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(parameters.count * 3)
  const colors = new Float32Array(parameters.count * 3)

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  for (let index = 0, index3 = 0; index < parameters.count * 3; index += 1, index3 = index * 3) {
    const radius = Math.random() * parameters.radius
    const spinAngle = radius * parameters.spin
    const branchAngle = (index % parameters.branches) / parameters.branches * Math.PI * 2

    const randomX = Math.pow(
      Math.random(),
      parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1
    ) * parameters.randomness * radius
    const randomY = Math.pow(
      Math.random(),
      parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1
    ) * parameters.randomness * radius
    const randomZ = Math.pow(
      Math.random(),
      parameters.randomnessPower
    ) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

    positions[index3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[index3 + 1] = randomY
    positions[index3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[index3 + 0] = mixedColor.r
    colors[index3 + 1] = mixedColor.g
    colors[index3 + 2] = mixedColor.b
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

const pane = debug.addPane('Galaxy')

const inputs = {
  count: { min: 100, max: 1_000_000, step: 100 },
  pointSize: { min: 0.001, max: 0.1, step: 0.001 },
  radius: { min: 0.1, max: 10, step: 0.01 },
  branches: { min: 2, max: 20, step: 1 },
  spin: { min: -5, max: 5, step: 0.001 },
  randomness: { min: 0, max: 2, step: 0.001 },
  randomnessPower: { min: 1, max: 10, step: 0.001 },
  insideColor: undefined,
  outsideColor: undefined,
}

const handleChange = () => {
  generateGalaxy()
}

for (const [key, value] of Object.entries(inputs)) {
  pane.addInput(parameters, key, value).on('change', handleChange)
}

generateGalaxy()

</script>
