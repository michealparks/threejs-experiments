<script lang='ts'>

import 'three-kit/debug'
import { assets, camera, lights, scene, run } from 'three-kit'
import type * as THREE from 'three'

const ambientLight = lights.createAmbient(undefined, 1.8)
scene.add(ambientLight)
camera.position.set(10, 30, 30)

const init = async () => {
  await assets.load('desert.glb')

  const { scene: desert } = assets.get('desert.glb') as { scene: THREE.Scene }
  scene.add(desert)
}

init()

run()

</script>
