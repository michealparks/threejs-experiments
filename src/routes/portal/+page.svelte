<script lang='ts'>

import * as THREE from 'three'
import { three, loadGLTF, loadTexture } from 'trzy'
import firefliesVertShader from '$lib/shaders/fireflies/vert.glsl'
import firefliesFragShader from '$lib/shaders/fireflies/frag.glsl'
import portalVertShader from '$lib/shaders/portal/vert.glsl'
import portalFragShader from '$lib/shaders/portal/frag.glsl'

const { scene, camera, update, renderer } = three({
  parameters: { antialias: true },
})

renderer.outputColorSpace = THREE.LinearSRGBColorSpace
THREE.ColorManagement.enabled = false
THREE.Object3D.DEFAULT_MATRIX_AUTO_UPDATE = false

camera.current.position.set(2, 1, -3)
camera.current.lookAt(0, 0, 0)

const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xFF_FF_E5 })
const portalLightMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color('#1E88E5') },
    uColorEnd: { value: new THREE.Color('#5E35B1') },
  },
  vertexShader: portalVertShader,
  fragmentShader: portalFragShader
})

const createFireflies = (pixelRatio: number) => {
  const count = 30
  const firefliesGeometry = new THREE.BufferGeometry()
  const positionArray = new Float32Array(count * 3)

  for (let index = 0; index < count; index += 1) {
    positionArray[index * 3 + 0] = (Math.random() - 0.5) * 4
    positionArray[index * 3 + 1] = (Math.random() * 1.5)
    positionArray[index * 3 + 2] = (Math.random() - 0.5) * 4
  }

  firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))

  const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uBaseSize: { value: 100 },
      uPixelRatio: { value: pixelRatio },
    },
    vertexShader: firefliesVertShader,
    fragmentShader: firefliesFragShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.Points(firefliesGeometry, firefliesMaterial)
}

const init = async () => {
  const [portal, texture] = await Promise.all([
    loadGLTF('glb/portal.glb'),
    loadTexture('textures/portal_2.jpg'),
  ])

  texture.flipY = false

  const bakedMaterial = new THREE.MeshBasicMaterial({ map: texture })

  portal.scene.traverse((node) => {
    node.updateMatrix()

    if (node instanceof THREE.Mesh) {
      if (node.name === 'Portal') {
        node.material = portalLightMaterial
      } else if (node.name === 'LampLight1' || node.name === 'LampLight2') {
        node.material = poleLightMaterial
      } else {
        node.material = bakedMaterial
      }
    }
  })

  portal.scene.scale.setScalar(2)
  
  scene.add(portal.scene)

  const fireflies = createFireflies(devicePixelRatio)
  scene.add(fireflies)

  let time = 0
  update((_cxt, delta) => {
    time += delta
    fireflies.material.uniforms.uTime.value = time / 1000
    portalLightMaterial.uniforms.uTime.value = time / 1000
  })
}

init()

</script>
