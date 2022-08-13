import{S as s,i as e,s as a}from"../chunks/index-32ca3be3.js";import{j as o,V as n,s as i,x as t,O as c,v as r,M as l,m as d,u as m}from"../chunks/camera-ea5257fe.js";import{d as h}from"../chunks/lights-dfca57a0.js";import{C as u}from"../chunks/constants-4ee718e8.js";function p(s){const e=8,a=[{name:"Mercury",scale:.3,distance:1,color:u.lightGray,emissive:u.darkGray},{name:"Venus",scale:.6,distance:3,color:u.lightOrange,emissive:u.darkOrange},{name:"Earth",scale:1,distance:5,color:u.lightBlue,emissive:u.darkBlue,moons:[{name:"Luna"}]},{name:"Mars",scale:.9,distance:8,color:u.lightRed,emissive:u.darkRed},{name:"Jupiter",scale:2.5,distance:14,color:u.lightestPink,emissive:u.salmon},{name:"Saturn",scale:2.2,distance:19,color:u.warmLight,emissive:u.warmestLight},{name:"Uranus",scale:1.9,distance:24,color:u.lightCyan,emissive:u.darkCyan},{name:"Neptune",scale:1.5,distance:28,color:u.lightIndigo,emissive:u.darkIndigo}];o.position.set(0,0,90),o.lookAt(new n);const p=h();p.intensity=50,p.shadow.radius=16,i.add(p);const w=[],g=new t(1,40,40),v=new c;i.add(v),w.push(v);{const s=new r({emissive:u.yellow}),a=new l(g,s);a.scale.multiplyScalar(e),v.add(a),w.push(a)}for(const{name:o,scale:n,color:t,emissive:d,distance:m,moons:h}of a){const s=new c;s.rotation.y=Math.random()*Math.PI*2,i.add(s),w.push(s);const a=new r({color:t,emissive:d}),p=new l(g,a);if(p.name=o,p.castShadow=!0,p.receiveShadow=!0,p.scale.multiplyScalar(n),h)for(const{name:o}of h){const a=new c;s.add(a),w.push(a),a.add(p),a.position.x=e+m;const n=new r({color:u.lightGray,emissive:u.darkGray}),i=new l(g,n);i.name=o,i.castShadow=!0,i.receiveShadow=!0,i.scale.multiplyScalar(.2),i.position.x=1.5,a.add(i)}else p.position.x=e+m,s.add(p)}let f="side";return window.setInterval((()=>{"side"===f?(o.position.set(0,90,0),o.lookAt(0,0,0),f="top"):(o.position.set(0,0,90),o.lookAt(0,0,0),f="side")}),5e3),m((s=>{let e=0,a=w.length;for(const o of w)o.rotation.y=s/1e3*(1.1-e/a),e++})),d(),[]}class w extends s{constructor(s){super(),e(this,s,p,null,a,{})}}export{w as default};