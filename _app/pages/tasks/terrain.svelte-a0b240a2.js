import{S as t,i as n,s,e as a,c as e,a as o,d as i,f as c,F as r,z as u,K as d}from"../../chunks/vendor-0a856f48.js";import{G as f}from"../../chunks/gl-03a07b41.js";import{a as l}from"../../chunks/assets-a914e6b7.js";import{O as m}from"../../chunks/orbitControls-a26a318e.js";import"../../chunks/paths-45dac81d.js";function h(t){let n;return{c(){n=a("canvas")},l(t){n=e(t,"CANVAS",{}),o(n).forEach(i)},m(s,a){c(s,n,a),t[1](n)},p:r,i:r,o:r,d(s){s&&i(n),t[1](null)}}}function p(t,n,s){var a=this&&this.__awaiter||function(t,n,s,a){return new(s||(s=Promise))((function(e,o){function i(t){try{r(a.next(t))}catch(n){o(n)}}function c(t){try{r(a.throw(t))}catch(n){o(n)}}function r(t){var n;t.done?e(t.value):(n=t.value,n instanceof s?n:new s((function(t){t(n)}))).then(i,c)}r((a=a.apply(t,n||[])).next())}))};let e;return u((()=>a(void 0,void 0,void 0,(function*(){const t=new f(e),n=new m(t.camera,document.body);yield Promise.all([t.init(),l.load("desert.glb")]);const{scene:s}=l.get("desert.glb");t.scene.add(s),t.ambientLight.intensity=2,n.maxDistance=200,n.autoRotate=!0,t.camera.position.set(10,30,30),n.enableZoom=!1,t.setAnimationLoop((()=>{n.update()}))})))),[e,function(t){d[t?"unshift":"push"]((()=>{e=t,s(0,e)}))}]}export default class extends t{constructor(t){super(),n(this,t,p,h,s,{})}}
