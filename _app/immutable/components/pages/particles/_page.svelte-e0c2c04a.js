import{S as t,i as s,s as e}from"../../../chunks/index-f58f646f.js";import{c as o,b as n,s as a,j as i,V as r,B as c,h as d,d as p,p as l,C as u,A as h,P as f,g as w,u as m}from"../../../chunks/index-40248176.js";import{a as A}from"../../../chunks/util-three-38ee6e66.js";function b(t){o.position.set(2,2,2);const s=n();a.add(s);const e=A(void 0,16777215);a.add(e);const b=i();b.position.set(1,1,-1),b.lookAt(new r),b.intensity=5,a.add(b);const k=new c,x=new Float32Array(3e4),y=new Float32Array(3e4);for(let o=0;o<3e4;o+=1)x[o]=20*(Math.random()-.5),y[o]=Math.random();const g=new d(x,3);k.setAttribute("position",g),k.setAttribute("color",new d(y,3));return(async()=>{const t=await p("circle_01.png"),s=new l;s.size=.075,s.sizeAttenuation=!0,s.color=new u("#ff88cc"),s.map=t,s.transparent=!0,s.alphaTest=.1,s.depthTest=!1,s.depthWrite=!1,s.blending=h,s.vertexColors=!0;const n=new f(k,s);a.add(n),o.lookAt(n.position),m((t=>{for(let s=0;s<1e4;s+=1){const e=k.attributes.position.getX(s);k.attributes.position.setY(s,Math.sin(t/1e3+e))}e.position.y=Math.sin(t/1e3),k.attributes.position.needsUpdate=!0})),w()})(),[]}class k extends t{constructor(t){super(),s(this,t,b,null,e,{})}}export{k as default};
