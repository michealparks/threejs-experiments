import{S as x,i as g,s as v}from"../../chunks/index-9379afd2.js";import{G as M,au as u,a9 as h,V as L,a as y}from"../../chunks/gl-748db77b.js";import{d as m}from"../../chunks/util-three-07032713.js";function O(b){const t=M();t.camera.position.set(0,0,7);const f=new u,l=new u,j=new h(-3,0,0),p=new h(10,0,0);p.normalize(),f.set(j,p);const e=m(.5),o=m(.5),n=m(.5);e.position.x=-2,n.position.x=2,t.scene.add(e,o,n),t.camera.lookAt(o.position);const c=new L;return t.canvas.addEventListener("mousemove",i=>{c.x=i.clientX/innerWidth*2-1,c.y=-(i.clientY/innerHeight)*2+1},{passive:!0}),t.setAnimationLoop((i,a)=>{e.position.y=Math.sin(a*.3)*1.5,o.position.y=Math.sin(a*.8)*1.5,n.position.y=Math.sin(a*1.4)*1.5,l.setFromCamera(c,t.camera);const r=[e,o,n],d=f.intersectObjects(r),w=l.intersectObjects(r);for(const s of r)s.material.color.set("orange");for(const s of d)s.object instanceof y&&s.object.material.color.set("crimson");for(const s of w)s.object instanceof y&&s.object.material.color.set("hotpink")}),[]}class $ extends x{constructor(t){super(),g(this,t,O,null,v,{})}}export{$ as default};
