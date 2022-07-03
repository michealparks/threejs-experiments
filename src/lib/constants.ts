import * as THREE from 'three'

/**
 * Vectors
 */
export const VECTOR_UP_Y = new THREE.Vector3(0, 1, 0)

/**
 * Colors
 */
export const COLOR_FOG = 0x34_98_DB
export const COLOR_BLACK = 0x00_00_00
export const COLOR_AMBIENT_LIGHT = 0xAF_E3_F3

/**
 * Renderer
 */
export const SHADOWMAP = THREE.PCFSoftShadowMap
export const EXPOSURE = 1
export const CLEARCOLOR = COLOR_BLACK
// export const SHADOWMAP = BasicShadowMap

/**
 * Camera
 */
export const FOV = 30
export const NEAR = 0.1
export const FAR = 300
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
  black: 0x00_00_00,
  darkGray: 0x61_61_61,
  lightGray: 0xBD_BD_BD,

  coolLight: 0xFF_FF_FF,
  warmLight: 0xFF_F5_B6,
  warmerLight: 0xEF_C0_70,
  warmestLight: 0xE4_70_25,

  lightBlue: 0x00_B0_FF,
  darkBlue: 0x01_57_9B,
  yellow: 0xFF_EE_58,

  lightRed: 0xFF_52_52,
  darkRed: 0xB7_1C_1C,

  lightOrange: 0xFF_B7_4D,
  darkOrange: 0xEF_6C_00,

  lightestPink: 0xFF_EB_EE,
  salmon: 0xE5_73_73,

  lightCyan: 0x80_DE_EA,
  darkCyan: 0x00_97_A7,

  lightIndigo: 0x5C_6B_C0,
  darkIndigo: 0x30_3F_9F,

  white: 0xFF_FF_FF
}

export const SHADOW_MAP = {
  width: 2 ** 10,
  height: 2 ** 10
}
