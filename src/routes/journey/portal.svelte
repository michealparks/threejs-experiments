<script lang='ts'>

let canvas: HTMLCanvasElement

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { loading } from '$lib/loading'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbitControls'
import firefliesVertShader from './shaders/fireflies/vert.glsl'
import firefliesFragShader from './shaders/fireflies/frag.glsl'
import portalVertShader from './shaders/portal/vert.glsl'
import portalFragShader from './shaders/portal/frag.glsl'

const createFireflies = (pixelRatio: number) => {
  const count = 30
  const firefliesGeometry = new THREE.BufferGeometry()
  const positionArray = new Float32Array(count * 3)

  for(let i = 0; i < count; i++) {
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
    positionArray[i * 3 + 1] = (Math.random() * 1.5)
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4
  }

  firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
  const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uBaseSize: { value: 100.0 },
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
  const gl = new GL(canvas)
  const loadEnd = loading(gl.scene)
  const controls = new OrbitControls(gl.camera, canvas)
  const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
  const portalLightMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorStart: { value: new THREE.Color('#1E88E5') },
      uColorEnd: { value: new THREE.Color('#5E35B1') },
    },
    vertexShader: portalVertShader,
    fragmentShader: portalFragShader
  })

  gl.renderer.outputEncoding = THREE.sRGBEncoding

  await Promise.all([
    gl.init(),
    assets.load('portal.glb'),
    assets.load('portal.jpg'),
  ])

  const portal = assets.get('portal.glb') as { scene: THREE.Scene }
  const bakedTexture = assets.get('portal.jpg') as THREE.Texture
  bakedTexture.flipY = false
  bakedTexture.encoding = THREE.sRGBEncoding

  const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

  portal.scene.traverse((node: THREE.Object3D) => {
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

  const fireflies = createFireflies(devicePixelRatio)

  gl.scene.add(portal.scene)
  gl.scene.add(fireflies)
  gl.camera.position.set(2, 1, -3)

  gl.setAnimationLoop((_, elapsedTime) => {
    controls.update()

    fireflies.material.uniforms.uTime.value = elapsedTime
    portalLightMaterial.uniforms.uTime.value = elapsedTime
  })

  loadEnd()
})

</script>

<canvas bind:this={canvas} />
