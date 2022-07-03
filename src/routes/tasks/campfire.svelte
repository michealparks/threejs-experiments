<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbitControls'
import { fire } from '$lib/fire'
import { createPointLight, createDirectionalLight, createHemisphereLight, createSkySphere } from '$lib/util-three'

onMount(async () => {
  const gl = GL()
  const orbitControls = new OrbitControls(gl.camera, document.body)

  gl.camera.position.set(20.0, 4.0, 18.0)

  await assets.load('FloatingRockScene.glb')

  const { scene: rockScene } = assets.get('FloatingRockScene.glb') as { scene: THREE.Scene }

  fire.init(rockScene.getObjectByName('Fire')!, [
    rockScene.getObjectByName('Ember1') as THREE.Mesh,
    rockScene.getObjectByName('Ember2') as THREE.Mesh,
    rockScene.getObjectByName('Ember3') as THREE.Mesh
  ])

  gl.scene.add(rockScene)

  const pointLight = createPointLight()
  pointLight.position.y = 1.4
  gl.scene.add(pointLight)

  const hemiLight = createHemisphereLight()
  hemiLight.color.setHSL(0.6, 1, 0.6)
  hemiLight.groundColor.setHSL(0.095, 1, 0.75)
  gl.scene.add(hemiLight)
  hemiLight.position.set(0, 50, 0)

  const dirLight = createDirectionalLight()
  dirLight.color.setHSL(0.1, 1, 0.95)
  dirLight.position.set(-1, 1.75, 1).multiplyScalar(30)
  gl.scene.add(dirLight)

  const sky = createSkySphere(undefined, 64)
  gl.scene.add(sky)

  const hsl: THREE.HSL = { h: 0, s: 0, l: 0 }

  if (sky.material instanceof THREE.MeshPhongMaterial) {
    sky.material.color.getHSL(hsl)
  }

  let { l } = hsl
  let idl = 0.0001
  let dl = 0.0001

  gl.setAnimationLoop(() => {
    l -= dl
    if (l < 0.0 || l > 1.0) {
      idl = -idl
      dl = idl
      if (l <= 0.0) l = 0.0
      if (l >= 1.0) l = 1.0
    }

    gl.ambientLight.intensity = l

    if (sky.material instanceof THREE.MeshPhongMaterial) {
      sky.material.color.setHSL(hsl.h, hsl.s, l)
    }
    
    fire.update()
    orbitControls.update()
  })
})

</script>
