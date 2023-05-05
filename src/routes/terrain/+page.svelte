<script lang='ts'>

import * as THREE from 'three'
import { three, loadGLTF } from 'trzy'

const { scene, camera } = three()

const ambientLight = new THREE.AmbientLight(undefined, 2.3)
scene.add(ambientLight)
camera.position.set(25, 25, 25)
camera.lookAt(0, 0, 0)

const init = async () => {
  const { scene: desert } = await loadGLTF('glb/desert.glb')
  scene.add(desert)
}

init()

</script>
