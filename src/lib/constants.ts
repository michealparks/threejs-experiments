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

export const COLORS = {
  black: 0x000000,
  darkGray: 0x616161,
  lightGray: 0xbdbdbd,

  coolLight: 0xFFFFFF,
  warmLight: 0xFFF5b6,
  warmerLight: 0xEFC070,
  warmestLight: 0xE47025,

  lightBlue: 0x00b0ff,
  darkBlue: 0x01579b,
  yellow: 0xffee58,

  lightRed: 0xff5252,
  darkRed: 0xb71c1c,

  lightOrange: 0xffb74d,
  darkOrange: 0xef6c00,

  lightestPink: 0xffebee,
  salmon: 0xe57373,

  lightCyan: 0x80DEEA,
  darkCyan: 0x0097A7,

  lightIndigo: 0x5C6BC0,
  darkIndigo: 0x303F9F,

  white: 0xFFFFFF
}

export const SHADOW_MAP = {
  width: 2 ** 10,
  height: 2 ** 10
}