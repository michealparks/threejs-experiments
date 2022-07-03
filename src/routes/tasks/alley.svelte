<script lang='ts'>

import type * as THREE from 'three'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbit-controls'

const gl = GL()
gl.camera.position.set(2, 1, 5)
gl.ambientLight.intensity = 3

const orbitControls = new OrbitControls(gl.camera, document.body)

const init = async () => {
  await assets.load('construction_fliers_1.glb')

  const wall = (assets.get<{ scene: THREE.Scene }>('construction_fliers_1.glb')).scene
  wall.rotation.set(0, -Math.PI / 4, 0)
  gl.scene.add(wall)

  orbitControls.target.copy(wall.getObjectByName('Plane')!.position)
  gl.camera.lookAt(wall.getObjectByName('Plane')!.position)

  gl.setAnimationLoop(() => {
    orbitControls.update()
  })
}

init()

</script>
