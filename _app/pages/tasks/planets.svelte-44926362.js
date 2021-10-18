import{S as e,i as a,s,e as n,c as t,a as o,d as i,f as c,H as r,z as l,ad as d,av as m,aK as u,au as h,U as f,W as p}from"../../chunks/vendor-dc2a1d13.js";import{G as v,C as w}from"../../chunks/gl-effbc97e.js";import{e as y}from"../../chunks/util-three-67e281f2.js";function g(e){let a;return{c(){a=n("canvas")},l(e){a=t(e,"CANVAS",{}),o(a).forEach(i)},m(s,n){c(s,a,n),e[1](a)},p:r,i:r,o:r,d(s){s&&i(a),e[1](null)}}}function k(e,a,s){var n=this&&this.__awaiter||function(e,a,s,n){return new(s||(s=Promise))((function(t,o){function i(e){try{r(n.next(e))}catch(a){o(a)}}function c(e){try{r(n.throw(e))}catch(a){o(a)}}function r(e){var a;e.done?t(e.value):(a=e.value,a instanceof s?a:new s((function(e){e(a)}))).then(i,c)}r((n=n.apply(e,a||[])).next())}))};let t;const o=8,i=[{name:"Mercury",scale:.3,distance:1,color:w.lightGray,emissive:w.darkGray},{name:"Venus",scale:.6,distance:3,color:w.lightOrange,emissive:w.darkOrange},{name:"Earth",scale:1,distance:5,color:w.lightBlue,emissive:w.darkBlue,moons:[{name:"Luna"}]},{name:"Mars",scale:.9,distance:8,color:w.lightRed,emissive:w.darkRed},{name:"Jupiter",scale:2.5,distance:14,color:w.lightestPink,emissive:w.salmon},{name:"Saturn",scale:2.2,distance:19,color:w.warmLight,emissive:w.warmestLight},{name:"Uranus",scale:1.9,distance:24,color:w.lightCyan,emissive:w.darkCyan},{name:"Neptune",scale:1.5,distance:28,color:w.lightIndigo,emissive:w.darkIndigo}];return l((()=>n(void 0,void 0,void 0,(function*(){const e=new v(t);yield e.init(),e.camera.position.set(0,0,90),e.camera.lookAt(new d);const a=y();a.intensity=50,a.shadow.radius=16,e.scene.add(a);const s=[],n=new m(1,40,40),c=new u;e.scene.add(c),s.push(c);{const e=new h({emissive:w.yellow}),a=new f(n,e);a.scale.multiplyScalar(o),c.add(a),s.push(a)}for(const{name:t,scale:l,color:d,emissive:m,distance:p,moons:v}of i){const a=new u;a.rotation.y=Math.random()*Math.PI*2,e.scene.add(a),s.push(a);const i=new h({color:d,emissive:m}),c=new f(n,i);if(c.name=t,c.castShadow=!0,c.receiveShadow=!0,c.scale.multiplyScalar(l),v)for(const{name:e}of v){const e=new u;a.add(e),s.push(e),e.add(c),e.position.x=o+p;const t=new h({color:w.lightGray,emissive:w.darkGray}),i=new f(n,t);i.castShadow=!0,i.receiveShadow=!0,i.scale.multiplyScalar(.2),i.position.x=1.5,e.add(i)}else c.position.x=o+p,a.add(c)}let r="side";setInterval((()=>{"side"===r?(e.camera.position.set(0,90,0),e.camera.lookAt(0,0,0),r="top"):(e.camera.position.set(0,0,90),e.camera.lookAt(0,0,0),r="side")}),5e3),e.setAnimationLoop((e=>{let a=0,n=s.length;for(const t of s)t.rotation.y+=e*(1.1-a/n),a++}))})))),[t,function(e){p[e?"unshift":"push"]((()=>{t=e,s(0,t)}))}]}export default class extends e{constructor(e){super(),a(this,e,k,g,s,{})}}
