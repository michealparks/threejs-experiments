const randNum = (range: number) => {
  return Math.random() * range * 2 - range
}

const randNumInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const randPointInCircle = (R: number) => {
  const r = R * Math.sqrt(Math.random())
  const theta = Math.random() * 2 * Math.PI
  const x = r * Math.cos(theta)
  const y = r * Math.sin(theta)
  return [x, y]
}

export const utils = {
  randNum,
  randNumInRange,
  randPointInCircle
}