import * as THREE from 'three'
import { randomNumberInRange, randPointInCircle } from '$lib/util'

interface Ember {
  mesh: THREE.InstancedMesh
  p: Float32Array
  s: Float32Array
  pv: Float32Array
  sv: Float32Array
}

const number_ = 100
const dummy = new THREE.Object3D()
const embers: Ember[] = []

const init = (parent: THREE.Object3D, templates: THREE.Mesh[]) => {
  for (const template of templates) {
    template.matrixAutoUpdate = true
    template.position.set(0, 0, 0)

    if (Array.isArray(template.material)) {
      throw new TypeError('Material can not be array')
    }

    const mesh = new THREE.InstancedMesh(template.geometry.clone(), template.material.clone(), number_)

    const object = {
      mesh,
      p: new Float32Array(number_ * 3),
      r: new Float32Array(number_ * 3),
      s: new Float32Array(number_),
      pv: new Float32Array(number_ * 3),
      sv: new Float32Array(number_ * 3)
    }

    mesh.position.set(0, 0.5, 0)

    let index = 0
    while (index < number_) {
      setPropertiesAtIndex(index, object)
      index += 1
    }

    embers.push(object)
    parent.add(mesh)
  }
}

const setPropertiesAtIndex = (index: number, ember: Ember) => {
  const ii = index * 3

  const [px, py] = randPointInCircle(1.25)

  ember.p[ii + 0] = px
  ember.p[ii + 1] = randomNumberInRange(0.1, 0.75)
  ember.p[ii + 2] = py

  ember.s[index] = 1
  ember.sv[index] = randomNumberInRange(-0.1, -0.03)

  ember.pv[ii + 0] = randomNumberInRange(-0.01, 0.05)
  ember.pv[ii + 1] = randomNumberInRange(0.01, 0.05)
  ember.pv[ii + 2] = randomNumberInRange(-0.01, 0.05)
}

const update = () => {
  for (const ember of embers) {
    const { mesh, p, s, pv, sv } = ember
    let index = 0
    while (index < number_) {
      const ii = index * 3

      s[index] += sv[index]

      if (s[index] <= 0) {
        setPropertiesAtIndex(index, ember)
      }

      p[ii + 0] += pv[ii + 0]
      p[ii + 1] += pv[ii + 1]
      p[ii + 2] += pv[ii + 2]

      dummy.position.set(p[ii], p[ii + 1], p[ii + 2])
      dummy.scale.set(s[index], s[index], s[index])
      dummy.updateMatrix()

      mesh.setMatrixAt(index, dummy.matrix)
      index += 1
    }

    mesh.instanceMatrix.needsUpdate = true
  }
}

export const fire = {
  init,
  update,
}
