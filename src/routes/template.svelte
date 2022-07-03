<script lang='ts'>

let canvas: HTMLCanvasElement

import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { createCube } from '$lib/util-three'

onMount(async () => {
  const gl = GL(canvas)
  const cube = createCube()
  gl.scene.add(cube)
  gl.camera.position.set(2, 2, 2)
  gl.camera.lookAt(cube.position)

  gl.setAnimationLoop((delta) => {
    cube.rotation.x += delta
  })
})

</script>

<canvas bind:this={canvas} />

<style>
  canvas { 
    width: 100wv !important;
    height: 100vh !important;
  }
</style>
