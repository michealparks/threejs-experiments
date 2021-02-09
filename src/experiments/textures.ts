import {
  MeshPhongMaterial, Vector3
} from 'three'

import { utils } from './utils'
import { gl } from '../core/gl'
import { assets } from '../core/assets'
import { orbitControls } from '../core/orbitControls'

export const init = async () => {
  gl.camera.position.set(1, 1, 1)
  gl.camera.lookAt(new Vector3())

  gl.ambientLight.intensity = 0.6

 
  assets.queue('BrickWall_Square.jpg')
  await assets.load()

  const map = assets.get('BrickWall_Square.jpg')
  const mat = new MeshPhongMaterial({ map })

  // @ts-ignore
  mat.map.anisotropy = gl.renderer.capabilities.getMaxAnisotropy()

  const cube = utils.createCube()
  cube.material = mat
  gl.scene.add(cube)
  gl.camera.lookAt(cube.position)

  const frame = (dt: number) => {
    orbitControls.update()
  }

  gl.setAnimationLoop(frame)

  return () => {
    gl.scene.remove(cube)
    gl.setAnimationLoop(null)
  }
}
