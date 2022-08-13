<script lang='ts'>

import { camera, lights, scene, assets, run } from 'three-kit'
import * as THREE from 'three'

const ambientLight = lights.createAmbient()
scene.add(ambientLight)
ambientLight.intensity = 0.5
camera.position.set(-1, 3, -5)
camera.lookAt(new THREE.Vector3())

const light = lights.createPoint()
light.intensity = 3
light.position.set(1, 4, 1)
scene.add(light)

const init = async () => {
  await assets.load('room_1.glb')

  const room = (assets.get<{ scene: THREE.Scene }>('room_1.glb')).scene
  scene.add(room)

  run()
}

init()

</script>
