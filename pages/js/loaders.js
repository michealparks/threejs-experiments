import { THREE, GLTFLoader } from './core.js'

const manager = THREE.DefaultLoadingManager

const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

export const loadGLSLs = async (srcs) => {
  const promises = []
  for (const src of srcs) promises.push(loadGLSL(src))
  return Promise.all(promises)
}

export const loadGLSL = async (src) => {
  const response = await window.fetch(src)
  const glsl = await response.text()
  return glsl
}

export const loadTextures = async (urls, onProgress) => {
  const promises = []
  if (onProgress !== undefined) manager.onProgress = onProgress
  for (const url of urls) promises.push(loadTexture(url))
  return Promise.all(promises)
}

export const loadTexture = (src) => {
  return textureLoader.loadAsync(src)
}

export const loadGLTFs = (srcs, onProgress) => {
  const promises = []
  if (onProgress !== undefined) manager.onProgress = onProgress
  for (const src of srcs) promises.push(loadGLTF(src))
  return Promise.all(promises)
}

export const loadGLTF = (src) => {
  return gltfLoader.loadAsync(src)
}

export const loadModels = async (srcs, config = {}, onProgress) => {
  const promises = []
  if (onProgress !== undefined) manager.onProgress = onProgress
  for (const src of srcs) promises.push(loadModel(src, config))
  return Promise.all(promises)
}

export const loadModel = async (src, config = {}) => {
  const {
    shadows = true,
    matrixAutoUpdate = false,
    anisotropy = 0
  } = config

  const model = await loadGLTF(src)
  const { scene } = model

  scene.traverse((node) => {
    if (shadows) {
      node.castShadow = true
      node.receiveShadow = true
    }

    if (matrixAutoUpdate === false) {
      node.matrixAutoUpdate = false
      node.updateMatrix()
    }

    // TODO: We should only set anisotropy on elements that
    // are flagged to have textures that will benefit from it.
    if (anisotropy !== 0 && node.material !== undefined) {
      node.material.map.anisotropy = anisotropy
    }
  })

  return scene
}
