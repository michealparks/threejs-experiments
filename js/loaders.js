import { THREE, GLTFLoader } from './core.js'

const { TextureLoader, AnimationMixer } = THREE
const manager = THREE.DefaultLoadingManager
const gltfLoader = new GLTFLoader()
const textureLoader = new TextureLoader()

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

export const loadModels = async (models, onProgress) => {
  const promises = []
  if (onProgress !== undefined) manager.onProgress = onProgress
  for (const model of models) promises.push(loadModel(model))
  return Promise.all(promises)
}

export const loadModel = async (props) => {
  const {
    src,
    shadows = false,
    matrixAutoUpdate = false,
    anisotropy = 0,
  } = props

  const gltf = await loadGLTF(src)
  const { scene } = gltf

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

  if (gltf.animations.length > 0) {
    scene.mixer = new THREE.AnimationMixer(scene)
    scene.clips = {}

    for (const animation of gltf.animations) {
      scene.clips[animation.name] = scene.mixer.clipAction(animation)
    }

    scene.setAnimation = (name) => {
      const last = scene.clip

      if (last) {
        last.fadeOut(0.3).stop()
      }

      const clip = scene.clips[name]
      clip.fadeIn(0.3).play()
      scene.clip = clip
      scene.clipName = name
    }
  }

  return scene
}
