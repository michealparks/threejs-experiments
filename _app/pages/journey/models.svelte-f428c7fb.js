import{S as s,i as t,s as n,e,c as o,a,d as i,f as c,H as r,z as u,ac as f,V as d}from"../../chunks/vendor-6eb28c59.js";import{G as l}from"../../chunks/gl-07a74312.js";import{a as h}from"../../chunks/assets-bb9b9f0c.js";import{O as m}from"../../chunks/orbitControls-0f6d4ea7.js";import{a as p,d as v}from"../../chunks/util-three-092cff16.js";import{l as w}from"../../chunks/loading-179e7449.js";function b(s){let t;return{c(){t=e("canvas")},l(s){t=o(s,"CANVAS",{}),a(t).forEach(i)},m(n,e){c(n,t,e),s[1](t)},p:r,i:r,o:r,d(n){n&&i(t),s[1](null)}}}function k(s,t,n){var e=this&&this.__awaiter||function(s,t,n,e){return new(n||(n=Promise))((function(o,a){function i(s){try{r(e.next(s))}catch(t){a(t)}}function c(s){try{r(e.throw(s))}catch(t){a(t)}}function r(s){var t;s.done?o(s.value):(t=s.value,t instanceof n?t:new n((function(s){s(t)}))).then(i,c)}r((e=e.apply(s,t||[])).next())}))};let o;return u((()=>e(void 0,void 0,void 0,(function*(){const s=new f,t=new l(o),n=w(t.scene),e=new m(t.camera,o);yield t.init(),yield h.load("burger.glb");const a=h.get("burger.glb"),i=p();i.position.set(3,3,3),i.lookAt(s),i.castShadow=!0,i.intensity=2,t.scene.add(i);const c=v();c.position.set(-3,3,-3),c.lookAt(s),c.castShadow=!0,c.intensity=2,a.scene.traverse((s=>{s.castShadow=!0,s.receiveShadow=!0})),t.scene.add(a.scene),t.setAnimationLoop((s=>{e.update()})),n()})))),[o,function(s){d[s?"unshift":"push"]((()=>{o=s,n(0,o)}))}]}export default class extends s{constructor(s){super(),t(this,s,k,b,n,{})}}
