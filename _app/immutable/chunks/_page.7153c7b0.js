import{s}from"./boolean_attributes.386354a9.js";import{S as e,i as a}from"./index.34db41e6.js";import{b6 as t,V as n,D as o,S as r,p as i,W as c,v as d,b7 as l}from"./trzy.7fd33118.js";function w(s){const{scene:e,camera:a}=t();return(async()=>{a.current.position.set(-6,8,6),a.current.lookAt(0,0,0),new n;const s=new o;s.shadow.normalBias=.01,s.position.set(3,3,3),s.intensity=1.9,e.add(s);const t=new r;t.shadow.normalBias=.01,t.position.set(3.5,5,-3),t.angle=.68,t.intensity=32,t.penumbra=.97,e.add(t);const w=new i,m=new c(10,10,1,1).rotateX(-Math.PI/2),p=new d(m,w);p.name="Floor",p.receiveShadow=!0,e.add(p);const u=await l("glb/burger.glb");u.scene.position.y=.8,u.scene.traverse((s=>{s.castShadow=!0,s.receiveShadow=!0})),e.add(u.scene)})(),[]}class m extends e{constructor(e){super(),a(this,e,w,null,s,{})}}export{m as default};
