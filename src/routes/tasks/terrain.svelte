<script lang='ts'>

import type * as THREE from 'three'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbit-controls'

const gl = GL()
gl.ambientLight.intensity = 2
gl.camera.position.set(10, 30, 30)

const orbitControls = new OrbitControls(gl.camera, gl.canvas)
orbitControls.enableZoom = false
orbitControls.maxDistance = 200
orbitControls.autoRotate = true

const init = async () => {
  await assets.load('desert.glb')

  const { scene } = assets.get('desert.glb') as { scene: THREE.Scene }
  gl.scene.add(scene)

  gl.setAnimationLoop(() => {
    orbitControls.update()
  })
}

init()

</script>
