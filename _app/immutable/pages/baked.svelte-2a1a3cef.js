import{S as s,i as a,s as t}from"../chunks/index-32ca3be3.js";import{j as o,s as c,l as e,k as i,m as n}from"../chunks/camera-ea5257fe.js";import{c as r}from"../chunks/lights-dfca57a0.js";function d(s){return(async()=>{o.position.set(.5,1.5,.5);const s=r(void 0,4);c.add(s),await e("chair.glb");const{scene:a}=i("chair.glb");c.add(a),o.lookAt(c.getObjectByName("Chair").position),n()})(),[]}class l extends s{constructor(s){super(),a(this,s,d,null,t,{})}}export{l as default};