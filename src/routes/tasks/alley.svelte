<script lang='ts'>

import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbitControls'

let canvas

onMount(async () => {
  const gl = new GL(canvas)
  const orbitControls = new OrbitControls(gl.camera, document.body)

  await Promise.all([
    gl.init(),
    assets.load('construction_fliers_1.glb'),
  ])

  const wall = assets.get('construction_fliers_1.glb').scene
  wall.rotation.set(0.0, -Math.PI / 4, 0.0)
  gl.scene.add(wall)
  gl.ambientLight.intensity = 3
  gl.camera.position.set(2, 1, 5)
  orbitControls.target.copy(wall.getObjectByName('Plane').position)
  gl.camera.lookAt(wall.getObjectByName('Plane').position)

  gl.setAnimationLoop(() => {
    orbitControls.update()
  })
})

</script>

<canvas bind:this={canvas} />
