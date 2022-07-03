<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { loading } from '$lib/loading';
import { OrbitControls } from '$lib/orbitControls'
import { createCube, createDirectionalLight } from '$lib/util-three';

onMount(async () => {
  const gl = GL()
  const loadEnd = loading(gl.scene)

  const controls = new OrbitControls(gl.camera, document.body)
  controls.autoRotate = true
  controls.minDistance = -Infinity
  controls.enableZoom = false
  
  await assets.load('circle_01.png')

  gl.ambientLight.intensity = 0.5

  const particlesGeometry = new THREE.BufferGeometry()
  const count = 10_000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count * 3; i += 1) {
    positions[i] = (Math.random() - 0.5) * 20
    colors[i] = Math.random()
  }

  const positionAttribute = new THREE.BufferAttribute(positions, 3)

  particlesGeometry.setAttribute('position', positionAttribute)
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

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
  gl.camera.position.set(2,2,2)
  gl.camera.lookAt(particles.position)

  const cube = createCube()

  if (cube.material instanceof THREE.MeshPhongMaterial) {
    cube.material.color = new THREE.Color('#ffffff')
  }

  gl.scene.add(cube)

  const light = createDirectionalLight()
  light.position.set(1, 1, -1)
  light.lookAt(new THREE.Vector3())
  light.intensity = 5
  gl.scene.add(light)

  gl.setAnimationLoop((delta, elapsed) => {
    for (let i = 0; i < count; i += 1) {
      const x = particlesGeometry.attributes.position.getX(i)
      particlesGeometry.attributes.position.setY(i, Math.sin(elapsed + x))
    }

    cube.position.y = Math.sin(elapsed)

    particlesGeometry.attributes.position.needsUpdate = true 

    controls.update()
  })

  loadEnd()
})

</script>
