import{S as t,i as n,s as a,e,c as s,a as o,d as i,f as c,H as r,z as u,V as d}from"../../chunks/vendor-9aeeaeec.js";import{G as h}from"../../chunks/gl-d705d9d2.js";import{a as m}from"../../chunks/assets-f5ecd985.js";import{O as f}from"../../chunks/orbitControls-43b008a5.js";import"../../chunks/paths-45dac81d.js";function l(t){let n;return{c(){n=e("canvas")},l(t){n=s(t,"CANVAS",{}),o(n).forEach(i)},m(a,e){c(a,n,e),t[1](n)},p:r,i:r,o:r,d(a){a&&i(n),t[1](null)}}}function p(t,n,a){var e=this&&this.__awaiter||function(t,n,a,e){return new(a||(a=Promise))((function(s,o){function i(t){try{r(e.next(t))}catch(n){o(n)}}function c(t){try{r(e.throw(t))}catch(n){o(n)}}function r(t){var n;t.done?s(t.value):(n=t.value,n instanceof a?n:new a((function(t){t(n)}))).then(i,c)}r((e=e.apply(t,n||[])).next())}))};let s;return u((()=>e(void 0,void 0,void 0,(function*(){const t=new h(s),n=new f(t.camera,document.body);n.minDistance=.1,t.ambientLight.intensity=4,yield Promise.all([t.init(),m.load("chair.glb")]);const{scene:a}=m.get("chair.glb");t.scene.add(a),t.camera.position.set(.5,1.5,.5),n.target.copy(a.getObjectByName("Chair").position),t.camera.lookAt(a.getObjectByName("Chair").position),t.setAnimationLoop((()=>{n.update()}))})))),[s,function(t){d[t?"unshift":"push"]((()=>{s=t,a(0,s)}))}]}export default class extends t{constructor(t){super(),n(this,t,p,l,a,{})}}
