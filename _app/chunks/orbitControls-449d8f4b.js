import{am as t,ad as e,an as s,ao as o,ap as i,aq as h,ar as a,a1 as n,as as l}from"./vendor-dc2a1d13.js";import{P as r}from"./gl-afc887b2.js";const c={type:"change"},d={type:"start"},u={type:"end"},p=-1,m=0,b=1,v=2,E=3,y=4,M=5,g=6,D=2*Math.PI;class f extends t{constructor(t,n){super(),this._enabled=!0,this._hasEvents=!0,this.target=new e,this.minDistance=5,this.maxDistance=40,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=Math.PI/4,this.maxPolarAngle=Math.PI/2.5,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!0,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:s.ROTATE,MIDDLE:s.DOLLY,RIGHT:s.PAN},this.touches={ONE:o.ROTATE,TWO:o.DOLLY_PAN},this._domElementKeyEvents=null,this.offset=new e,this.lastPosition=new e,this.lastQuaternion=new i,this.state=p,this.spherical=new h,this.sphericalDelta=new h,this.scale=1,this.panOffset=new e,this.zoomChanged=!1,this.rotateStart=new a,this.rotateEnd=new a,this.rotateDelta=new a,this.panStart=new a,this.panEnd=new a,this.panDelta=new a,this.dollyStart=new a,this.dollyEnd=new a,this.dollyDelta=new a,this.v=new e,this.object=t,this.domElement=n,this.quat=(new i).setFromUnitVectors(this.object.up,new e(0,1,0)),this.quatInverse=this.quat.clone().invert(),this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=t.zoom,this.onContextMenu=this.onContextMenu.bind(this),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onMouseWheel=this.onMouseWheel.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.addEvents(),this.update()}set enabled(t){this._enabled=t,!0===this._enabled&&!1===this._hasEvents?this.addEvents():!1===this._enabled&&!0===this._hasEvents&&this.removeEvents()}get enabled(){return this._enabled}addEvents(){this.domElement.addEventListener("contextmenu",this.onContextMenu),this.domElement.addEventListener("pointerdown",this.onPointerDown),this.domElement.addEventListener("wheel",this.onMouseWheel),this.domElement.addEventListener("touchstart",this.onTouchStart),this.domElement.addEventListener("touchend",this.onTouchEnd),this.domElement.addEventListener("touchmove",this.onTouchMove),this._hasEvents=!0}removeEvents(){this.domElement.removeEventListener("contextmenu",this.onContextMenu),this.domElement.removeEventListener("pointerdown",this.onPointerDown),this.domElement.removeEventListener("wheel",this.onMouseWheel),this.domElement.removeEventListener("touchstart",this.onTouchStart),this.domElement.removeEventListener("touchend",this.onTouchEnd),this.domElement.removeEventListener("touchmove",this.onTouchMove),this._hasEvents=!1}getPolarAngle(){return this.spherical.phi}getAzimuthalAngle(){return this.spherical.theta}listenToKeyEvents(t){t.addEventListener("keydown",this.onKeyDown,r),this._domElementKeyEvents=t}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(c),this.update(),this.state=p}update(){const{spherical:t}=this,{position:e}=this.object;this.offset.copy(e).sub(this.target),this.offset.applyQuaternion(this.quat),t.setFromVector3(this.offset),this.autoRotate&&this.state===p&&this.rotateLeft(this.getAutoRotationAngle()),this.enableDamping?(t.theta+=this.sphericalDelta.theta*this.dampingFactor,t.phi+=this.sphericalDelta.phi*this.dampingFactor):(t.theta+=this.sphericalDelta.theta,t.phi+=this.sphericalDelta.phi);let s=this.minAzimuthAngle,o=this.maxAzimuthAngle;return isFinite(s)&&isFinite(o)&&(s<-Math.PI?s+=D:s>Math.PI&&(s-=D),o<-Math.PI?o+=D:o>Math.PI&&(o-=D),t.theta=s<=o?Math.max(s,Math.min(o,t.theta)):t.theta>(s+o)/2?Math.max(s,t.theta):Math.min(o,t.theta)),t.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,t.phi)),t.makeSafe(),t.radius*=this.scale,t.radius=Math.max(this.minDistance,Math.min(this.maxDistance,t.radius)),!0===this.enableDamping?this.target.addScaledVector(this.panOffset,this.dampingFactor):this.target.add(this.panOffset),this.offset.setFromSpherical(t),this.offset.applyQuaternion(this.quatInverse),e.copy(this.target).add(this.offset),this.object.lookAt(this.target),!0===this.enableDamping?(this.sphericalDelta.theta*=1-this.dampingFactor,this.sphericalDelta.phi*=1-this.dampingFactor,this.panOffset.multiplyScalar(1-this.dampingFactor)):(this.sphericalDelta.set(0,0,0),this.panOffset.set(0,0,0)),this.scale=1,!!(this.zoomChanged||this.lastPosition.distanceToSquared(this.object.position)>1e-6||8*(1-this.lastQuaternion.dot(this.object.quaternion))>1e-6)&&(this.dispatchEvent(c),this.lastPosition.copy(this.object.position),this.lastQuaternion.copy(this.object.quaternion),this.zoomChanged=!1,!0)}dispose(){this.domElement.removeEventListener("contextmenu",this.onContextMenu),this.domElement.removeEventListener("pointerdown",this.onPointerDown),this.domElement.removeEventListener("wheel",this.onMouseWheel),this.domElement.removeEventListener("touchstart",this.onTouchStart),this.domElement.removeEventListener("touchend",this.onTouchEnd),this.domElement.removeEventListener("touchmove",this.onTouchMove),this.domElement.ownerDocument.removeEventListener("pointermove",this.onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this.onPointerUp),null!==this._domElementKeyEvents&&this._domElementKeyEvents.removeEventListener("keydown",this.onKeyDown)}getAutoRotationAngle(){return 2*Math.PI/60/60*this.autoRotateSpeed}getZoomScale(){return Math.pow(.95,this.zoomSpeed)}rotateLeft(t){this.sphericalDelta.theta-=t}rotateUp(t){this.sphericalDelta.phi-=t}panLeft(t,e){this.v.setFromMatrixColumn(e,0),this.v.multiplyScalar(-t),this.panOffset.add(this.v)}panUp(t,e){!0===this.screenSpacePanning?this.v.setFromMatrixColumn(e,1):(this.v.setFromMatrixColumn(e,0),this.v.crossVectors(this.object.up,this.v)),this.v.multiplyScalar(t),this.panOffset.add(this.v)}pan(t,e){const s=this.domElement;if(this.object instanceof n){const{position:o}=this.object;this.offset.copy(o).sub(this.target);let i=this.offset.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this.panLeft(2*t*i/s.clientHeight,this.object.matrix),this.panUp(2*e*i/s.clientHeight,this.object.matrix)}else this.object instanceof l?(this.panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this.panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}dollyOut(t){this.object instanceof n?this.scale/=t:this.object instanceof l?(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom*t)),this.object.updateProjectionMatrix(),this.zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}dollyIn(t){this.object instanceof n?this.scale*=t:this.object instanceof l?(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/t)),this.object.updateProjectionMatrix(),this.zoomChanged=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}handleMouseDownRotate(t){this.rotateStart.set(t.clientX,t.clientY)}handleMouseDownDolly(t){this.dollyStart.set(t.clientX,t.clientY)}handleMouseDownPan(t){this.panStart.set(t.clientX,t.clientY)}handleMouseMoveRotate(t){this.rotateEnd.set(t.clientX,t.clientY),this.rotateDelta.subVectors(this.rotateEnd,this.rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this.rotateLeft(2*Math.PI*this.rotateDelta.x/e.clientHeight),this.rotateUp(2*Math.PI*this.rotateDelta.y/e.clientHeight),this.rotateStart.copy(this.rotateEnd),this.update()}handleMouseMoveDolly(t){this.dollyEnd.set(t.clientX,t.clientY),this.dollyDelta.subVectors(this.dollyEnd,this.dollyStart),this.dollyDelta.y>0?this.dollyOut(this.getZoomScale()):this.dollyDelta.y<0&&this.dollyIn(this.getZoomScale()),this.dollyStart.copy(this.dollyEnd),this.update()}handleMouseMovePan(t){this.panEnd.set(t.clientX,t.clientY),this.panDelta.subVectors(this.panEnd,this.panStart).multiplyScalar(this.panSpeed),this.pan(this.panDelta.x,this.panDelta.y),this.panStart.copy(this.panEnd),this.update()}handleMouseWheel(t){t.deltaY<0?this.dollyIn(this.getZoomScale()):t.deltaY>0&&this.dollyOut(this.getZoomScale()),this.update()}handleKeyDown(t){let e=!1;switch(t.keyCode){case this.keys.UP:this.pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:this.pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:this.pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:this.pan(-this.keyPanSpeed,0),e=!0}e&&(t.preventDefault(),this.update())}handleTouchStartRotate(t){if(1==t.touches.length)this.rotateStart.set(t.touches[0].pageX,t.touches[0].pageY);else{const e=.5*(t.touches[0].pageX+t.touches[1].pageX),s=.5*(t.touches[0].pageY+t.touches[1].pageY);this.rotateStart.set(e,s)}}handleTouchStartPan(t){if(1==t.touches.length)this.panStart.set(t.touches[0].pageX,t.touches[0].pageY);else{const e=.5*(t.touches[0].pageX+t.touches[1].pageX),s=.5*(t.touches[0].pageY+t.touches[1].pageY);this.panStart.set(e,s)}}handleTouchStartDolly(t){const e=t.touches[0].pageX-t.touches[1].pageX,s=t.touches[0].pageY-t.touches[1].pageY,o=Math.sqrt(e*e+s*s);this.dollyStart.set(0,o)}handleTouchStartDollyPan(t){this.enableZoom&&this.handleTouchStartDolly(t),this.enablePan&&this.handleTouchStartPan(t)}handleTouchStartDollyRotate(t){this.enableZoom&&this.handleTouchStartDolly(t),this.enableRotate&&this.handleTouchStartRotate(t)}handleTouchMoveRotate(t){if(1==t.touches.length)this.rotateEnd.set(t.touches[0].pageX,t.touches[0].pageY);else{const e=.5*(t.touches[0].pageX+t.touches[1].pageX),s=.5*(t.touches[0].pageY+t.touches[1].pageY);this.rotateEnd.set(e,s)}this.rotateDelta.subVectors(this.rotateEnd,this.rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this.rotateLeft(2*Math.PI*this.rotateDelta.x/e.clientHeight),this.rotateUp(2*Math.PI*this.rotateDelta.y/e.clientHeight),this.rotateStart.copy(this.rotateEnd)}handleTouchMovePan(t){if(1==t.touches.length)this.panEnd.set(t.touches[0].pageX,t.touches[0].pageY);else{const e=.5*(t.touches[0].pageX+t.touches[1].pageX),s=.5*(t.touches[0].pageY+t.touches[1].pageY);this.panEnd.set(e,s)}this.panDelta.subVectors(this.panEnd,this.panStart).multiplyScalar(this.panSpeed),this.pan(this.panDelta.x,this.panDelta.y),this.panStart.copy(this.panEnd)}handleTouchMoveDolly(t){const e=t.touches[0].pageX-t.touches[1].pageX,s=t.touches[0].pageY-t.touches[1].pageY,o=Math.sqrt(e*e+s*s);this.dollyEnd.set(0,o),this.dollyDelta.set(0,Math.pow(this.dollyEnd.y/this.dollyStart.y,this.zoomSpeed)),this.dollyOut(this.dollyDelta.y),this.dollyStart.copy(this.dollyEnd)}handleTouchMoveDollyPan(t){this.enableZoom&&this.handleTouchMoveDolly(t),this.enablePan&&this.handleTouchMovePan(t)}handleTouchMoveDollyRotate(t){this.enableZoom&&this.handleTouchMoveDolly(t),this.enableRotate&&this.handleTouchMoveRotate(t)}onPointerDown(t){switch(t.pointerType){case"mouse":case"pen":this.onMouseDown(t)}}onPointerMove(t){switch(t.pointerType){case"mouse":case"pen":this.onMouseMove(t)}}onPointerUp(t){switch(t.pointerType){case"mouse":case"pen":this.onMouseUp(t)}}onMouseDown(t){let e;switch(t.preventDefault(),this.domElement.focus?this.domElement.focus():window.focus(),t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case s.DOLLY:if(!1===this.enableZoom)return;this.handleMouseDownDolly(t),this.state=b;break;case s.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(!1===this.enablePan)return;this.handleMouseDownPan(t),this.state=v}else{if(!1===this.enableRotate)return;this.handleMouseDownRotate(t),this.state=m}break;case s.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(!1===this.enableRotate)return;this.handleMouseDownRotate(t),this.state=m}else{if(!1===this.enablePan)return;this.handleMouseDownPan(t),this.state=v}break;default:this.state=p}this.state!==p&&(this.domElement.ownerDocument.addEventListener("pointermove",this.onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this.onPointerUp),this.dispatchEvent(d))}onMouseMove(t){switch(t.preventDefault(),this.state){case m:if(!1===this.enableRotate)return;this.handleMouseMoveRotate(t);break;case b:if(!1===this.enableZoom)return;this.handleMouseMoveDolly(t);break;case v:if(!1===this.enablePan)return;this.handleMouseMovePan(t)}}onMouseUp(t){this.domElement.ownerDocument.removeEventListener("pointermove",this.onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this.onPointerUp),this.dispatchEvent(u),this.state=p}onMouseWheel(t){!1===this.enableZoom||this.state!==p&&this.state!==m||(t.preventDefault(),t.stopPropagation(),this.dispatchEvent(d),this.handleMouseWheel(t),this.dispatchEvent(u))}onKeyDown(t){!1!==this.enablePan&&this.handleKeyDown(t)}onTouchStart(t){switch(t.preventDefault(),t.touches.length){case 1:switch(this.touches.ONE){case o.ROTATE:if(!1===this.enableRotate)return;this.handleTouchStartRotate(t),this.state=E;break;case o.PAN:if(!1===this.enablePan)return;this.handleTouchStartPan(t),this.state=y;break;default:this.state=p}break;case 2:switch(this.touches.TWO){case o.DOLLY_PAN:if(!1===this.enableZoom&&!1===this.enablePan)return;this.handleTouchStartDollyPan(t),this.state=M;break;case o.DOLLY_ROTATE:if(!1===this.enableZoom&&!1===this.enableRotate)return;this.handleTouchStartDollyRotate(t),this.state=g;break;default:this.state=p}break;default:this.state=p}this.state!==p&&this.dispatchEvent(d)}onTouchMove(t){switch(t.preventDefault(),t.stopPropagation(),this.state){case E:if(!1===this.enableRotate)return;this.handleTouchMoveRotate(t),this.update();break;case y:if(!1===this.enablePan)return;this.handleTouchMovePan(t),this.update();break;case M:if(!1===this.enableZoom&&!1===this.enablePan)return;this.handleTouchMoveDollyPan(t),this.update();break;case g:if(!1===this.enableZoom&&!1===this.enableRotate)return;this.handleTouchMoveDollyRotate(t),this.update();break;default:this.state=p}}onTouchEnd(t){this.dispatchEvent(u),this.state=p}onContextMenu(t){t.preventDefault()}}export{f as O};
