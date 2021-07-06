import {
  PCFSoftShadowMap,
  BasicShadowMap,
  Vector3
} from 'three'

/**
 * Vectors
 */
export const VECTOR_UP_Y = new Vector3(0, 1, 0)

/**
 * Colors
 */
export const COLOR_FOG = 0x3498db
export const COLOR_BLACK = 0x000000
export const COLOR_AMBIENT_LIGHT = 0xafe3f3

/**
 * Renderer
 */
export const SHADOWMAP = PCFSoftShadowMap
export const EXPOSURE = 1
export const CLEARCOLOR = COLOR_BLACK
// export const SHADOWMAP = BasicShadowMap

/**
 * Camera
 */
export const FOV = 30.0
export const NEAR = 0.1
export const FAR = 300.0
export const FOG_NEAR = 50
export const FOG_FAR = 75

export const MAX_BODIES = 1000
export const MAX_SUBSTEPS = 40
export const FIXED_TIMESTEP = 1 / 60
export const MAX_PLAYER_SPEED = 3
export const GRAVITY = -20

/**
 * Controls
 */
export const PASSIVE = { passive: true }
export const XBOX_THUMSTICK_THRESHOLD = 0.2

/**
 * Game Objects
 */
export const PLANTS: string[] = []