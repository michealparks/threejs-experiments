import{S as t,i as n,s as e,e as s,c as o,a,d as i,f as r,H as c,z as u,W as f,X as l,aB as p,R as d,Y as m,U as h,ac as w,V as b}from"../../chunks/vendor-6eb28c59.js";import{G as v}from"../../chunks/gl-07a74312.js";import{a as y}from"../../chunks/assets-bb9b9f0c.js";import{l as A}from"../../chunks/loading-179e7449.js";import{O as g}from"../../chunks/orbitControls-0f6d4ea7.js";import{c as k,a as j}from"../../chunks/util-three-092cff16.js";function x(t){let n;return{c(){n=s("canvas")},l(t){n=o(t,"CANVAS",{}),a(n).forEach(i)},m(e,s){r(e,n,s),t[1](n)},p:c,i:c,o:c,d(e){e&&i(n),t[1](null)}}}function M(t,n,e){var s=this&&this.__awaiter||function(t,n,e,s){return new(e||(e=Promise))((function(o,a){function i(t){try{c(s.next(t))}catch(n){a(n)}}function r(t){try{c(s.throw(t))}catch(n){a(n)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(i,r)}c((s=s.apply(t,n||[])).next())}))};let o;return u((()=>s(void 0,void 0,void 0,(function*(){const t=new v(o),n=A(t.scene),e=new g(t.camera,document.body);e.autoRotate=!0,e.minDistance=-1/0,e.enableZoom=!1,yield Promise.all([t.init(),y.load("circle_01.png")]),t.ambientLight.intensity=.5;const s=new f,a=1e4,i=new Float32Array(3e4),r=new Float32Array(3e4);for(let o=0;o<3e4;o+=1)i[o]=20*(Math.random()-.5),r[o]=Math.random();const c=new l(i,3);s.setAttribute("position",c),s.setAttribute("color",new l(r,3));const u=new p;u.size=.075,u.sizeAttenuation=!0,u.color=new d("#ff88cc"),u.map=y.get("circle_01.png"),u.transparent=!0,u.alphaTest=.1,u.depthTest=!1,u.depthWrite=!1,u.blending=m,u.vertexColors=!0;const b=new h(s,u);t.scene.add(b),t.camera.position.set(2,2,2),t.camera.lookAt(b.position);const x=k();x.material.color=new d("#ffffff"),t.scene.add(x);const M=j();M.position.set(1,1,-1),M.lookAt(new w),M.intensity=5,t.scene.add(M),t.setAnimationLoop(((t,n)=>{for(let e=0;e<a;e+=1){const t=s.attributes.position.getX(e);s.attributes.position.setY(e,Math.sin(n+t))}x.position.y=Math.sin(n),s.attributes.position.needsUpdate=!0,e.update()})),n()})))),[o,function(t){b[t?"unshift":"push"]((()=>{o=t,e(0,o)}))}]}export default class extends t{constructor(t){super(),n(this,t,M,x,e,{})}}
