<script lang='ts'>

import * as THREE from 'three'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbit-controls'
import { createCube, createDirectionalLight } from '$lib/util-three';

const gl = GL()
gl.camera.position.set(2,2,2)
gl.ambientLight.intensity = 0.5

const controls = new OrbitControls(gl.camera, document.body)
controls.autoRotate = true
controls.minDistance = Number.NEGATIVE_INFINITY
controls.enableZoom = false

const cube = createCube(undefined, 0xFF_FF_FF)
gl.scene.add(cube)

const light = createDirectionalLight()
light.position.set(1, 1, -1)
light.lookAt(new THREE.Vector3())
light.intensity = 5
gl.scene.add(light)

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
  await assets.load('circle_01.png')

  const particlesMaterial = new THREE.PointsMaterial()
  particlesMaterial.size = 0.075
  particlesMaterial.sizeAttenuation = true
  particlesMaterial.color = new THREE.Color('#ff88cc')
  particlesMaterial.map = assets.get('circle_01.png') as THREE.Texture
  particlesMaterial.transparent = true
  particlesMaterial.alphaTest = 0.1
  particlesMaterial.depthTest = false
  particlesMaterial.depthWrite = false
  particlesMaterial.blending = THREE.AdditiveBlending
  particlesMaterial.vertexColors = true

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  gl.scene.add(particles)
  gl.camera.lookAt(particles.position)

  gl.setAnimationLoop((_delta, elapsed) => {
    for (let index = 0; index < count; index += 1) {
      const x = particlesGeometry.attributes.position.getX(index)
      particlesGeometry.attributes.position.setY(index, Math.sin(elapsed + x))
    }

    cube.position.y = Math.sin(elapsed)

    particlesGeometry.attributes.position.needsUpdate = true 

    controls.update()
  })
}

init()

</script>
