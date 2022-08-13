<script lang='ts'>

import { camera, lights, scene, assets, run } from 'three-kit'
import type * as THREE from 'three'

const init = async () => {
  camera.position.set(0.5, 1.5, 0.5)

  const ambientLight = lights.createAmbient(undefined, 4)
  scene.add(ambientLight)

  await assets.load('chair.glb')

  const { scene: chair } = assets.get<{ scene: THREE.Scene }>('chair.glb')

  scene.add(chair)

  camera.lookAt(scene.getObjectByName('Chair')!.position)

  run()
}

init()

</script>
