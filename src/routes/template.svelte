<script lang='ts'>

let canvas

import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { createCube } from '$lib/util-three'

onMount(async () => {
  const gl = new GL(canvas)
  
  await gl.init()

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
