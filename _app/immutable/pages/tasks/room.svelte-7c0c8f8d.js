import{S as i,i as r,s as m,w as c}from"../../chunks/index-9379afd2.js";import{G as l,aa as p}from"../../chunks/gl-9f8be024.js";import{a as s}from"../../chunks/assets-a572b544.js";import{O as f}from"../../chunks/orbit-controls-8a0943e2.js";import{e as u}from"../../chunks/util-three-bda16444.js";function d(a){return c(async()=>{const t=l(),e=new f(t.camera,t.canvas);t.camera.position.set(-1,3,-5),t.camera.lookAt(new p),await s.load("room_1.glb");const n=s.get("room_1.glb").scene;t.scene.add(n);const o=u();o.intensity=3,o.position.set(1,4,1),t.scene.add(o),t.ambientLight.intensity=.5,t.setAnimationLoop(()=>{e.update()})}),[]}class _ extends i{constructor(t){super(),r(this,t,d,null,m,{})}}export{_ as default};