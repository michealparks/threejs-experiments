import{S as n,i as s,s as a,e as t,k as e,c as o,a as r,d as i,n as d,b as u,f as c,H as p,z as m,aB as h,V as l,W as f,R as w,X as v,aC as x,Y as M,U as b}from"../../chunks/vendor-9aeeaeec.js";import{G as I}from"../../chunks/gl-d705d9d2.js";import{O as C}from"../../chunks/orbitControls-43b008a5.js";function A(n){let s,a,m;return{c(){s=t("canvas"),a=e(),m=t("div"),this.h()},l(n){s=o(n,"CANVAS",{}),r(s).forEach(i),a=d(n),m=o(n,"DIV",{class:!0}),r(m).forEach(i),this.h()},h(){u(m,"class","pane")},m(t,e){c(t,s,e),n[2](s),c(t,a,e),c(t,m,e),n[3](m)},p:p,i:p,o:p,d(t){t&&i(s),n[2](null),t&&i(a),t&&i(m),n[3](null)}}}function P(n,s,a){var t=this&&this.__awaiter||function(n,s,a,t){return new(a||(a=Promise))((function(e,o){function r(n){try{d(t.next(n))}catch(s){o(s)}}function i(n){try{d(t.throw(n))}catch(s){o(s)}}function d(n){var s;n.done?e(n.value):(s=n.value,s instanceof a?s:new a((function(n){n(s)}))).then(r,i)}d((t=t.apply(n,s||[])).next())}))};let e,o;const r={count:1e4,pointSize:.001,radius:5,branches:3,spin:1,randomness:.38,randomnessPower:3,insideColor:"#ff6030",outsideColor:"#1b3984"};let i=null,d=null,u=null;const c=n=>{null!==u&&(i.dispose(),d.dispose(),n.remove(u)),i=new f;const s=new Float32Array(3*r.count),a=new Float32Array(3*r.count),t=new w(r.insideColor),e=new w(r.outsideColor);for(let o=0,i=0;o<3*r.count;o+=1,i=3*o){const n=Math.random()*r.radius,d=n*r.spin,u=o%r.branches/r.branches*Math.PI*2,c=Math.pow(Math.random(),r.randomnessPower)*(Math.random()<.5?1:-1)*r.randomness*n,p=Math.pow(Math.random(),r.randomnessPower)*(Math.random()<.5?1:-1)*r.randomness*n,m=Math.pow(Math.random(),r.randomnessPower)*(Math.random()<.5?1:-1)*r.randomness*n;s[i+0]=Math.cos(u+d)*n+c,s[i+1]=p,s[i+2]=Math.sin(u+d)*n+m;const h=t.clone();h.lerp(e,n/r.radius),a[i+0]=h.r,a[i+1]=h.g,a[i+2]=h.b}i.setAttribute("position",new v(s,3)),i.setAttribute("color",new v(a,3)),d=new x,d.size=r.pointSize,d.sizeAttenuation=!0,d.depthWrite=!1,d.blending=M,d.vertexColors=!0,u=new b(i,d),n.add(u)};return m((()=>t(void 0,void 0,void 0,(function*(){const n=new I(e),s=new C(n.camera,n.canvas);s.minDistance=-1/0,yield n.init(),c(n.scene);const a=new h.exports.Pane({container:o});a.addInput(r,"count",{min:100,max:1e6,step:100}),a.addInput(r,"pointSize",{min:.001,max:.1,step:.001}),a.addInput(r,"radius",{min:.1,max:10,step:.01}),a.addInput(r,"branches",{min:2,max:20,step:1}),a.addInput(r,"spin",{min:-5,max:5,step:.001}),a.addInput(r,"randomness",{min:0,max:2,step:.001}),a.addInput(r,"randomnessPower",{min:1,max:10,step:.001}),a.addInput(r,"insideColor"),a.addInput(r,"outsideColor"),a.on("change",(()=>c(n.scene))),n.setAnimationLoop((n=>{s.update()}))})))),[e,o,function(n){l[n?"unshift":"push"]((()=>{e=n,a(0,e)}))},function(n){l[n?"unshift":"push"]((()=>{o=n,a(1,o)}))}]}export default class extends n{constructor(n){super(),s(this,n,P,A,a,{})}}
