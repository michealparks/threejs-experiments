<script lang='ts'>

import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbitControls'
import { onMount } from 'svelte'

onMount(async () => {
  const gl = GL()
  const orbitControls = new OrbitControls(gl.camera, gl.canvas)

  await assets.load('desert.glb')

  const { scene } = assets.get('desert.glb') as { scene: THREE.Scene }
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
