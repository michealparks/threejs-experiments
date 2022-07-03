import{ae as D,aa as h,af as n,ag as l,Q as f,ah as E,V as a,ai as T,Y as u,_ as d}from"./gl-9f8be024.js";const b={type:"change"},p={type:"start"},m={type:"end"},y=1e-6,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=2*Math.PI;class P extends D{constructor(t,e){super(),this._enabled=!0,this._hasEvents=!0,this.target=new h,this.minDistance=5,this.maxDistance=40,this.minZoom=0,this.maxZoom=Number.POSITIVE_INFINITY,this.minPolarAngle=Math.PI/4,this.maxPolarAngle=Math.PI/2.5,this.minAzimuthAngle=Number.NEGATIVE_INFINITY,this.maxAzimuthAngle=Number.POSITIVE_INFINITY,this.enableDamping=!0,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.mouseButtons={LEFT:n.ROTATE,MIDDLE:n.DOLLY,RIGHT:n.PAN},this.touches={ONE:l.ROTATE,TWO:l.DOLLY_PAN},this.offset=new h,this.lastPosition=new h,this.lastQuaternion=new f,this.state=s.NONE,this.spherical=new E,this.sphericalDelta=new E,this.scale=1,this.panOffset=new h,this.zoomChanged=!1,this.rotateStart=new a,this.rotateEnd=new a,this.rotateDelta=new a,this.panStart=new a,this.panEnd=new a,this.panDelta=new a,this.dollyStart=new a,this.dollyEnd=new a,this.dollyDelta=new a,this.v=new h,this.object=t,this.domElement=e,this.quat=new f().setFromUnitVectors(this.object.up,new h(0,1,0)),this.quatInverse=this.quat.clone().invert(),this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=t.zoom,this.onContextMenu=this.onContextMenu.bind(this),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onMouseWheel=this.onMouseWheel.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.addEvents(),this.update()}set enabled(t){this._enabled=t,this._enabled===!0&&this._hasEvents===!1?this.addEvents():this._enabled===!1&&this._hasEvents===!0&&this.removeEvents()}get enabled(){return this._enabled}addEvents(){this.domElement.addEventListener("contextmenu",this.onContextMenu),this.domElement.addEventListener("pointerdown",this.onPointerDown),this.domElement.addEventListener("wheel",this.onMouseWheel),this.domElement.addEventListener("touchstart",this.onTouchStart),this.domElement.addEventListener("touchend",this.onTouchEnd),this.domElement.addEventListener("touchmove",this.onTouchMove),this._hasEvents=!0}removeEvents(){this.domElement.removeEventListener("contextmenu",this.onContextMenu),this.domElement.removeEventListener("pointerdown",this.onPointerDown),this.domElement.removeEventListener("wheel",this.onMouseWheel),this.domElement.removeEventListener("touchstart",this.onTouchStart),this.domElement.removeEventListener("touchend",this.onTouchEnd),this.domElement.removeEventListener("touchmove",this.onTouchMove),this._hasEvents=!1}getPolarAngle(){return this.spherical.phi}getAzimuthalAngle(){return this.spherical.theta}listenToKeyEvents(t){t.addEventListener("keydown",this.onKeyDown,T),this._domElementKeyEvents=t}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(b),this.update(),this.state=s.NONE}update(){const{spherical:t}=this,{position:e}=this.object;this.offset.copy(e).sub(this.target),this.offset.applyQuaternion(this.quat),t.setFromVector3(this.offset),this.autoRotate&&this.state===s.NONE&&this.rotateLeft(this.getAutoRotationAngle()),this.enableDamping?(t.theta+=this.sphericalDelta.theta*this.dampingFactor,t.phi+=this.sphericalDelta.phi*this.dampingFactor):(t.theta+=this.sphericalDelta.theta,t.phi+=this.sphericalDelta.phi);let i=this.minAzimuthAngle,o=this.maxAzimuthAngle;return Number.isFinite(i)&&Number.isFinite(o)&&(i<-Math.PI?i+=r:i>Math.PI&&(i-=r),o<-Math.PI?o+=r:o>Math.PI&&(o-=r),i<=o?t.theta=Math.max(i,Math.min(o,t.theta)):t.theta=t.theta>(i+o)/2?Math.max(i,t.theta):Math.min(o,t.theta)),t.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,t.phi)),t.makeSafe(),t.radius*=this.scale,t.radius=Math.max(this.minDistance,Math.min(this.maxDistance,t.radius)),this.enableDamping===!0?this.target.addScaledVector(this.panOffset,this.dampingFactor):this.target.add(this.panOffset),this.offset.setFromSpherical(t),this.offset.applyQuaternion(this.quatInverse),e.copy(this.target).add(this.offset),this.object.lookAt(this.target),this.enableDamping===!0?(this.sphericalDelta.theta*=1-this.dampingFactor,this.sphericalDelta.phi*=1-this.dampingFactor,this.panOffset.multiplyScalar(1-this.dampingFactor)):(this.sphericalDelta.set(0,0,0),this.panOffset.set(0,0,0)),this.scale=1,this.zoomChanged||this.lastPosition.distanceToSquared(this.object.position)>y||8*(1-this.lastQuaternion.dot(this.object.quaternion))>y?(this.dispatchEvent(b),this.lastPosition.copy(this.object.position),this.lastQuaternion.copy(this.object.quaternion),this.zoomChanged=!1,!0):!1}dispose(){var t;this.domElement.removeEventListener("contextmenu",this.onContextMenu),this.domElement.removeEventListener("pointerdown",this.onPointerDown),this.domElement.removeEventListener("wheel",this.onMouseWheel),this.domElement.removeEventListener("touchstart",this.onTouchStart),this.domElement.removeEventListener("touchend",this.onTouchEnd),this.domElement.removeEventListener("touchmove",this.onTouchMove),this.domElement.ownerDocument.removeEventListener("pointermove",this.onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this.onPointerUp),this._domElementKeyEvents!==null&&((t=this._domElementKeyEvents)==null||t.removeEventListener("keydown",this.onKeyDown))}getAutoRotationAngle(){return 2*Math.PI/60/60*this.autoRotateSpeed}getZoomScale(){return Math.pow(.95,this.zoomSpeed)}rotateLeft(t){this.sphericalDelta.theta-=t}rotateUp(t){this.sphericalDelta.phi-=t}panLeft(t,e){this.v.setFromMatrixColumn(e,0),this.v.multiplyScalar(-t),this.panOffset.add(this.v)}panUp(t,e){this.screenSpacePanning===!0?this.v.setFromMatrixColumn(e,1):(this.v.setFromMatrixColumn(e,0),this.v.crossVectors(this.object.up,this.v)),this.v.multiplyScalar(t),this.panOffset.add(this.v)}pan(t,e){const i=this.domElement;if(this.object instanceof u){const{position:o}=this.object;this.offset.copy(o).sub(this.target);let c=this.offset.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this.panLeft(2*t*c/i.clientHeight,this.object.matrix),this.panUp(2*e*c/i.clientHeight,this.object.matrix)}else this.object instanceof d?(this.panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this.panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}dollyOut(t){this.object instanceof u?this.scale/=t:this.object instanceof d?(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom*t)),this.object.updateProjectionMatrix(),this.zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}dollyIn(t){this.object instanceof u?this.scale*=t:this.object instanceof d?(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/t)),this.object.updateProjectionMatrix(),this.zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}handleMouseDownRotate(t){this.rotateStart.set(t.clientX,t.clientY)}handleMouseDownDolly(t){this.dollyStart.set(t.clientX,t.clientY)}handleMouseDownPan(t){this.panStart.set(t.clientX,t.clientY)}handleMouseMoveRotate(t){this.rotateEnd.set(t.clientX,t.clientY),this.rotateDelta.subVectors(this.rotateEnd,this.rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this.rotateLeft(2*Math.PI*this.rotateDelta.x/e.clientHeight),this.rotateUp(2*Math.PI*this.rotateDelta.y/e.clientHeight),this.rotateStart.copy(this.rotateEnd),this.update()}handleMouseMoveDolly(t){this.dollyEnd.set(t.clientX,t.clientY),this.dollyDelta.subVectors(this.dollyEnd,this.dollyStart),this.dollyDelta.y>0?this.dollyOut(this.getZoomScale()):this.dollyDelta.y<0&&this.dollyIn(this.getZoomScale()),this.dollyStart.copy(this.dollyEnd),this.update()}handleMouseMovePan(t){this.panEnd.set(t.clientX,t.clientY),this.panDelta.subVectors(this.panEnd,this.panStart).multiplyScalar(this.panSpeed),this.pan(this.panDelta.x,this.panDelta.y),this.panStart.copy(this.panEnd),this.update()}handleMouseWheel(t){t.deltaY<0?this.dollyIn(this.getZoomScale()):t.deltaY>0&&this.dollyOut(this.getZoomScale()),this.update()}handleKeyDown(t){let e=!1;switch(t.key.toLowerCase()){case"w":case"arrowup":this.pan(0,this.keyPanSpeed),e=!0;break;case"s":case"arrowdown":this.pan(0,-this.keyPanSpeed),e=!0;break;case"a":case"arrowleft":this.pan(this.keyPanSpeed,0),e=!0;break;case"d":case"arrowright":this.pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}handleTouchStartRotate(t){if(t.touches.length==1)this.rotateStart.set(t.touches[0].pageX,t.touches[0].pageY);else{const e=.5*(t.touches[0].pageX+t.touches[1].pageX),i=.5*(t.touches[0].pageY+t.touches[1].pageY);this.rotateStart.set(e,i)}}handleTouchStartPan(t){if(t.touches.length==1)this.panStart.set(t.touches[0].pageX,t.touches[0].pageY);else{const e=.5*(t.touches[0].pageX+t.touches[1].pageX),i=.5*(t.touches[0].pageY+t.touches[1].pageY);this.panStart.set(e,i)}}handleTouchStartDolly(t){const e=t.touches[0].pageX-t.touches[1].pageX,i=t.touches[0].pageY-t.touches[1].pageY,o=Math.sqrt(e*e+i*i);this.dollyStart.set(0,o)}handleTouchStartDollyPan(t){this.enableZoom&&this.handleTouchStartDolly(t),this.enablePan&&this.handleTouchStartPan(t)}handleTouchStartDollyRotate(t){this.enableZoom&&this.handleTouchStartDolly(t),this.enableRotate&&this.handleTouchStartRotate(t)}handleTouchMoveRotate(t){if(t.touches.length==1)this.rotateEnd.set(t.touches[0].pageX,t.touches[0].pageY);else{const i=.5*(t.touches[0].pageX+t.touches[1].pageX),o=.5*(t.touches[0].pageY+t.touches[1].pageY);this.rotateEnd.set(i,o)}this.rotateDelta.subVectors(this.rotateEnd,this.rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this.rotateLeft(2*Math.PI*this.rotateDelta.x/e.clientHeight),this.rotateUp(2*Math.PI*this.rotateDelta.y/e.clientHeight),this.rotateStart.copy(this.rotateEnd)}handleTouchMovePan(t){if(t.touches.length==1)this.panEnd.set(t.touches[0].pageX,t.touches[0].pageY);else{const e=.5*(t.touches[0].pageX+t.touches[1].pageX),i=.5*(t.touches[0].pageY+t.touches[1].pageY);this.panEnd.set(e,i)}this.panDelta.subVectors(this.panEnd,this.panStart).multiplyScalar(this.panSpeed),this.pan(this.panDelta.x,this.panDelta.y),this.panStart.copy(this.panEnd)}handleTouchMoveDolly(t){const e=t.touches[0].pageX-t.touches[1].pageX,i=t.touches[0].pageY-t.touches[1].pageY,o=Math.sqrt(e*e+i*i);this.dollyEnd.set(0,o),this.dollyDelta.set(0,Math.pow(this.dollyEnd.y/this.dollyStart.y,this.zoomSpeed)),this.dollyOut(this.dollyDelta.y),this.dollyStart.copy(this.dollyEnd)}handleTouchMoveDollyPan(t){this.enableZoom&&this.handleTouchMoveDolly(t),this.enablePan&&this.handleTouchMovePan(t)}handleTouchMoveDollyRotate(t){this.enableZoom&&this.handleTouchMoveDolly(t),this.enableRotate&&this.handleTouchMoveRotate(t)}onPointerDown(t){switch(t.pointerType){case"mouse":case"pen":this.onMouseDown(t);break}}onPointerMove(t){switch(t.pointerType){case"mouse":case"pen":this.onMouseMove(t);break}}onPointerUp(t){switch(t.pointerType){case"mouse":case"pen":this.onMouseUp();break}}onMouseDown(t){t.preventDefault(),this.domElement.focus?this.domElement.focus():window.focus();let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case n.DOLLY:if(this.enableZoom===!1)return;this.handleMouseDownDolly(t),this.state=s.DOLLY;break;case n.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this.handleMouseDownPan(t),this.state=s.PAN}else{if(this.enableRotate===!1)return;this.handleMouseDownRotate(t),this.state=s.ROTATE}break;case n.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this.handleMouseDownRotate(t),this.state=s.ROTATE}else{if(this.enablePan===!1)return;this.handleMouseDownPan(t),this.state=s.PAN}break;default:this.state=s.NONE}this.state!==s.NONE&&(this.domElement.ownerDocument.addEventListener("pointermove",this.onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this.onPointerUp),this.dispatchEvent(p))}onMouseMove(t){switch(t.preventDefault(),this.state){case s.ROTATE:if(this.enableRotate===!1)return;this.handleMouseMoveRotate(t);break;case s.DOLLY:if(this.enableZoom===!1)return;this.handleMouseMoveDolly(t);break;case s.PAN:if(this.enablePan===!1)return;this.handleMouseMovePan(t);break}}onMouseUp(){this.domElement.ownerDocument.removeEventListener("pointermove",this.onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this.onPointerUp),this.dispatchEvent(m),this.state=s.NONE}onMouseWheel(t){this.enableZoom===!1||this.state!==s.NONE&&this.state!==s.ROTATE||(t.preventDefault(),t.stopPropagation(),this.dispatchEvent(p),this.handleMouseWheel(t),this.dispatchEvent(m))}onKeyDown(t){this.enablePan!==!1&&this.handleKeyDown(t)}onTouchStart(t){switch(t.preventDefault(),t.touches.length){case 1:switch(this.touches.ONE){case l.ROTATE:if(this.enableRotate===!1)return;this.handleTouchStartRotate(t),this.state=s.TOUCH_ROTATE;break;case l.PAN:if(this.enablePan===!1)return;this.handleTouchStartPan(t),this.state=s.TOUCH_PAN;break;default:this.state=s.NONE}break;case 2:switch(this.touches.TWO){case l.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this.handleTouchStartDollyPan(t),this.state=s.TOUCH_DOLLY_PAN;break;case l.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this.handleTouchStartDollyRotate(t),this.state=s.TOUCH_DOLLY_ROTATE;break;default:this.state=s.NONE}break;default:this.state=s.NONE}this.state!==s.NONE&&this.dispatchEvent(p)}onTouchMove(t){switch(t.preventDefault(),t.stopPropagation(),this.state){case s.TOUCH_ROTATE:if(this.enableRotate===!1)return;this.handleTouchMoveRotate(t),this.update();break;case s.TOUCH_PAN:if(this.enablePan===!1)return;this.handleTouchMovePan(t),this.update();break;case s.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this.handleTouchMoveDollyPan(t),this.update();break;case s.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this.handleTouchMoveDollyRotate(t),this.update();break;default:this.state=s.NONE}}onTouchEnd(){this.dispatchEvent(m),this.state=s.NONE}onContextMenu(t){t.preventDefault()}}export{P as O};
