import{S as m,i as p,s as h,e as u,c as _,a as f,d as c,b as d,g as v,n as i,w as b,R as g}from"../chunks/index-9379afd2.js";import{G as k}from"../chunks/gl-4a6563e5.js";import{b as y}from"../chunks/util-three-9c89ac89.js";function A(n){let t;return{c(){t=u("canvas"),this.h()},l(a){t=_(a,"CANVAS",{class:!0}),f(t).forEach(c),this.h()},h(){d(t,"class","svelte-6skjon")},m(a,e){v(a,t,e),n[1](t)},p:i,i,o:i,d(a){a&&c(t),n[1](null)}}}function w(n,t,a){let e;b(async()=>{const s=k(e),o=y();s.scene.add(o),s.camera.position.set(2,2,2),s.camera.lookAt(o.position),s.setAnimationLoop(l=>{o.rotation.x+=l})});function r(s){g[s?"unshift":"push"](()=>{e=s,a(0,e)})}return[e,r]}class x extends m{constructor(t){super(),p(this,t,w,A,h,{})}}export{x as default};
