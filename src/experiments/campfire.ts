
import { MeshPhongMaterial, HSL } from 'three'
import { gl } from '../core/gl'
import { assets } from '../core/assets'
import { orbitControls } from '../core/orbitControls'
import { fire } from '../modules/fire.js'
import { utils } from './utils'

export const init = async () => {
  gl.camera.position.set(20.0, 4.0, 18.0)

  await assets.queue('FloatingRockScene.glb').load()

  const { scene: rockScene } = assets.get('FloatingRockScene.glb')

  fire.init(
    rockScene.getObjectByName('Fire'),
    [
      rockScene.getObjectByName('Ember1'),
      rockScene.getObjectByName('Ember2'),
      rockScene.getObjectByName('Ember3')
    ]
  )

  gl.scene.add(rockScene)

  const pointLight = utils.createPointLight()
  pointLight.position.y = 1.4
  gl.scene.add(pointLight)

  const hemiLight = utils.createHemisphereLight()
  hemiLight.color.setHSL(0.6, 1, 0.6)
  hemiLight.groundColor.setHSL(0.095, 1, 0.75)
  gl.scene.add(hemiLight)
  hemiLight.position.set(0, 50, 0)

  const dirLight = utils.createDirectionalLight()
  dirLight.color.setHSL(0.1, 1, 0.95)
  dirLight.position.set(-1, 1.75, 1).multiplyScalar(30)
  gl.scene.add(dirLight)

  const sky = utils.createSkySphere(undefined, 64)
  gl.scene.add(sky)

  const hsl: HSL = { h: 0, s: 0, l: 0 }

  if (sky.material instanceof MeshPhongMaterial) {
    sky.material.color.getHSL(hsl)
  }

  let { l } = hsl
  let idl = 0.0001
  let dl = 0.0001

  const frame = (dt: number) => {
    l -= dl
    if (l < 0.0 || l > 1.0) {
      idl = -idl
      dl = idl
      if (l <= 0.0) l = 0.0
      if (l >= 1.0) l = 1.0
    }

    gl.ambientLight.intensity = l

    if (sky.material instanceof MeshPhongMaterial) {
      sky.material.color.setHSL(hsl.h, hsl.s, l)
    }
    
    fire.update(dt)
    orbitControls.update()
  }

  gl.setAnimationLoop(frame)

  return () => {
    gl.scene.remove(rockScene, pointLight, hemiLight, dirLight, sky)
    gl.setAnimationLoop(null)
  }
}