import { gl } from '../core/gl'
import { assets } from '../core/assets'
import { orbitControls } from '../core/orbitControls'
import { utils } from './utils'
import { Vector3 } from 'three'

export const init = async () => {
  await assets.queue('construction_fliers_1.glb').load()
  
  const wall = assets.get('construction_fliers_1.glb').scene
  wall.rotation.set(0.0, -Math.PI / 4, 0.0)
  gl.scene.add(wall)

  const light = utils.createSpotLight()
  light.intensity = 10
  light.position.set(5, 10, 10)
  gl.scene.add(light)

  const frame = () => {
    orbitControls.update()
  }

  console.log(wall)

  gl.camera.position.set(8, 8, 8)
  orbitControls.target.copy(wall.getObjectByName('Plane').position)
  gl.camera.lookAt(wall.getObjectByName('Plane').position)

  gl.setAnimationLoop(frame)

  return () => {
    orbitControls.target.copy(new Vector3())
    gl.scene.remove(wall, light)
    gl.setAnimationLoop(null)
  }
}
