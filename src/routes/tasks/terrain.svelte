<script lang='ts'>

import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbitControls'
import { onMount } from 'svelte'

let canvas

onMount(async () => {
  const gl = new GL(canvas)
  const orbitControls = new OrbitControls(gl.camera, document.body)

  await Promise.all([
    gl.init(),
    assets.load('desert.glb')
  ])

  const { scene } = assets.get('desert.glb')
  gl.scene.add(scene)
  gl.ambientLight.intensity = 2
  orbitControls.maxDistance = 200
  orbitControls.autoRotate = true
  gl.camera.position.set(10, 30, 30)
  
  orbitControls.enableZoom = false

  gl.setAnimationLoop(() => {
    orbitControls.update()
  })
})

</script>

<canvas bind:this={canvas} />
