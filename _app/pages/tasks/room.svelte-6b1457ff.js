import{S as t,i as n,s,e as o,c as a,a as e,d as i,f as c,F as r,z as u,a0 as f,K as m}from"../../chunks/vendor-0a856f48.js";import{G as d}from"../../chunks/gl-03a07b41.js";import{a as l}from"../../chunks/assets-a914e6b7.js";import{O as h}from"../../chunks/orbitControls-a26a318e.js";import{c as p}from"../../chunks/util-three-d65fbfcb.js";import"../../chunks/paths-45dac81d.js";function b(t){let n;return{c(){n=o("canvas")},l(t){n=a(t,"CANVAS",{}),e(n).forEach(i)},m(s,o){c(s,n,o),t[1](n)},p:r,i:r,o:r,d(s){s&&i(n),t[1](null)}}}function v(t,n,s){var o=this&&this.__awaiter||function(t,n,s,o){return new(s||(s=Promise))((function(a,e){function i(t){try{r(o.next(t))}catch(n){e(n)}}function c(t){try{r(o.throw(t))}catch(n){e(n)}}function r(t){var n;t.done?a(t.value):(n=t.value,n instanceof s?n:new s((function(t){t(n)}))).then(i,c)}r((o=o.apply(t,n||[])).next())}))};let a;return u((()=>o(void 0,void 0,void 0,(function*(){const t=new d(a),n=new h(t.camera,document.body);t.camera.position.set(-1,3,-5),t.camera.lookAt(new f),yield Promise.all([t.init(),l.load("room_1.glb")]);const s=l.get("room_1.glb").scene;t.scene.add(s);const o=p();o.intensity=3,o.position.set(1,4,1),t.scene.add(o);t.ambientLight.intensity=.5,t.setAnimationLoop((t=>{n.update()}))})))),[a,function(t){m[t?"unshift":"push"]((()=>{a=t,s(0,a)}))}]}export default class extends t{constructor(t){super(),n(this,t,v,b,s,{})}}
