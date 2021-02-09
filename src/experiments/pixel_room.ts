
import { orbitControls } from '../core/orbitControls'
import { assets } from '../core/assets'
import { gl } from '../core/gl'
import { utils } from './utils'

export const init = async () => {
  gl.ambientLight.intensity = 0.5

  gl.camera.position.set(10, 10, 10)
  gl.camera.lookAt(0, 0, 0)

  const light = utils.createPointLight()
  light.intensity = 10
  light.position.set(1.83, 1.35, -0.5)
  gl.scene.add(light)

  await assets.queue('pixel_room.glb').load()

  const room = assets.get('pixel_room.glb').scene

  console.log(room.children)

  gl.scene.add(room)

  const frame = () => {
    orbitControls.update()
  }

  gl.setAnimationLoop(frame)

  return () => {
    gl.scene.remove(room, light)
    gl.setAnimationLoop(null)
  }
}
