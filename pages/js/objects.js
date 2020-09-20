import { THREE } from './core.js'

export const createCube = (config = {}) => {
  const {
    size = 1,
    color = 0x44aa88,
    mat = new THREE.MeshPhongMaterial({ color })
  } = config

  const geo = new THREE.BoxBufferGeometry(size, size, size)
  return new THREE.Mesh(geo, mat)
}

export const createSkySphere = (config = {}) => {
  const {
    size = 80,
    segments = 4,
    mat = new THREE.MeshPhongMaterial({ color: 0x29B6F6 })
  } = config

  mat.side = THREE.BackSide

  const geo = new THREE.SphereGeometry(size, segments, segments)
  return new THREE.Mesh(geo, mat)
}
