import{S as x,i as M,s as g,w as v}from"../../chunks/index-9379afd2.js";import{G as L,au as u,aa as y,V as O,a as h}from"../../chunks/gl-9f8be024.js";import{d as m}from"../../chunks/util-three-bda16444.js";function S(b){return v(async()=>{const t=L(),f=new u,l=new u,j=new y(-3,0,0),p=new y(10,0,0);p.normalize(),f.set(j,p);const o=m(.5),e=m(.5),n=m(.5);o.position.x=-2,n.position.x=2,t.scene.add(o,e,n),t.camera.position.set(0,0,7),t.camera.lookAt(e.position);const a=new O;t.canvas.addEventListener("mousemove",c=>{a.x=c.clientX/innerWidth*2-1,a.y=-(c.clientY/innerHeight)*2+1},{passive:!0}),t.setAnimationLoop((c,i)=>{o.position.y=Math.sin(i*.3)*1.5,e.position.y=Math.sin(i*.8)*1.5,n.position.y=Math.sin(i*1.4)*1.5,l.setFromCamera(a,t.camera);const r=[o,e,n],d=f.intersectObjects(r),w=l.intersectObjects(r);for(const s of r)s.material.color.set("orange");for(const s of d)s.object instanceof h&&s.object.material.color.set("crimson");for(const s of w)s.object instanceof h&&s.object.material.color.set("hotpink")})}),[]}class A extends x{constructor(t){super(),M(this,t,S,null,g,{})}}export{A as default};