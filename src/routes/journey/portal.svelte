<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbit-controls'
import firefliesVertShader from './shaders/fireflies/vert.glsl'
import firefliesFragShader from './shaders/fireflies/frag.glsl'
import portalVertShader from './shaders/portal/vert.glsl'
import portalFragShader from './shaders/portal/frag.glsl'

const gl = GL()
gl.renderer.outputEncoding = THREE.sRGBEncoding
gl.camera.position.set(2, 1, -3)

const controls = new OrbitControls(gl.camera, gl.canvas)
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

onMount(async () => {
  await Promise.all([
    assets.load('portal.glb'),
    assets.load('portal.jpg'),
  ])

  const portal = assets.get<{ scene: THREE.Scene }>('portal.glb')
  const bakedTexture = assets.get<THREE.Texture>('portal.jpg')
  bakedTexture.flipY = false
  bakedTexture.encoding = THREE.sRGBEncoding

  const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

  portal.scene.traverse((node) => {
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
  gl.scene.add(portal.scene)

  const fireflies = createFireflies(devicePixelRatio)
  gl.scene.add(fireflies)

  gl.setAnimationLoop((_, elapsedTime) => {
    controls.update()

    fireflies.material.uniforms.uTime.value = elapsedTime
    portalLightMaterial.uniforms.uTime.value = elapsedTime
  })
})

</script>
