<script lang='ts'>

import type * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbitControls'

onMount(async () => {
  const gl = GL()
  const orbitControls = new OrbitControls(gl.camera, document.body)

  await assets.load('construction_fliers_1.glb')

  const wall = (assets.get('construction_fliers_1.glb') as { scene: THREE.Scene }).scene
  wall.rotation.set(0.0, -Math.PI / 4, 0.0)
  gl.scene.add(wall)
  gl.ambientLight.intensity = 3
  gl.camera.position.set(2, 1, 5)
  orbitControls.target.copy(wall.getObjectByName('Plane')!.position)
  gl.camera.lookAt(wall.getObjectByName('Plane')!.position)

  gl.setAnimationLoop(() => {
    orbitControls.update()
  })
})

</script>
