<script lang='ts'>

import * as THREE from 'three'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbit-controls'
import { createPointLight } from '$lib/util-three'

const gl = GL()
gl.ambientLight.intensity = 0.5
gl.camera.position.set(-1, 3, -5)
gl.camera.lookAt(new THREE.Vector3())

const orbitControls = new OrbitControls(gl.camera, gl.canvas)

const light = createPointLight()
light.intensity = 3
light.position.set(1, 4, 1)
gl.scene.add(light)

const init = async () => {
  await assets.load('room_1.glb')

  const room = (assets.get<{ scene: THREE.Scene }>('room_1.glb')).scene
  gl.scene.add(room)

  gl.setAnimationLoop(() => {
    orbitControls.update()
  })
}

init()

</script>
