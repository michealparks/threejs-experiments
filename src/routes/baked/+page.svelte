<script lang='ts'>

import { camera, lights, scene, assets, run } from 'three-kit'

const init = async () => {
  camera.position.set(2, 2, 2)
  camera.lookAt(0, 0, 0)

  const ambientLight = lights.createAmbient(undefined, 4)
  scene.add(ambientLight)

  const { scene: chair } = await assets.loadGLTF('chair.glb')
  scene.add(chair)

  run()
}

init()

</script>
