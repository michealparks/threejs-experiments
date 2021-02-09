export type Listener = {
  (): void
}

export type Tick = {
  (dt: number): void
}

export type Rigidbody = {
  id: number
  name: string
  type: number
  shape: number
  flat: boolean
  transform: Float32Array
  mass: number
  linearDamping: number
  angularDamping: number
  friction: number
  restitution: number
  triangles?: Float32Array
  linkedRigidbodyId?: number
}

export type TriggerVolume = {
  id: number
  name: string
  shape: number
  enter: string
  leave: string
  entity: string
  linkedRigidbodyId?: number
  transform: Float32Array
}

export type TriggerListener = {
  (body0: TriggerVolume, body1: TriggerVolume): void
}

export type SpriteMeta = {
  frameTags: [
    {
      name: string,
      from: number,
      to: number
    }
  ]
}

export type SpriteFrame = {
  duration: number
}

export type GLTFParams = {
  shadows: boolean
}