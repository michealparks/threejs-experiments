import{_ as s}from"../chunks/preload-helper-9f12a5fd.js";import{S as e,i as t,s as a,e as l,t as r,k as n,c as o,a as c,g as i,d as _,n as f,b as p,f as h,D as m,h as d,E as u,F as k,G as v,H as $,j as E,m as j,o as g,I as b,v as A,r as I,w as L}from"../chunks/vendor-0a856f48.js";import{b as O}from"../chunks/paths-45dac81d.js";import{c as D}from"../chunks/util-732f9037.js";function V(s,e,t){const a=s.slice();return a[1]=e[t],a}function P(s,e){let t,a,u,k,v,$=D(e[1].slice(8,-7))+"";return{key:s,first:null,c(){t=l("li"),a=l("a"),u=r($),v=n(),this.h()},l(s){t=o(s,"LI",{});var e=c(t);a=o(e,"A",{href:!0});var l=c(a);u=i(l,$),l.forEach(_),v=f(e),e.forEach(_),this.h()},h(){p(a,"href",k=`${O}${e[1].slice(1,-7)}`),this.first=t},m(s,e){h(s,t,e),m(t,a),m(a,u),m(t,v)},p(s,t){e=s,1&t&&$!==($=D(e[1].slice(8,-7))+"")&&d(u,$),1&t&&k!==(k=`${O}${e[1].slice(1,-7)}`)&&p(a,"href",k)},d(s){s&&_(t)}}}function R(s){let e,t,a=[],r=new Map,n=Object.keys(s[0]);const i=s=>s[1];for(let l=0;l<n.length;l+=1){let e=V(s,n,l),t=i(e);r.set(t,a[l]=P(t,e))}return{c(){e=l("nav"),t=l("ul");for(let s=0;s<a.length;s+=1)a[s].c();this.h()},l(s){e=o(s,"NAV",{class:!0});var l=c(e);t=o(l,"UL",{class:!0});var r=c(t);for(let e=0;e<a.length;e+=1)a[e].l(r);r.forEach(_),l.forEach(_),this.h()},h(){p(t,"class","svelte-1we57ze"),p(e,"class","svelte-1we57ze")},m(s,l){h(s,e,l),m(e,t);for(let e=0;e<a.length;e+=1)a[e].m(t,null)},p(s,[e]){1&e&&(n=Object.keys(s[0]),a=u(a,e,i,1,s,n,r,t,v,P,null,V))},i:k,o:k,d(s){s&&_(e);for(let e=0;e<a.length;e+=1)a[e].d()}}}function T(s,e,t){let{pages:a=[]}=e;return s.$$set=s=>{"pages"in s&&t(0,a=s.pages)},[a]}class w extends e{constructor(s){super(),t(this,s,T,R,a,{pages:0})}}function x(s){let e,t,a;e=new w({props:{pages:s[0]}});const l=s[2].default,r=$(l,s,s[1],null);return{c(){E(e.$$.fragment),t=n(),r&&r.c()},l(s){j(e.$$.fragment,s),t=f(s),r&&r.l(s)},m(s,l){g(e,s,l),h(s,t,l),r&&r.m(s,l),a=!0},p(s,[e]){r&&r.p&&(!a||2&e)&&b(r,l,s,s[1],a?e:-1,null,null)},i(s){a||(A(e.$$.fragment,s),A(r,s),a=!0)},o(s){I(e.$$.fragment,s),I(r,s),a=!1},d(s){L(e,s),s&&_(t),r&&r.d(s)}}}function y(e,t,a){let{$$slots:l={},$$scope:r}=t;const n={"./tasks/alley.svelte":()=>s((()=>import("./tasks/alley.svelte-a87dcc37.js")),["/threejs-experiments/_app/pages/tasks/alley.svelte-a87dcc37.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/assets-a914e6b7.js","/threejs-experiments/_app/chunks/paths-45dac81d.js","/threejs-experiments/_app/chunks/orbitControls-a26a318e.js"]),"./tasks/baked.svelte":()=>s((()=>import("./tasks/baked.svelte-ffd8e976.js")),["/threejs-experiments/_app/pages/tasks/baked.svelte-ffd8e976.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/assets-a914e6b7.js","/threejs-experiments/_app/chunks/paths-45dac81d.js","/threejs-experiments/_app/chunks/orbitControls-a26a318e.js"]),"./tasks/campfire.svelte":()=>s((()=>import("./tasks/campfire.svelte-555d4200.js")),["/threejs-experiments/_app/pages/tasks/campfire.svelte-555d4200.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/assets-a914e6b7.js","/threejs-experiments/_app/chunks/paths-45dac81d.js","/threejs-experiments/_app/chunks/orbitControls-a26a318e.js","/threejs-experiments/_app/chunks/util-732f9037.js","/threejs-experiments/_app/chunks/util-three-d65fbfcb.js"]),"./tasks/instanced.svelte":()=>s((()=>import("./tasks/instanced.svelte-bd4b9894.js")),["/threejs-experiments/_app/pages/tasks/instanced.svelte-bd4b9894.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/assets-a914e6b7.js","/threejs-experiments/_app/chunks/paths-45dac81d.js","/threejs-experiments/_app/chunks/orbitControls-a26a318e.js"]),"./tasks/matrix.svelte":()=>s((()=>import("./tasks/matrix.svelte-3ddd0c6f.js")),["/threejs-experiments/_app/pages/tasks/matrix.svelte-3ddd0c6f.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/util-three-d65fbfcb.js"]),"./tasks/planets.svelte":()=>s((()=>import("./tasks/planets.svelte-bcdbae20.js")),["/threejs-experiments/_app/pages/tasks/planets.svelte-bcdbae20.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/util-three-d65fbfcb.js"]),"./tasks/room.svelte":()=>s((()=>import("./tasks/room.svelte-6b1457ff.js")),["/threejs-experiments/_app/pages/tasks/room.svelte-6b1457ff.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/assets-a914e6b7.js","/threejs-experiments/_app/chunks/paths-45dac81d.js","/threejs-experiments/_app/chunks/orbitControls-a26a318e.js","/threejs-experiments/_app/chunks/util-three-d65fbfcb.js"]),"./tasks/shader.svelte":()=>s((()=>import("./tasks/shader.svelte-2bd30624.js")),["/threejs-experiments/_app/pages/tasks/shader.svelte-2bd30624.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/assets-a914e6b7.js","/threejs-experiments/_app/chunks/paths-45dac81d.js","/threejs-experiments/_app/chunks/util-three-d65fbfcb.js"]),"./tasks/terrain.svelte":()=>s((()=>import("./tasks/terrain.svelte-a0b240a2.js")),["/threejs-experiments/_app/pages/tasks/terrain.svelte-a0b240a2.js","/threejs-experiments/_app/chunks/vendor-0a856f48.js","/threejs-experiments/_app/chunks/gl-03a07b41.js","/threejs-experiments/_app/chunks/assets-a914e6b7.js","/threejs-experiments/_app/chunks/paths-45dac81d.js","/threejs-experiments/_app/chunks/orbitControls-a26a318e.js"])};return e.$$set=s=>{"$$scope"in s&&a(1,r=s.$$scope)},[n,r,l]}export default class extends e{constructor(s){super(),t(this,s,y,x,a,{})}}
