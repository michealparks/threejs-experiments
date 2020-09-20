import { THREE } from './core.js'

const passive = { passive: true }

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const axis = new THREE.Vector3()

let canvas

const handleMove = (e) => {
  pointer.x = (e.clientX / canvas.clientWidth) * 2 - 1
  pointer.y = -(e.clientY / canvas.clientHeight) * 2 + 1
}

const init = (props) => {
  canvas = props.canvas

  window.addEventListener('pointermove', handleMove, passive)
}

const tick = (camera, mesh) => {
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObject(mesh)

  if (intersects.length > 0) {
    const [intersect] = intersects
    const { normal } = intersect.face

    object3D.quaternion.setFromUnitVectors(axis, normal.clone().normalize())

    planetoid.worldToLocal(intersect.point)
    object3D.position.copy(intersect.point)
  }
}

AFRAME.registerComponent('mouse-cast', {
  init () {
    this.object3D = this.el.object3D
    this.position = this.object3D.position
    this.mouse = new THREE.Vector2(0, 0)
    this.raycaster = new THREE.Raycaster()
    this.scene = this.el.sceneEl.object3D
    this.canvas = this.el.sceneEl.renderer.domElement
    this.camera = document.querySelector('#camera').object3D.children[0]
    this.axis = new THREE.Vector3(0, 1, 0)

    window.addEventListener('mousemove', this.handleMove.bind(this))

    this.el.sceneEl.addEventListener('model-loaded', (e) => {
      if (e.target.id !== 'planetoid') return
      this.planetoid = e.target.object3D
      this.mesh = this.planetoid.getObjectByName('Icosphere')
    })
  },

  handleMove (e) {
    const { mouse, canvas } = this
    mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1
    mouse.y = -(e.clientY / canvas.clientHeight) * 2 + 1
  }
})
