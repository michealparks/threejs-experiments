<script lang='ts'>

import type * as THREE from 'three'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbit-controls'

const gl = GL()
gl.camera.position.set(0.5, 1.5, 0.5)
gl.ambientLight.intensity = 4

const orbitControls = new OrbitControls(gl.camera, gl.canvas)
orbitControls.minDistance = 0.1

const init = async () => {
  await assets.load('chair.glb')

  const { scene } = assets.get<{ scene: THREE.Scene }>('chair.glb')

  gl.scene.add(scene)

  orbitControls.target.copy(scene.getObjectByName('Chair')!.position)
  gl.camera.lookAt(scene.getObjectByName('Chair')!.position)

  gl.setAnimationLoop(() => {
    orbitControls.update()
  })
}

init()

</script>
