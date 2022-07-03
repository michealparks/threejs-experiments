import * as THREE from 'three'
import { randomNumberInRange, randPointInCircle } from '$lib/util'

interface Ember {
  mesh: THREE.InstancedMesh
  p: Float32Array
  s: Float32Array
  pv: Float32Array
  sv: Float32Array
}

const totalEmbers = 100
const dummy = new THREE.Object3D()
const embers: Ember[] = []

const init = (parent: THREE.Object3D, templates: THREE.Mesh[]) => {
  for (const template of templates) {
    template.matrixAutoUpdate = true
    template.position.set(0, 0, 0)

    if (Array.isArray(template.material)) {
      throw new TypeError('Material can not be array')
    }

    const mesh = new THREE.InstancedMesh(template.geometry.clone(), template.material.clone(), totalEmbers)

    const object = {
      mesh,
      p: new Float32Array(totalEmbers * 3),
      r: new Float32Array(totalEmbers * 3),
      s: new Float32Array(totalEmbers),
      pv: new Float32Array(totalEmbers * 3),
      sv: new Float32Array(totalEmbers * 3)
    }

    mesh.position.set(0, 0.5, 0)

    let index = 0
    while (index < totalEmbers) {
      setPropertiesAtIndex(index, object)
      index += 1
    }

    embers.push(object)
    parent.add(mesh)
  }
}

const setPropertiesAtIndex = (index: number, ember: Ember) => {
  const index3 = index * 3

  const [px, py] = randPointInCircle(1.25)

  ember.p[index3 + 0] = px
  ember.p[index3 + 1] = randomNumberInRange(0.1, 0.75)
  ember.p[index3 + 2] = py

  ember.s[index] = 1
  ember.sv[index] = randomNumberInRange(-0.1, -0.03)

  ember.pv[index3 + 0] = randomNumberInRange(-0.01, 0.05)
  ember.pv[index3 + 1] = randomNumberInRange(0.01, 0.05)
  ember.pv[index3 + 2] = randomNumberInRange(-0.01, 0.05)
}

const update = () => {
  for (const ember of embers) {
    const { mesh, p, s, pv, sv } = ember
    let index = 0
    while (index < totalEmbers) {
      const index3 = index * 3

      s[index] += sv[index]

      if (s[index] <= 0) {
        setPropertiesAtIndex(index, ember)
      }

      p[index3 + 0] += pv[index3 + 0]
      p[index3 + 1] += pv[index3 + 1]
      p[index3 + 2] += pv[index3 + 2]

      dummy.position.set(p[index3], p[index3 + 1], p[index3 + 2])
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
