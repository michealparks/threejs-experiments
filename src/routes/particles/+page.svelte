<script lang='ts'>

import { assets, camera, lights, scene, update, run } from 'three-kit'
import * as THREE from 'three'
import { createCube } from '$lib/util-three';

camera.position.set(2,2,2)

const ambientLight = lights.createAmbient()
scene.add(ambientLight)

const cube = createCube(undefined, 0xFF_FF_FF)
scene.add(cube)

const light = lights.createDirectional()
light.position.set(1, 1, -1)
light.lookAt(new THREE.Vector3())
light.intensity = 5
scene.add(light)

const particlesGeometry = new THREE.BufferGeometry()
const count = 10_000
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let index = 0; index < count * 3; index += 1) {
  positions[index] = (Math.random() - 0.5) * 20
  colors[index] = Math.random()
}

const positionAttribute = new THREE.BufferAttribute(positions, 3)
particlesGeometry.setAttribute('position', positionAttribute)
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const init = async () => {
  const map = await assets.loadTexture('circle_01.png')
  const particlesMaterial = new THREE.PointsMaterial()
  particlesMaterial.size = 0.075
  particlesMaterial.sizeAttenuation = true
  particlesMaterial.color = new THREE.Color('#ff88cc')
  particlesMaterial.map = map
  particlesMaterial.transparent = true
  particlesMaterial.alphaTest = 0.1
  particlesMaterial.depthTest = false
  particlesMaterial.depthWrite = false
  particlesMaterial.blending = THREE.AdditiveBlending
  particlesMaterial.vertexColors = true

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)
  camera.lookAt(particles.position)

  update((time: number) => {
    for (let index = 0; index < count; index += 1) {
      const x = particlesGeometry.attributes.position.getX(index)
      particlesGeometry.attributes.position.setY(index, Math.sin(time / 1000 + x))
    }

    cube.position.y = Math.sin(time / 1000)

    particlesGeometry.attributes.position.needsUpdate = true 
  })

  run()
}

init()

</script>
