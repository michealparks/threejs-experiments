
import { gl } from '../core/gl'
import { utils } from './utils'
import { assets } from '../core/assets'
import { orbitControls } from '../core/orbitControls'
import { Vector3 } from 'three'

export const init = async () => {
  gl.ambientLight.intensity = 4

  const pointLight = utils.createPointLight()
  pointLight.position.set(-1, 1.4, 1)
  gl.scene.add(pointLight)

  await assets.queue('chair.glb').load()

  const chair = assets.get('chair.glb').scene

  gl.scene.add(chair)
  
  const frame = () => {
    orbitControls.update()
  }

  gl.camera.position.set(3, 3, 3)
  orbitControls.target.copy(chair.getObjectByName('Chair').position)
  gl.camera.lookAt(chair.getObjectByName('Chair').position)

  gl.setAnimationLoop(frame)

  return () => {
    orbitControls.target.copy(new Vector3())
    gl.scene.remove(chair, pointLight)
    gl.setAnimationLoop(null)
  }
}
