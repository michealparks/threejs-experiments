import{S as s,i as e,s as o}from"../chunks/index-32ca3be3.js";import"../chunks/scene-95785fa5.js";import{j as t,s as a,V as n,a2 as i,h as r,M as u,w as l,N as m,m as c,u as d,r as f}from"../chunks/camera-ea5257fe.js";import{d as h}from"../chunks/lights-dfca57a0.js";function v(s){t.position.set(0,0,2),a.lookAt(new n);const e={...i.lights,time:{value:0},resolution:{value:new r}},o=new u(new l(.5,.5,.5),new m({fragmentShader:"uniform vec2 resolution;uniform float time;void main(){vec2 uv=gl_FragCoord.xy/resolution;vec3 rgb=0.5+0.5*cos(time+uv.xyx+vec3(0,2,4));gl_FragColor=vec4(rgb,1.0);}",uniforms:e,lights:!0}));a.add(o);const v=h();return v.position.set(-1,2,4),v.lookAt(new n),a.add(v),d((s=>{e.resolution.value.set(f.domElement.width,f.domElement.height),e.time.value=s/100,o.rotation.x=s/1e3,o.rotation.y=s/1e3})),c(),[]}class g extends s{constructor(s){super(),e(this,s,v,null,o,{})}}export{g as default};