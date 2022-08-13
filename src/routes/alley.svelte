<script lang='ts'>

import { camera, lights, scene, assets, run } from 'three-kit'
import type * as THREE from 'three'

camera.position.set(2, 3, 5)

const init = async () => {

  const ambientLight = lights.createAmbient(undefined, 3)
  scene.add(ambientLight)

  await assets.load('construction_fliers_1.glb')

  const wall = (assets.get<{ scene: THREE.Scene }>('construction_fliers_1.glb')).scene
  wall.rotation.set(0, -Math.PI / 4, 0)
  wall.position.set(0, -2, 0)
  scene.add(wall)

  camera.lookAt(wall.getObjectByName('Plane')!.position)

  run()
}

init()

</script>
