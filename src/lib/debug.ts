import { three } from 'trzy'
import Inspector from 'three-inspect'

const { scene, camera, renderer } = three()

export const debug = new Inspector({
  scene,
  camera: camera.current as THREE.PerspectiveCamera,
  renderer,
})
