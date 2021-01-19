import { PerspectiveCamera } from 'three'
import { scene } from './scene'

const fov = 50.0
const aspect = globalThis.innerWidth / globalThis.innerHeight
const near = 0.1
const far = 100.0
const camera = new PerspectiveCamera(fov, aspect, near, far)

scene.add(camera)

export { camera }
