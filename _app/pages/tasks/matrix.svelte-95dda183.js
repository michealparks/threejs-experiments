import{S as t,i as n,s,e as a,c as e,a as o,d as i,f as c,H as r,z as u,aJ as l,ad as f,W as p}from"../../chunks/vendor-dc2a1d13.js";import{G as d,C as h}from"../../chunks/gl-effbc97e.js";import{e as m,c as w}from"../../chunks/util-three-67e281f2.js";function y(t){let n;return{c(){n=a("canvas")},l(t){n=e(t,"CANVAS",{}),o(n).forEach(i)},m(s,a){c(s,n,a),t[1](n)},p:r,i:r,o:r,d(s){s&&i(n),t[1](null)}}}function v(t,n,s){var a=this&&this.__awaiter||function(t,n,s,a){return new(s||(s=Promise))((function(e,o){function i(t){try{r(a.next(t))}catch(n){o(n)}}function c(t){try{r(a.throw(t))}catch(n){o(n)}}function r(t){var n;t.done?e(t.value):(n=t.value,n instanceof s?n:new s((function(t){t(n)}))).then(i,c)}r((a=a.apply(t,n||[])).next())}))};let e;return u((()=>a(void 0,void 0,void 0,(function*(){const t=new d(e);yield t.init();const n=m();n.intensity=100,n.position.set(0,3,0);const s=m();s.intensity=50,s.position.set(0,3,2);const a=m();a.intensity=10,a.position.set(2,1,2),t.scene.add(n,s,a);const o=(new l).makeRotationX(.005).multiply((new l).makeRotationY(.005)).multiply((new l).makeRotationZ(.005)),i=new l,c=[];let r=0;const u=(t,n)=>{const s=t%3*n-n,a=(t%9/3|0)*n-n,e=(t/9|0)*n-n;i.makeTranslation(s,a,e)};for(;r<27;){const n=w(1,h.lightBlue);n.castShadow=!0,n.receiveShadow=!0,c.push(n),t.scene.add(n),u(r,1),n.applyMatrix4(i),r+=1}let p=0;t.camera.position.set(0,1,10),t.camera.lookAt(new f),t.setAnimationLoop(((n,s)=>{p+=.05,t.camera.applyMatrix4(o);for(const[t,a]of c.entries())u(t,.01*Math.sin(p/2)),a.applyMatrix4(i)}))})))),[e,function(t){p[t?"unshift":"push"]((()=>{e=t,s(0,e)}))}]}export default class extends t{constructor(t){super(),n(this,t,v,y,s,{})}}
