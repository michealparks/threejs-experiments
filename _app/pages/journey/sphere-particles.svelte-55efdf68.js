import{S as n,i as t,s,e,k as a,c as i,a as o,d as c,n as u,b as r,f as p,H as l,z as h,aA as d,V as f,W as m,X as v,aB as w,Y as z,U as x}from"../../chunks/vendor-60c0aab2.js";import{G as S}from"../../chunks/gl-97786ef4.js";import{O as b}from"../../chunks/orbitControls-41e68a8b.js";import{r as A}from"../../chunks/util-c54cb71a.js";function k(n){let t,s,h;return{c(){t=e("canvas"),s=a(),h=e("div"),this.h()},l(n){t=i(n,"CANVAS",{}),o(t).forEach(c),s=u(n),h=i(n,"DIV",{class:!0}),o(h).forEach(c),this.h()},h(){r(h,"class","pane")},m(e,a){p(e,t,a),n[2](t),p(e,s,a),p(e,h,a),n[3](h)},p:l,i:l,o:l,d(e){e&&c(t),n[2](null),e&&c(s),e&&c(h),n[3](null)}}}function y(n,t,s){var e=this&&this.__awaiter||function(n,t,s,e){return new(s||(s=Promise))((function(a,i){function o(n){try{u(e.next(n))}catch(t){i(t)}}function c(n){try{u(e.throw(n))}catch(t){i(t)}}function u(n){var t;n.done?a(n.value):(t=n.value,t instanceof s?t:new s((function(n){n(t)}))).then(o,c)}u((e=e.apply(n,t||[])).next())}))};let a,i;const o={count:1e3,pointSize:.02,sphereSize:3};let c=null,u=null,r=null;const p=n=>{null!==r&&(c.dispose(),u.dispose(),n.remove(r)),c=new m;const t=new Float32Array(3*o.count);for(let s=0;s<3*o.count;s+=3){const[n,e,a]=A(o.sphereSize);t[s+0]=n,t[s+1]=e,t[s+2]=a}c.setAttribute("position",new v(t,3)),u=new w,u.size=o.pointSize,u.sizeAttenuation=!0,u.depthWrite=!1,u.blending=z,r=new x(c,u),n.add(r)};return h((()=>e(void 0,void 0,void 0,(function*(){const n=new S(a),t=new b(n.camera,n.canvas);t.minDistance=-1/0,yield n.init(),p(n.scene);const s=new d.exports.Pane({container:i});s.addInput(o,"count",{min:100,max:1e6,step:100}),s.addInput(o,"pointSize",{min:.001,max:.1,step:.001}),s.addInput(o,"sphereSize",{min:1,max:100,step:1}),s.on("change",(()=>p(n.scene))),n.setAnimationLoop((n=>{t.update()}))})))),[a,i,function(n){f[n?"unshift":"push"]((()=>{a=n,s(0,a)}))},function(n){f[n?"unshift":"push"]((()=>{i=n,s(1,i)}))}]}export default class extends n{constructor(n){super(),t(this,n,y,k,s,{})}}
