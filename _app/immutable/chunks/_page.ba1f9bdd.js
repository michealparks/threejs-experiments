import{s}from"./boolean_attributes.386354a9.js";import{S as t,i as o}from"./index.34db41e6.js";import{b6 as r,as as a,b7 as e}from"./trzy.7fd33118.js";function n(s){const{camera:t,scene:o}=r();return(async()=>{t.current.position.set(4,4,4),t.current.lookAt(0,0,0),o.add(new a(void 0,3));const s=(await e("glb/construction_fliers_1.glb")).scene;s.rotation.set(0,-Math.PI/4,0),s.position.set(0,-2,0),o.add(s)})(),[]}class i extends t{constructor(t){super(),o(this,t,n,null,s,{})}}export{i as default};