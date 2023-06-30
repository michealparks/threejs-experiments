<script lang='ts'>

import * as THREE from 'three'
import { three, loadGLTF } from 'trzy'

const { camera, scene } = three()

const init = async () => {
  camera.current.position.set(4, 4, 4)
  camera.current.lookAt(0, 0, 0)

  scene.add(new THREE.AmbientLight(undefined, 3))

  const wall = (await loadGLTF('glb/construction_fliers_1.glb')).scene
  wall.rotation.set(0, -Math.PI / 4, 0)
  wall.position.set(0, -2, 0)
  scene.add(wall)
}

init()

</script>
