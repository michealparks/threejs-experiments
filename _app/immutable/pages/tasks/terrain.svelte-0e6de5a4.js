import{S as n,i as r,s as i,w as c}from"../../chunks/index-9379afd2.js";import{G as l}from"../../chunks/gl-4a6563e5.js";import{a as s}from"../../chunks/assets-793f00b4.js";import{O as m}from"../../chunks/orbitControls-6168c5f3.js";function u(a){return c(async()=>{const t=l(),e=new m(t.camera,t.canvas);await s.load("desert.glb");const{scene:o}=s.get("desert.glb");t.scene.add(o),t.ambientLight.intensity=2,e.maxDistance=200,e.autoRotate=!0,t.camera.position.set(10,30,30),e.enableZoom=!1,t.setAnimationLoop(()=>{e.update()})}),[]}class g extends n{constructor(t){super(),r(this,t,u,null,i,{})}}export{g as default};
