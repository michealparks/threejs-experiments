import { gl } from '../lib/gl'
import { assets } from '../lib/assets'
import { orbitControls } from '../lib/orbitControls'
import { utils } from './utils'
import { Vector3 } from 'three'

export const init = async () => {
  await assets.queue('desert.glb').load()
  
  const { scene } = assets.get('desert.glb')
  scene.rotation.set(0.0, -Math.PI / 4, 0.0)
  gl.scene.add(scene)

  gl.ambientLight.intensity = 2

  const frame = () => {
    orbitControls.update()
  }

  gl.camera.position.set(0, 40, 40)
  orbitControls.maxDistance = 200
  orbitControls.enableZoom = false

  gl.setAnimationLoop(frame)

  return () => {
    orbitControls.target.copy(new Vector3())
    gl.scene.remove(scene)
    gl.setAnimationLoop(null)
  }
}
