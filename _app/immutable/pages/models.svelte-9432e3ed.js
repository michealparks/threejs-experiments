import{S as s,i as t,s as a}from"../chunks/index-32ca3be3.js";import{V as o,j as e,s as n,l as c,k as i,m as r}from"../chunks/camera-6498258f.js";import{b as d,e as u}from"../chunks/lights-8dd5fc29.js";function l(s){const t=new o;e.position.set(0,4,5);const a=d();a.position.set(3,3,3),a.lookAt(t),a.castShadow=!0,a.intensity=4,n.add(a);const l=u();l.position.set(-3,3,-3),l.lookAt(t),l.castShadow=!0,l.intensity=5,n.add(l);return(async()=>{await c("burger.glb");const s=i("burger.glb");s.scene.traverse((s=>{s.castShadow=!0,s.receiveShadow=!0})),n.add(s.scene),r()})(),[]}class h extends s{constructor(s){super(),t(this,s,l,null,a,{})}}export{h as default};