import{S as t,i as n,s,e,c as a,a as o,d as i,f as c,H as r,z as u,W as f}from"../../chunks/vendor-c53ba54f.js";import{G as l}from"../../chunks/gl-6fe60869.js";import{a as d}from"../../chunks/assets-ca329fe6.js";import{O as m}from"../../chunks/orbitControls-8bff3167.js";function h(t){let n;return{c(){n=e("canvas")},l(t){n=a(t,"CANVAS",{}),o(n).forEach(i)},m(s,e){c(s,n,e),t[1](n)},p:r,i:r,o:r,d(s){s&&i(n),t[1](null)}}}function p(t,n,s){var e=this&&this.__awaiter||function(t,n,s,e){return new(s||(s=Promise))((function(a,o){function i(t){try{r(e.next(t))}catch(n){o(n)}}function c(t){try{r(e.throw(t))}catch(n){o(n)}}function r(t){var n;t.done?a(t.value):(n=t.value,n instanceof s?n:new s((function(t){t(n)}))).then(i,c)}r((e=e.apply(t,n||[])).next())}))};let a;return u((()=>e(void 0,void 0,void 0,(function*(){const t=new l(a),n=new m(t.camera,document.body);yield Promise.all([t.init(),d.load("desert.glb")]);const{scene:s}=d.get("desert.glb");t.scene.add(s),t.ambientLight.intensity=2,n.maxDistance=200,n.autoRotate=!0,t.camera.position.set(10,30,30),n.enableZoom=!1,t.setAnimationLoop((()=>{n.update()}))})))),[a,function(t){f[t?"unshift":"push"]((()=>{a=t,s(0,a)}))}]}export default class extends t{constructor(t){super(),n(this,t,p,h,s,{})}}
