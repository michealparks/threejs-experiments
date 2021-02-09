
import { 
  UniformsLib,
  Vector2,
  ShaderMaterial,
  Vector3
} from 'three'

import { gl } from '../core/gl'
import { assets } from '../core/assets'
import { utils } from './utils'

export const init = async () => {
  gl.camera.position.set(0, 0, 2)
  gl.scene.lookAt(new Vector3())

  const uniforms = {
    ...UniformsLib.lights,
    time: { value: 0 },
    resolution: { value: new Vector2() },
  }

  await assets.queue('hello-shader.frag.glsl').load()

  const mat = new ShaderMaterial({
    fragmentShader: assets.get('hello-shader.frag.glsl'),
    uniforms,
    fog: true,
    lights: true,
  })

  const cube = utils.createCube(0.5)
  cube.material = mat
  gl.scene.add(cube)

  const light = utils.createPointLight()
  light.position.set(-1, 2, 4)
  light.lookAt(new Vector3())
  gl.scene.add(light)

  const frame = (dt: number, elapsed: number) => {
    uniforms.resolution.value.set(gl.canvas.width, gl.canvas.height)
    uniforms.time.value = elapsed
    cube.rotation.x = elapsed
    cube.rotation.y = elapsed
  }

  gl.setAnimationLoop(frame)

  return () => {
    gl.scene.remove(light, cube)
    gl.setAnimationLoop(null)
  }
}
