import{S as t,i as s,s as n}from"../chunks/index.6b6f0a4a.js";import{v as o,A as e,w as a,t as i,V as r}from"../chunks/trzy.81d23169.js";import{C as c}from"../chunks/constants.f5ae4ec0.js";import{a as p}from"../chunks/util-three.a94fd93c.js";function l(t){const{scene:s,camera:n,update:l}=o(),u=new e(void 0,.3);s.add(u);const m=new a;m.intensity=100,m.position.set(0,3,0);const d=new a;d.intensity=50,d.position.set(0,3,2);const w=new a;w.intensity=10,w.position.set(2,1,2),s.add(m,d,w);const h=(new i).makeRotationX(.005).multiply((new i).makeRotationY(.005)).multiply((new i).makeRotationZ(.005)),f=new i,k=[];let y=0;const x=(t,s)=>{const n=t%3*s-s,o=(t%9/3|0)*s-s,e=(t/9|0)*s-s;f.makeTranslation(n,o,e)};for(;y<27;){const t=p(1,c.lightBlue);t.castShadow=!0,t.receiveShadow=!0,k.push(t),s.add(t),x(y,1),t.applyMatrix4(f),y+=1}let j=0;return n.position.set(0,1,10),n.lookAt(new r),l((()=>{j+=.05,n.applyMatrix4(h);for(const[t,s]of k.entries())x(t,.01*Math.sin(j/2)),s.applyMatrix4(f)})),[]}class u extends t{constructor(t){super(),s(this,t,l,null,n,{})}}export{u as default};
