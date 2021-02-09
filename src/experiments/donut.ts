import { gl } from '../core/gl'
import { assets } from '../core/assets'
import { orbitControls } from '../core/orbitControls'
import { utils } from './utils'

export const init = async () => {
  gl.ambientLight.intensity = 0.5

  await assets.queue('donut2.glb', 'mug.glb').load()

  const donut = assets.get('donut2.glb').scene
  gl.scene.add(donut)

  const mug = assets.get('mug.glb').scene

  {
    const plane = donut.getObjectByName('Plane')
    plane.castShadow = false
  }

  mug.position.set(-0.2, 0.0, -0.25)
  mug.rotation.set(0.0, -Math.PI / 4, 0.0)
  mug.updateMatrix()
  gl.scene.add(mug)

  const light = utils.createSpotLight()
  light.intensity = 5
  light.position.set(1.2, 1, 1.2)
  gl.scene.add(light)

  const frame = (dt: number) => {
    orbitControls.update()
  }

  gl.setAnimationLoop(frame)

  return () => {
    gl.scene.remove(donut, mug, light)
    gl.setAnimationLoop(null)
  }
}

