import{S as s,i as a,s as t,e as n,c as e,a as o,d as i,f as r,H as c,z as l,ac as u,aJ as h,ap as f,ar as d,as as m,Q as p,V as v}from"../../chunks/vendor-60c0aab2.js";import{G as g}from"../../chunks/gl-97786ef4.js";import{a as w}from"../../chunks/assets-06283924.js";import{e as j}from"../../chunks/util-three-4a89a2db.js";import"../../chunks/paths-45dac81d.js";function k(s){let a;return{c(){a=n("canvas")},l(s){a=e(s,"CANVAS",{}),o(a).forEach(i)},m(t,n){r(t,a,n),s[1](a)},p:c,i:c,o:c,d(t){t&&i(a),s[1](null)}}}function x(s,a,t){var n=this&&this.__awaiter||function(s,a,t,n){return new(t||(t=Promise))((function(e,o){function i(s){try{c(n.next(s))}catch(a){o(a)}}function r(s){try{c(n.throw(s))}catch(a){o(a)}}function c(s){var a;s.done?e(s.value):(a=s.value,a instanceof t?a:new t((function(s){s(a)}))).then(i,r)}c((n=n.apply(s,a||[])).next())}))};let e;return l((()=>n(void 0,void 0,void 0,(function*(){const s=new g(e);yield Promise.all([s.init(),w.load("hello-shader.frag.glsl")]),s.camera.position.set(0,0,2),s.scene.lookAt(new u);const a=Object.assign(Object.assign({},h.lights),{time:{value:0},resolution:{value:new f}}),t=new d(new m(.5,.5,.5),new p({fragmentShader:w.get("hello-shader.frag.glsl"),uniforms:a,fog:!0,lights:!0}));s.scene.add(t);const n=j();n.position.set(-1,2,4),n.lookAt(new u),s.scene.add(n);s.setAnimationLoop(((n,e)=>{a.resolution.value.set(s.canvas.width,s.canvas.height),a.time.value=e,t.rotation.x=e,t.rotation.y=e}))})))),[e,function(s){v[s?"unshift":"push"]((()=>{e=s,t(0,e)}))}]}export default class extends s{constructor(s){super(),a(this,s,x,k,t,{})}}
