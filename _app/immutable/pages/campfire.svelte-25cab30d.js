import{S as t,i as e,s}from"../chunks/index-32ca3be3.js";import{O as a,I as o,j as r,s as n,v as i,l as c,k as l,m,u as p}from"../chunks/camera-ea5257fe.js";import{c as d,a as f,b as u}from"../chunks/lights-dfca57a0.js";import{r as y,a as b}from"../chunks/util-343fee83.js";import{c as h}from"../chunks/util-three-b3683b89.js";const g=new a,j=[],v=(t,e)=>{const s=3*t,[a,o]=b(1.25);e.p[s+0]=a,e.p[s+1]=y(.1,.75),e.p[s+2]=o,e.s[t]=1,e.sv[t]=y(-.1,-.03),e.pv[s+0]=y(-.01,.05),e.pv[s+1]=y(.01,.05),e.pv[s+2]=y(-.01,.05)},w=(t,e)=>{for(const s of e){if(s.matrixAutoUpdate=!0,s.position.set(0,0,0),Array.isArray(s.material))throw new TypeError("Material can not be array");const e=new o(s.geometry.clone(),s.material.clone(),100),a={mesh:e,p:new Float32Array(300),r:new Float32Array(300),s:new Float32Array(100),pv:new Float32Array(300),sv:new Float32Array(300)};e.position.set(0,.5,0);let r=0;for(;r<100;)v(r,a),r+=1;j.push(a),t.add(e)}},A=()=>{for(const t of j){const{mesh:e,p:s,s:a,pv:o,sv:r}=t;let n=0;for(;n<100;){const i=3*n;a[n]+=r[n],a[n]<=0&&v(n,t),s[i+0]+=o[i+0],s[i+1]+=o[i+1],s[i+2]+=o[i+2],g.position.set(s[i],s[i+1],s[i+2]),g.scale.set(a[n],a[n],a[n]),g.updateMatrix(),e.setMatrixAt(n,g.matrix),n+=1}e.instanceMatrix.needsUpdate=!0}};function S(t){return(async()=>{r.position.set(20,4,18);const t=d(),e=f();e.color.setHSL(.6,1,.6),e.groundColor.setHSL(.095,1,.75),n.add(e),e.position.set(0,50,0);const s=u();s.color.setHSL(.1,1,.95),s.position.set(-1,1.75,1).multiplyScalar(30),n.add(s);const a=h(void 0,64);n.add(a);const o={h:0,s:0,l:0};a.material instanceof i&&a.material.color.getHSL(o);let{l:y}=o,b=1e-4,g=1e-4;await c("FloatingRockScene.glb");const{scene:j}=l("FloatingRockScene.glb");w(j.getObjectByName("Fire"),[j.getObjectByName("Ember1"),j.getObjectByName("Ember2"),j.getObjectByName("Ember3")]),n.add(j),p((()=>{y-=g,(y<0||y>1)&&(b=-b,g=b,y<=0&&(y=0),y>=1&&(y=1)),t.intensity=y,a.material instanceof i&&a.material.color.setHSL(o.h,o.s,y),A()})),m()})(),[]}class k extends t{constructor(t){super(),e(this,t,S,null,s,{})}}export{k as default};