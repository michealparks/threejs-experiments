<script lang='ts'>

import * as THREE from 'three'
import { three, loadGLTF } from 'trzy'

const { scene, camera } = three()

const init = async () => {
  camera.current.position.set(2, 2, 2)
  camera.current.lookAt(0, 0, 0)

  scene.add(new THREE.AmbientLight(undefined, 4))

  const { scene: chair } = await loadGLTF('glb/chair.glb')
  scene.add(chair)
}

init()

</script>
