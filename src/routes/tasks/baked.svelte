<script lang='ts'>

import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbitControls'

onMount(async () => {
  const gl = GL()
  const orbitControls = new OrbitControls(gl.camera, gl.canvas)
  orbitControls.minDistance = 0.1
  gl.ambientLight.intensity = 4

  await assets.load('chair.glb')

  const { scene } = assets.get('chair.glb') as { scene: THREE.Scene }

  gl.scene.add(scene)
  
  gl.camera.position.set(0.5, 1.5, 0.5)
  orbitControls.target.copy(scene.getObjectByName('Chair')!.position)
  gl.camera.lookAt(scene.getObjectByName('Chair')!.position)

  gl.setAnimationLoop(() => {
    orbitControls.update()
  })
})

</script>
