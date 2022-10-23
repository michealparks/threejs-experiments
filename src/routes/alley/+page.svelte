<script lang='ts'>

import { camera, lights, scene, assets, run } from 'three-kit'

const init = async () => {
  camera.position.set(4, 4, 4)
  camera.lookAt(0, 0, 0)

  const ambientLight = lights.createAmbient(undefined, 3)
  scene.add(ambientLight)

  const wall = (await assets.loadGLTF('construction_fliers_1.glb')).scene
  wall.rotation.set(0, -Math.PI / 4, 0)
  wall.position.set(0, -2, 0)
  scene.add(wall)

  run()
}

init()

</script>
