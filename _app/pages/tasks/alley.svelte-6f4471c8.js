import{S as t,i as n,s as o,e as s,c as a,a as e,d as i,f as c,H as r,z as u,P as f}from"../../chunks/vendor-3bde0b36.js";import{G as l}from"../../chunks/gl-ac8ba178.js";import{a as d}from"../../chunks/assets-86556ad3.js";import{O as m}from"../../chunks/orbitControls-881466ff.js";import"../../chunks/paths-45dac81d.js";function h(t){let n;return{c(){n=s("canvas")},l(t){n=a(t,"CANVAS",{}),e(n).forEach(i)},m(o,s){c(o,n,s),t[1](n)},p:r,i:r,o:r,d(o){o&&i(n),t[1](null)}}}function p(t,n,o){var s=this&&this.__awaiter||function(t,n,o,s){return new(o||(o=Promise))((function(a,e){function i(t){try{r(s.next(t))}catch(n){e(n)}}function c(t){try{r(s.throw(t))}catch(n){e(n)}}function r(t){var n;t.done?a(t.value):(n=t.value,n instanceof o?n:new o((function(t){t(n)}))).then(i,c)}r((s=s.apply(t,n||[])).next())}))};let a;return u((()=>s(void 0,void 0,void 0,(function*(){const t=new l(a),n=new m(t.camera,document.body);yield Promise.all([t.init(),d.load("construction_fliers_1.glb")]);const o=d.get("construction_fliers_1.glb").scene;o.rotation.set(0,-Math.PI/4,0),t.scene.add(o),t.ambientLight.intensity=3,t.camera.position.set(2,1,5),n.target.copy(o.getObjectByName("Plane").position),t.camera.lookAt(o.getObjectByName("Plane").position),t.setAnimationLoop((()=>{n.update()}))})))),[a,function(t){f[t?"unshift":"push"]((()=>{a=t,o(0,a)}))}]}export default class extends t{constructor(t){super(),n(this,t,p,h,o,{})}}
