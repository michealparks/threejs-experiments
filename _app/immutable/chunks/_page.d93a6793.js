import{s as e}from"./boolean_attributes.386354a9.js";import{S as o,i as t}from"./index.34db41e6.js";import{b6 as s,V as r,bh as n,f as a,v as i,B as l,X as u,P as m}from"./trzy.7fd33118.js";function c(e){const{scene:o,camera:t,renderer:c,update:d}=s();t.current.position.set(0,0,2),o.lookAt(new r);const v={...n.lights,time:{value:0},resolution:{value:new a}},f=new i(new l(.5,.5,.5),new u({fragmentShader:"uniform vec2 resolution;uniform float time;void main(){vec2 uv=gl_FragCoord.xy/resolution;vec3 rgb=0.5+0.5*cos(time+uv.xyx+vec3(0,2,4));gl_FragColor=vec4(rgb,1.0);}",uniforms:v,lights:!0}));o.add(f);const g=new m;g.position.set(-1,2,4),g.lookAt(new r),o.add(g);let h=0;return d(((e,o)=>{h+=o,v.resolution.value.set(c.domElement.width,c.domElement.height),v.time.value=h/100,f.rotation.x=h/1e3,f.rotation.y=h/1e3})),[]}class d extends o{constructor(o){super(),t(this,o,c,null,e,{})}}export{d as default};
