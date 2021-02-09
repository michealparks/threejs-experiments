import {gl} from "./gl.js";
import {
  EventDispatcher,
  MOUSE,
  Quaternion,
  Spherical,
  TOUCH,
  Vector2,
  Vector3,
  PerspectiveCamera,
  OrthographicCamera
} from "../_snowpack/pkg/three.js";
import {PASSIVE} from "./constants.js";
const changeEvent = {type: "change"};
const startEvent = {type: "start"};
const endEvent = {type: "end"};
const EPS = 1e-6;
const STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
};
const twoPI = 2 * Math.PI;
class OrbitControls extends EventDispatcher {
  constructor(object, domElement) {
    super();
    this._enabled = true;
    this._hasEvents = true;
    this.target = new Vector3();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = false;
    this.dampingFactor = 0.05;
    this.enableZoom = true;
    this.zoomSpeed = 1;
    this.enableRotate = true;
    this.rotateSpeed = 1;
    this.enablePan = true;
    this.panSpeed = 1;
    this.screenSpacePanning = true;
    this.keyPanSpeed = 7;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    this.keys = {LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40};
    this.mouseButtons = {LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN};
    this.touches = {ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN};
    this._domElementKeyEvents = null;
    this.offset = new Vector3();
    this.lastPosition = new Vector3();
    this.lastQuaternion = new Quaternion();
    this.state = STATE.NONE;
    this.spherical = new Spherical();
    this.sphericalDelta = new Spherical();
    this.scale = 1;
    this.panOffset = new Vector3();
    this.zoomChanged = false;
    this.rotateStart = new Vector2();
    this.rotateEnd = new Vector2();
    this.rotateDelta = new Vector2();
    this.panStart = new Vector2();
    this.panEnd = new Vector2();
    this.panDelta = new Vector2();
    this.dollyStart = new Vector2();
    this.dollyEnd = new Vector2();
    this.dollyDelta = new Vector2();
    this.v = new Vector3();
    this.object = object;
    this.domElement = domElement;
    this.quat = new Quaternion().setFromUnitVectors(this.object.up, new Vector3(0, 1, 0));
    this.quatInverse = this.quat.clone().invert();
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = object.zoom;
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.addEvents();
    this.update();
  }
  set enabled(value) {
    this._enabled = value;
    if (this._enabled === true && this._hasEvents === false) {
      this.addEvents();
    } else if (this._enabled === false && this._hasEvents === true) {
      this.removeEvents();
    }
  }
  get enabled() {
    return this._enabled;
  }
  addEvents() {
    this.domElement.addEventListener("contextmenu", this.onContextMenu);
    this.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.domElement.addEventListener("wheel", this.onMouseWheel);
    this.domElement.addEventListener("touchstart", this.onTouchStart);
    this.domElement.addEventListener("touchend", this.onTouchEnd);
    this.domElement.addEventListener("touchmove", this.onTouchMove);
    this._hasEvents = true;
  }
  removeEvents() {
    this.domElement.removeEventListener("contextmenu", this.onContextMenu);
    this.domElement.removeEventListener("pointerdown", this.onPointerDown);
    this.domElement.removeEventListener("wheel", this.onMouseWheel);
    this.domElement.removeEventListener("touchstart", this.onTouchStart);
    this.domElement.removeEventListener("touchend", this.onTouchEnd);
    this.domElement.removeEventListener("touchmove", this.onTouchMove);
    this._hasEvents = false;
  }
  getPolarAngle() {
    return this.spherical.phi;
  }
  getAzimuthalAngle() {
    return this.spherical.theta;
  }
  listenToKeyEvents(domElement) {
    domElement.addEventListener("keydown", this.onKeyDown, PASSIVE);
    this._domElementKeyEvents = domElement;
  }
  reset() {
    this.target.copy(this.target0);
    this.object.position.copy(this.position0);
    this.object.zoom = this.zoom0;
    this.object.updateProjectionMatrix();
    this.dispatchEvent(changeEvent);
    this.update();
    this.state = STATE.NONE;
  }
  update() {
    const {spherical} = this;
    const {position} = this.object;
    this.offset.copy(position).sub(this.target);
    this.offset.applyQuaternion(this.quat);
    spherical.setFromVector3(this.offset);
    if (this.autoRotate && this.state === STATE.NONE) {
      this.rotateLeft(this.getAutoRotationAngle());
    }
    if (this.enableDamping) {
      spherical.theta += this.sphericalDelta.theta * this.dampingFactor;
      spherical.phi += this.sphericalDelta.phi * this.dampingFactor;
    } else {
      spherical.theta += this.sphericalDelta.theta;
      spherical.phi += this.sphericalDelta.phi;
    }
    let min = this.minAzimuthAngle;
    let max = this.maxAzimuthAngle;
    if (isFinite(min) && isFinite(max)) {
      if (min < -Math.PI)
        min += twoPI;
      else if (min > Math.PI)
        min -= twoPI;
      if (max < -Math.PI)
        max += twoPI;
      else if (max > Math.PI)
        max -= twoPI;
      if (min <= max) {
        spherical.theta = Math.max(min, Math.min(max, spherical.theta));
      } else {
        spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
      }
    }
    spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, spherical.phi));
    spherical.makeSafe();
    spherical.radius *= this.scale;
    spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, spherical.radius));
    if (this.enableDamping === true) {
      this.target.addScaledVector(this.panOffset, this.dampingFactor);
    } else {
      this.target.add(this.panOffset);
    }
    this.offset.setFromSpherical(spherical);
    this.offset.applyQuaternion(this.quatInverse);
    position.copy(this.target).add(this.offset);
    this.object.lookAt(this.target);
    if (this.enableDamping === true) {
      this.sphericalDelta.theta *= 1 - this.dampingFactor;
      this.sphericalDelta.phi *= 1 - this.dampingFactor;
      this.panOffset.multiplyScalar(1 - this.dampingFactor);
    } else {
      this.sphericalDelta.set(0, 0, 0);
      this.panOffset.set(0, 0, 0);
    }
    this.scale = 1;
    if (this.zoomChanged || this.lastPosition.distanceToSquared(this.object.position) > EPS || 8 * (1 - this.lastQuaternion.dot(this.object.quaternion)) > EPS) {
      this.dispatchEvent(changeEvent);
      this.lastPosition.copy(this.object.position);
      this.lastQuaternion.copy(this.object.quaternion);
      this.zoomChanged = false;
      return true;
    }
    return false;
  }
  dispose() {
    this.domElement.removeEventListener("contextmenu", this.onContextMenu);
    this.domElement.removeEventListener("pointerdown", this.onPointerDown);
    this.domElement.removeEventListener("wheel", this.onMouseWheel);
    this.domElement.removeEventListener("touchstart", this.onTouchStart);
    this.domElement.removeEventListener("touchend", this.onTouchEnd);
    this.domElement.removeEventListener("touchmove", this.onTouchMove);
    this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove);
    this.domElement.ownerDocument.removeEventListener("pointerup", this.onPointerUp);
    if (this._domElementKeyEvents !== null) {
      this._domElementKeyEvents.removeEventListener("keydown", this.onKeyDown);
    }
  }
  getAutoRotationAngle() {
    return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
  }
  getZoomScale() {
    return Math.pow(0.95, this.zoomSpeed);
  }
  rotateLeft(angle) {
    this.sphericalDelta.theta -= angle;
  }
  rotateUp(angle) {
    this.sphericalDelta.phi -= angle;
  }
  panLeft(distance, objectMatrix) {
    this.v.setFromMatrixColumn(objectMatrix, 0);
    this.v.multiplyScalar(-distance);
    this.panOffset.add(this.v);
  }
  panUp(distance, objectMatrix) {
    if (this.screenSpacePanning === true) {
      this.v.setFromMatrixColumn(objectMatrix, 1);
    } else {
      this.v.setFromMatrixColumn(objectMatrix, 0);
      this.v.crossVectors(this.object.up, this.v);
    }
    this.v.multiplyScalar(distance);
    this.panOffset.add(this.v);
  }
  pan(deltaX, deltaY) {
    const element = this.domElement;
    if (this.object instanceof PerspectiveCamera) {
      const {position} = this.object;
      this.offset.copy(position).sub(this.target);
      let targetDistance = this.offset.length();
      targetDistance *= Math.tan(this.object.fov / 2 * Math.PI / 180);
      this.panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
      this.panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
    } else if (this.object instanceof OrthographicCamera) {
      this.panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
      this.panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
      this.enablePan = false;
    }
  }
  dollyOut(dollyScale) {
    if (this.object instanceof PerspectiveCamera) {
      this.scale /= dollyScale;
    } else if (this.object instanceof OrthographicCamera) {
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
      this.object.updateProjectionMatrix();
      this.zoomChanged = true;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  dollyIn(dollyScale) {
    if (this.object instanceof PerspectiveCamera) {
      this.scale *= dollyScale;
    } else if (this.object instanceof OrthographicCamera) {
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
      this.object.updateProjectionMatrix();
      this.zoomChanged = true;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  handleMouseDownRotate(event) {
    this.rotateStart.set(event.clientX, event.clientY);
  }
  handleMouseDownDolly(event) {
    this.dollyStart.set(event.clientX, event.clientY);
  }
  handleMouseDownPan(event) {
    this.panStart.set(event.clientX, event.clientY);
  }
  handleMouseMoveRotate(event) {
    this.rotateEnd.set(event.clientX, event.clientY);
    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientHeight);
    this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight);
    this.rotateStart.copy(this.rotateEnd);
    this.update();
  }
  handleMouseMoveDolly(event) {
    this.dollyEnd.set(event.clientX, event.clientY);
    this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
    if (this.dollyDelta.y > 0) {
      this.dollyOut(this.getZoomScale());
    } else if (this.dollyDelta.y < 0) {
      this.dollyIn(this.getZoomScale());
    }
    this.dollyStart.copy(this.dollyEnd);
    this.update();
  }
  handleMouseMovePan(event) {
    this.panEnd.set(event.clientX, event.clientY);
    this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(this.panSpeed);
    this.pan(this.panDelta.x, this.panDelta.y);
    this.panStart.copy(this.panEnd);
    this.update();
  }
  handleMouseWheel(event) {
    if (event.deltaY < 0) {
      this.dollyIn(this.getZoomScale());
    } else if (event.deltaY > 0) {
      this.dollyOut(this.getZoomScale());
    }
    this.update();
  }
  handleKeyDown(event) {
    let needsUpdate = false;
    switch (event.keyCode) {
      case this.keys.UP:
        this.pan(0, this.keyPanSpeed);
        needsUpdate = true;
        break;
      case this.keys.BOTTOM:
        this.pan(0, -this.keyPanSpeed);
        needsUpdate = true;
        break;
      case this.keys.LEFT:
        this.pan(this.keyPanSpeed, 0);
        needsUpdate = true;
        break;
      case this.keys.RIGHT:
        this.pan(-this.keyPanSpeed, 0);
        needsUpdate = true;
        break;
    }
    if (needsUpdate) {
      event.preventDefault();
      this.update();
    }
  }
  handleTouchStartRotate(event) {
    if (event.touches.length == 1) {
      this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
    } else {
      const x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
      const y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
      this.rotateStart.set(x, y);
    }
  }
  handleTouchStartPan(event) {
    if (event.touches.length == 1) {
      this.panStart.set(event.touches[0].pageX, event.touches[0].pageY);
    } else {
      const x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
      const y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
      this.panStart.set(x, y);
    }
  }
  handleTouchStartDolly(event) {
    const dx = event.touches[0].pageX - event.touches[1].pageX;
    const dy = event.touches[0].pageY - event.touches[1].pageY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.dollyStart.set(0, distance);
  }
  handleTouchStartDollyPan(event) {
    if (this.enableZoom)
      this.handleTouchStartDolly(event);
    if (this.enablePan)
      this.handleTouchStartPan(event);
  }
  handleTouchStartDollyRotate(event) {
    if (this.enableZoom)
      this.handleTouchStartDolly(event);
    if (this.enableRotate)
      this.handleTouchStartRotate(event);
  }
  handleTouchMoveRotate(event) {
    if (event.touches.length == 1) {
      this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    } else {
      const x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
      const y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
      this.rotateEnd.set(x, y);
    }
    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientHeight);
    this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight);
    this.rotateStart.copy(this.rotateEnd);
  }
  handleTouchMovePan(event) {
    if (event.touches.length == 1) {
      this.panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    } else {
      const x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
      const y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
      this.panEnd.set(x, y);
    }
    this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(this.panSpeed);
    this.pan(this.panDelta.x, this.panDelta.y);
    this.panStart.copy(this.panEnd);
  }
  handleTouchMoveDolly(event) {
    const dx = event.touches[0].pageX - event.touches[1].pageX;
    const dy = event.touches[0].pageY - event.touches[1].pageY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.dollyEnd.set(0, distance);
    this.dollyDelta.set(0, Math.pow(this.dollyEnd.y / this.dollyStart.y, this.zoomSpeed));
    this.dollyOut(this.dollyDelta.y);
    this.dollyStart.copy(this.dollyEnd);
  }
  handleTouchMoveDollyPan(event) {
    if (this.enableZoom)
      this.handleTouchMoveDolly(event);
    if (this.enablePan)
      this.handleTouchMovePan(event);
  }
  handleTouchMoveDollyRotate(event) {
    if (this.enableZoom)
      this.handleTouchMoveDolly(event);
    if (this.enableRotate)
      this.handleTouchMoveRotate(event);
  }
  onPointerDown(event) {
    switch (event.pointerType) {
      case "mouse":
      case "pen":
        this.onMouseDown(event);
        break;
    }
  }
  onPointerMove(event) {
    switch (event.pointerType) {
      case "mouse":
      case "pen":
        this.onMouseMove(event);
        break;
    }
  }
  onPointerUp(event) {
    switch (event.pointerType) {
      case "mouse":
      case "pen":
        this.onMouseUp(event);
        break;
    }
  }
  onMouseDown(event) {
    event.preventDefault();
    this.domElement.focus ? this.domElement.focus() : window.focus();
    let mouseAction;
    switch (event.button) {
      case 0:
        mouseAction = this.mouseButtons.LEFT;
        break;
      case 1:
        mouseAction = this.mouseButtons.MIDDLE;
        break;
      case 2:
        mouseAction = this.mouseButtons.RIGHT;
        break;
      default:
        mouseAction = -1;
    }
    switch (mouseAction) {
      case MOUSE.DOLLY:
        if (this.enableZoom === false)
          return;
        this.handleMouseDownDolly(event);
        this.state = STATE.DOLLY;
        break;
      case MOUSE.ROTATE:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enablePan === false)
            return;
          this.handleMouseDownPan(event);
          this.state = STATE.PAN;
        } else {
          if (this.enableRotate === false)
            return;
          this.handleMouseDownRotate(event);
          this.state = STATE.ROTATE;
        }
        break;
      case MOUSE.PAN:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate === false)
            return;
          this.handleMouseDownRotate(event);
          this.state = STATE.ROTATE;
        } else {
          if (this.enablePan === false)
            return;
          this.handleMouseDownPan(event);
          this.state = STATE.PAN;
        }
        break;
      default:
        this.state = STATE.NONE;
    }
    if (this.state !== STATE.NONE) {
      this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove);
      this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
      this.dispatchEvent(startEvent);
    }
  }
  onMouseMove(event) {
    event.preventDefault();
    switch (this.state) {
      case STATE.ROTATE:
        if (this.enableRotate === false)
          return;
        this.handleMouseMoveRotate(event);
        break;
      case STATE.DOLLY:
        if (this.enableZoom === false)
          return;
        this.handleMouseMoveDolly(event);
        break;
      case STATE.PAN:
        if (this.enablePan === false)
          return;
        this.handleMouseMovePan(event);
        break;
    }
  }
  onMouseUp(event) {
    this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove);
    this.domElement.ownerDocument.removeEventListener("pointerup", this.onPointerUp);
    this.dispatchEvent(endEvent);
    this.state = STATE.NONE;
  }
  onMouseWheel(event) {
    if (this.enableZoom === false || this.state !== STATE.NONE && this.state !== STATE.ROTATE)
      return;
    event.preventDefault();
    event.stopPropagation();
    this.dispatchEvent(startEvent);
    this.handleMouseWheel(event);
    this.dispatchEvent(endEvent);
  }
  onKeyDown(event) {
    if (this.enablePan === false)
      return;
    this.handleKeyDown(event);
  }
  onTouchStart(event) {
    event.preventDefault();
    switch (event.touches.length) {
      case 1:
        switch (this.touches.ONE) {
          case TOUCH.ROTATE:
            if (this.enableRotate === false)
              return;
            this.handleTouchStartRotate(event);
            this.state = STATE.TOUCH_ROTATE;
            break;
          case TOUCH.PAN:
            if (this.enablePan === false)
              return;
            this.handleTouchStartPan(event);
            this.state = STATE.TOUCH_PAN;
            break;
          default:
            this.state = STATE.NONE;
        }
        break;
      case 2:
        switch (this.touches.TWO) {
          case TOUCH.DOLLY_PAN:
            if (this.enableZoom === false && this.enablePan === false)
              return;
            this.handleTouchStartDollyPan(event);
            this.state = STATE.TOUCH_DOLLY_PAN;
            break;
          case TOUCH.DOLLY_ROTATE:
            if (this.enableZoom === false && this.enableRotate === false)
              return;
            this.handleTouchStartDollyRotate(event);
            this.state = STATE.TOUCH_DOLLY_ROTATE;
            break;
          default:
            this.state = STATE.NONE;
        }
        break;
      default:
        this.state = STATE.NONE;
    }
    if (this.state !== STATE.NONE) {
      this.dispatchEvent(startEvent);
    }
  }
  onTouchMove(event) {
    event.preventDefault();
    event.stopPropagation();
    switch (this.state) {
      case STATE.TOUCH_ROTATE:
        if (this.enableRotate === false)
          return;
        this.handleTouchMoveRotate(event);
        this.update();
        break;
      case STATE.TOUCH_PAN:
        if (this.enablePan === false)
          return;
        this.handleTouchMovePan(event);
        this.update();
        break;
      case STATE.TOUCH_DOLLY_PAN:
        if (this.enableZoom === false && this.enablePan === false)
          return;
        this.handleTouchMoveDollyPan(event);
        this.update();
        break;
      case STATE.TOUCH_DOLLY_ROTATE:
        if (this.enableZoom === false && this.enableRotate === false)
          return;
        this.handleTouchMoveDollyRotate(event);
        this.update();
        break;
      default:
        this.state = STATE.NONE;
    }
  }
  onTouchEnd(event) {
    this.dispatchEvent(endEvent);
    this.state = STATE.NONE;
  }
  onContextMenu(event) {
    event.preventDefault();
  }
}
const controls = new OrbitControls(gl.camera, gl.canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 40;
controls.maxPolarAngle = Math.PI / 2.5;
controls.minPolarAngle = Math.PI / 4;
export const orbitControls = controls;
