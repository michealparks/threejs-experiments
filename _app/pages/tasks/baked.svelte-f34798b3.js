import{S as t,i as n,s as a,e,c as o,a as s,d as i,f as c,F as r,z as u,K as f}from"../../chunks/vendor-0a856f48.js";import{G as m}from"../../chunks/gl-03a07b41.js";import{a as h}from"../../chunks/assets-e3b74456.js";import{O as l}from"../../chunks/orbitControls-a26a318e.js";function d(t){let n;return{c(){n=e("canvas")},l(t){n=o(t,"CANVAS",{}),s(n).forEach(i)},m(a,e){c(a,n,e),t[1](n)},p:r,i:r,o:r,d(a){a&&i(n),t[1](null)}}}function p(t,n,a){var e=this&&this.__awaiter||function(t,n,a,e){return new(a||(a=Promise))((function(o,s){function i(t){try{r(e.next(t))}catch(n){s(n)}}function c(t){try{r(e.throw(t))}catch(n){s(n)}}function r(t){var n;t.done?o(t.value):(n=t.value,n instanceof a?n:new a((function(t){t(n)}))).then(i,c)}r((e=e.apply(t,n||[])).next())}))};let o;return u((()=>e(void 0,void 0,void 0,(function*(){const t=new m(o),n=new l(t.camera,document.body);n.minDistance=.1,t.ambientLight.intensity=4,yield Promise.all([t.init(),h.load("chair.glb")]);const{scene:a}=h.get("chair.glb");t.scene.add(a),t.camera.position.set(.5,1.5,.5),n.target.copy(a.getObjectByName("Chair").position),t.camera.lookAt(a.getObjectByName("Chair").position),t.setAnimationLoop((()=>{n.update()}))})))),[o,function(t){f[t?"unshift":"push"]((()=>{o=t,a(0,o)}))}]}export default class extends t{constructor(t){super(),n(this,t,p,d,a,{})}}
