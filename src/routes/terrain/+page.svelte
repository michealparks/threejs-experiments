<script lang='ts'>

import { assets, camera, lights, scene, run } from 'three-kit'

const ambientLight = lights.createAmbient(undefined, 2.3)
scene.add(ambientLight)
camera.position.set(25, 25, 25)
camera.lookAt(0, 0, 0)

const init = async () => {
  const { scene: desert } = await assets.loadGLTF('desert.glb')
  scene.add(desert)
  run()
}

init()

</script>
