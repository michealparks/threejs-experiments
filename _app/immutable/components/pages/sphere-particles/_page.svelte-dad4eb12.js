import{S as s,i as e,s as t}from"../../../chunks/index-1236a393.js";import{c as n,j as o,B as i,k as a,w as r,A as p,P as c,s as u}from"../../../chunks/index-096e168f.js";import{b as d}from"../../../chunks/util-21cdfddc.js";import{d as m}from"../../../chunks/debug-10d7a673.js";function f(s){const e={count:1e3,pointSize:.02,sphereSize:3},t={count:{min:100,max:1e6,step:100},pointSize:{min:.001,max:.1,step:.001},sphereSize:{min:1,max:100,step:1}};n.position.set(0,0,5);const f=m.addPane("game");for(const[n,o]of Object.entries(t))f.addInput(e,n,o);let h,l,z;return(s=>{z&&(h.dispose(),l.dispose(),s.remove(z)),h=new i;const t=new Float32Array(3*e.count);for(let n=0;n<3*e.count;n+=3){const[s,o,i]=d(e.sphereSize);t[n+0]=s,t[n+1]=o,t[n+2]=i}h.setAttribute("position",new a(t,3)),l=new r,l.size=e.pointSize,l.sizeAttenuation=!0,l.depthWrite=!1,l.blending=p,z=new c(h,l),s.add(z)})(u),o(),[]}class h extends s{constructor(s){super(),e(this,s,f,null,t,{})}}export{h as default};
