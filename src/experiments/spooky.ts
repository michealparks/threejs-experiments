
import { assets } from '../core/assets'
import { Color } from 'three'
import { gl } from '../core/gl'
import { orbitControls } from '../core/orbitControls'
import { utils } from './utils'

export const init = async () => {
  gl.ambientLight.intensity = 0.95

  gl.camera.position.set(20, 2, 15)
  orbitControls.target.y = 3

  const light = utils.createSpotLight()
  light.color = new Color(0, 89, 255)
  light.intensity = 2.0
  light.position.set(2.6, 18.0, -8.6)
  gl.scene.add(light)

  await assets.queue('spooky_house.glb').load()

  const house = assets.get('spooky_house.glb').scene
  gl.scene.add(house)

  const moon = house.getObjectByName('Moon')
  moon.material.color.set(new Color(0xffffff))
  moon.needsUpdate = true

  console.log(moon.material)

  const frame = () => {
    orbitControls.update()
  }

  gl.setAnimationLoop(frame)

  return () => {
    orbitControls.target.y = 0
    gl.scene.remove(house, light)
    gl.setAnimationLoop(null)
  }
}
