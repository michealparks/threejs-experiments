import{S as t,i as n,s as e,e as s,c as o,a,d as i,f as r,H as c,z as u,W as l,X as f,aB as d,R as p,Y as m,U as h,ac as w,V as b}from"../../chunks/vendor-60c0aab2.js";import{G as v}from"../../chunks/gl-97786ef4.js";import{a as y}from"../../chunks/assets-06283924.js";import{O as A}from"../../chunks/orbitControls-41e68a8b.js";import{c as k,a as g}from"../../chunks/util-three-4a89a2db.js";import"../../chunks/paths-45dac81d.js";function j(t){let n;return{c(){n=s("canvas")},l(t){n=o(t,"CANVAS",{}),a(n).forEach(i)},m(e,s){r(e,n,s),t[1](n)},p:c,i:c,o:c,d(e){e&&i(n),t[1](null)}}}function x(t,n,e){var s=this&&this.__awaiter||function(t,n,e,s){return new(e||(e=Promise))((function(o,a){function i(t){try{c(s.next(t))}catch(n){a(n)}}function r(t){try{c(s.throw(t))}catch(n){a(n)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(i,r)}c((s=s.apply(t,n||[])).next())}))};let o;return u((()=>s(void 0,void 0,void 0,(function*(){const t=new v(o),n=new A(t.camera,document.body);n.autoRotate=!0,n.minDistance=-1/0,n.enableZoom=!1,yield Promise.all([t.init(),y.load("circle_01.png")]),t.ambientLight.intensity=.5;const e=new l,s=1e4,a=new Float32Array(3e4),i=new Float32Array(3e4);for(let o=0;o<3e4;o+=1)a[o]=20*(Math.random()-.5),i[o]=Math.random();const r=new f(a,3);e.setAttribute("position",r),e.setAttribute("color",new f(i,3));const c=new d;c.size=.075,c.sizeAttenuation=!0,c.color=new p("#ff88cc"),c.map=y.get("circle_01.png"),c.transparent=!0,c.depthWrite=!1,c.blending=m,c.vertexColors=!0;const u=new h(e,c);t.scene.add(u),t.camera.position.set(2,2,2),t.camera.lookAt(u.position);const b=k();b.material.color=new p("#ffffff"),t.scene.add(b);const j=g();j.position.set(1,1,-1),j.lookAt(new w),j.intensity=5,t.scene.add(j),t.setAnimationLoop(((t,o)=>{for(let n=0;n<s;n+=1){const t=e.attributes.position.getX(n);e.attributes.position.setY(n,Math.sin(o+t))}b.position.y=Math.sin(o),e.attributes.position.needsUpdate=!0,n.update()}))})))),[o,function(t){b[t?"unshift":"push"]((()=>{o=t,e(0,o)}))}]}export default class extends t{constructor(t){super(),n(this,t,x,j,e,{})}}
