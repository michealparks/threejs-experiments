import{S as t,i as n,s,e as o,c as e,a,d as i,f as c,H as r,z as u,ac as d,V as f}from"../../chunks/vendor-9aeeaeec.js";import{G as m}from"../../chunks/gl-d705d9d2.js";import{a as l}from"../../chunks/assets-f5ecd985.js";import{O as h}from"../../chunks/orbitControls-43b008a5.js";import{e as p}from"../../chunks/util-three-3d45f2e8.js";import"../../chunks/paths-45dac81d.js";function v(t){let n;return{c(){n=o("canvas")},l(t){n=e(t,"CANVAS",{}),a(n).forEach(i)},m(s,o){c(s,n,o),t[1](n)},p:r,i:r,o:r,d(s){s&&i(n),t[1](null)}}}function k(t,n,s){var o=this&&this.__awaiter||function(t,n,s,o){return new(s||(s=Promise))((function(e,a){function i(t){try{r(o.next(t))}catch(n){a(n)}}function c(t){try{r(o.throw(t))}catch(n){a(n)}}function r(t){var n;t.done?e(t.value):(n=t.value,n instanceof s?n:new s((function(t){t(n)}))).then(i,c)}r((o=o.apply(t,n||[])).next())}))};let e;return u((()=>o(void 0,void 0,void 0,(function*(){const t=new m(e),n=new h(t.camera,document.body);t.camera.position.set(-1,3,-5),t.camera.lookAt(new d),yield Promise.all([t.init(),l.load("room_1.glb")]);const s=l.get("room_1.glb").scene;t.scene.add(s);const o=p();o.intensity=3,o.position.set(1,4,1),t.scene.add(o);t.ambientLight.intensity=.5,t.setAnimationLoop((t=>{n.update()}))})))),[e,function(t){f[t?"unshift":"push"]((()=>{e=t,s(0,e)}))}]}export default class extends t{constructor(t){super(),n(this,t,k,v,s,{})}}
