import{S as e,i as t,s as r,a as n,e as a,c as o,b as s,g as l,t as i,d as c,f as u,h as p,j as d,o as f,k as h,l as m,m as g,n as _,p as v,q as y,r as w,u as b,v as $,w as E,x as k,y as R,z as j,A as O}from"./chunks/index-f58f646f.js";import{g as I,f as L,s as A,a as P,i as S}from"./chunks/singletons-22c2b913.js";import{_ as x}from"./chunks/preload-helper-aa6bc0ce.js";import{s as T}from"./chunks/paths-6cd3a76e.js";function D(e,t){return"/"===e||"ignore"===t?e:"never"===t?e.endsWith("/")?e.slice(0,-1):e:"always"!==t||e.endsWith("/")?e:e+"/"}function V(e){for(const t in e)e[t]=e[t].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return e}const U=["href","pathname","search","searchParams","toString","toJSON"];function N(e,t){const r=new URL(e);for(const n of U){let e=r[n];Object.defineProperty(r,n,{get:()=>(t(),e),enumerable:!0,configurable:!0})}return function(e){Object.defineProperty(e,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}(r),r}const B=window.fetch;window.fetch=(e,t)=>{if("GET"!==(e instanceof Request?e.method:(null==t?void 0:t.method)||"GET")){const t=new URL(e instanceof Request?e.url:e.toString(),document.baseURI).href;q.delete(t)}return B(e,t)};const q=new Map;function J(e,t,r){let n=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;(null==r?void 0:r.body)&&("string"==typeof r.body||ArrayBuffer.isView(r.body))&&(n+=`[data-hash="${function(e){let t=5381;if("string"==typeof e){let r=e.length;for(;r;)t=33*t^e.charCodeAt(--r)}else{if(!ArrayBuffer.isView(e))throw new TypeError("value must be a string or TypedArray");{const r=new Uint8Array(e.buffer,e.byteOffset,e.byteLength);let n=r.length;for(;n;)t=33*t^r[--n]}}return(t>>>0).toString(36)}(r.body)}"]`);const a=document.querySelector(n);if(null==a?void 0:a.textContent){const{body:e,...r}=JSON.parse(a.textContent),n=a.getAttribute("data-ttl");return n&&q.set(t,{body:e,init:r,ttl:1e3*Number(n)}),Promise.resolve(new Response(e,r))}return B(e,r)}const C=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function M(e){return!/^\([^)]+\)$/.test(e)}function F(e){let t,r,n;var o=e[0][0];function d(e){return{props:{data:e[2],form:e[1]}}}return o&&(t=$(o,d(e))),{c(){t&&E(t.$$.fragment),r=a()},l(e){t&&k(t.$$.fragment,e),r=a()},m(e,a){t&&R(t,e,a),s(e,r,a),n=!0},p(e,n){const a={};if(4&n&&(a.data=e[2]),2&n&&(a.form=e[1]),o!==(o=e[0][0])){if(t){l();const e=t;i(e.$$.fragment,1,0,(()=>{j(e,1)})),c()}o?(t=$(o,d(e)),E(t.$$.fragment),u(t.$$.fragment,1),R(t,r.parentNode,r)):t=null}else o&&t.$set(a)},i(e){n||(t&&u(t.$$.fragment,e),n=!0)},o(e){t&&i(t.$$.fragment,e),n=!1},d(e){e&&p(r),t&&j(t,e)}}}function G(e){let t,r,n;var o=e[0][0];function d(e){return{props:{data:e[2],$$slots:{default:[K]},$$scope:{ctx:e}}}}return o&&(t=$(o,d(e))),{c(){t&&E(t.$$.fragment),r=a()},l(e){t&&k(t.$$.fragment,e),r=a()},m(e,a){t&&R(t,e,a),s(e,r,a),n=!0},p(e,n){const a={};if(4&n&&(a.data=e[2]),523&n&&(a.$$scope={dirty:n,ctx:e}),o!==(o=e[0][0])){if(t){l();const e=t;i(e.$$.fragment,1,0,(()=>{j(e,1)})),c()}o?(t=$(o,d(e)),E(t.$$.fragment),u(t.$$.fragment,1),R(t,r.parentNode,r)):t=null}else o&&t.$set(a)},i(e){n||(t&&u(t.$$.fragment,e),n=!0)},o(e){t&&i(t.$$.fragment,e),n=!1},d(e){e&&p(r),t&&j(t,e)}}}function K(e){let t,r,n;var o=e[0][1];function d(e){return{props:{data:e[3],form:e[1]}}}return o&&(t=$(o,d(e))),{c(){t&&E(t.$$.fragment),r=a()},l(e){t&&k(t.$$.fragment,e),r=a()},m(e,a){t&&R(t,e,a),s(e,r,a),n=!0},p(e,n){const a={};if(8&n&&(a.data=e[3]),2&n&&(a.form=e[1]),o!==(o=e[0][1])){if(t){l();const e=t;i(e.$$.fragment,1,0,(()=>{j(e,1)})),c()}o?(t=$(o,d(e)),E(t.$$.fragment),u(t.$$.fragment,1),R(t,r.parentNode,r)):t=null}else o&&t.$set(a)},i(e){n||(t&&u(t.$$.fragment,e),n=!0)},o(e){t&&i(t.$$.fragment,e),n=!1},d(e){e&&p(r),t&&j(t,e)}}}function W(e){let t,r=e[5]&&z(e);return{c(){t=h("div"),r&&r.c(),this.h()},l(e){t=m(e,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var n=g(t);r&&r.l(n),n.forEach(p),this.h()},h(){_(t,"id","svelte-announcer"),_(t,"aria-live","assertive"),_(t,"aria-atomic","true"),v(t,"position","absolute"),v(t,"left","0"),v(t,"top","0"),v(t,"clip","rect(0 0 0 0)"),v(t,"clip-path","inset(50%)"),v(t,"overflow","hidden"),v(t,"white-space","nowrap"),v(t,"width","1px"),v(t,"height","1px")},m(e,n){s(e,t,n),r&&r.m(t,null)},p(e,n){e[5]?r?r.p(e,n):(r=z(e),r.c(),r.m(t,null)):r&&(r.d(1),r=null)},d(e){e&&p(t),r&&r.d()}}}function z(e){let t;return{c(){t=y(e[6])},l(r){t=w(r,e[6])},m(e,r){s(e,t,r)},p(e,r){64&r&&b(t,e[6])},d(e){e&&p(t)}}}function H(e){let t,r,d,f,h;const m=[G,F],g=[];function _(e,t){return e[0][1]?0:1}t=_(e),r=g[t]=m[t](e);let v=e[4]&&W(e);return{c(){r.c(),d=n(),v&&v.c(),f=a()},l(e){r.l(e),d=o(e),v&&v.l(e),f=a()},m(e,r){g[t].m(e,r),s(e,d,r),v&&v.m(e,r),s(e,f,r),h=!0},p(e,[n]){let a=t;t=_(e),t===a?g[t].p(e,n):(l(),i(g[a],1,1,(()=>{g[a]=null})),c(),r=g[t],r?r.p(e,n):(r=g[t]=m[t](e),r.c()),u(r,1),r.m(d.parentNode,d)),e[4]?v?v.p(e,n):(v=W(e),v.c(),v.m(f.parentNode,f)):v&&(v.d(1),v=null)},i(e){h||(u(r),h=!0)},o(e){i(r),h=!1},d(e){g[t].d(e),e&&p(d),v&&v.d(e),e&&p(f)}}}function Q(e,t,r){let{stores:n}=t,{page:a}=t,{components:o}=t,{form:s}=t,{data_0:l=null}=t,{data_1:i=null}=t;d(n.page.notify);let c=!1,u=!1,p=null;return f((()=>{const e=n.page.subscribe((()=>{c&&(r(5,u=!0),r(6,p=document.title||"untitled page"))}));return r(4,c=!0),e})),e.$$set=e=>{"stores"in e&&r(7,n=e.stores),"page"in e&&r(8,a=e.page),"components"in e&&r(0,o=e.components),"form"in e&&r(1,s=e.form),"data_0"in e&&r(2,l=e.data_0),"data_1"in e&&r(3,i=e.data_1)},e.$$.update=()=>{384&e.$$.dirty&&n.page.set(a)},[o,s,l,i,c,u,p,n,a]}class X extends e{constructor(e){super(),t(this,e,Q,H,r,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Y=[()=>x((()=>import("./chunks/0-8914cc63.js")),["chunks/0-8914cc63.js","chunks/_layout-824bfd53.js","components/pages/_layout.svelte-4a966568.js","assets/_layout-187ee799.css","chunks/preload-helper-aa6bc0ce.js","chunks/index-f58f646f.js","chunks/debug-db1384ce.js","chunks/index-73028485.js","chunks/paths-6cd3a76e.js"],import.meta.url),()=>x((()=>import("./chunks/1-17b3338a.js")),["chunks/1-17b3338a.js","components/error.svelte-999ba026.js","chunks/index-f58f646f.js","chunks/singletons-22c2b913.js","chunks/paths-6cd3a76e.js"],import.meta.url),()=>x((()=>import("./chunks/2-a321c1f8.js")),["chunks/2-a321c1f8.js","components/pages/_page.svelte-9c0cf7e6.js","chunks/index-f58f646f.js","components/pages/portal/_page.svelte-d244d9fe.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/3-26d9e950.js")),["chunks/3-26d9e950.js","components/pages/alley/_page.svelte-60fb72f8.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/4-5297bc39.js")),["chunks/4-5297bc39.js","components/pages/baked/_page.svelte-b6556788.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/5-f747fd9b.js")),["chunks/5-f747fd9b.js","components/pages/campfire/_page.svelte-725dc03b.js","chunks/index-f58f646f.js","chunks/index-73028485.js","chunks/util-343fee83.js","chunks/util-three-e74c98be.js"],import.meta.url),()=>x((()=>import("./chunks/6-0c594997.js")),["chunks/6-0c594997.js","components/pages/galaxy/_page.svelte-1e0183a8.js","chunks/index-f58f646f.js","chunks/debug-db1384ce.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/7-21b6b4cb.js")),["chunks/7-21b6b4cb.js","components/pages/instanced/_page.svelte-eb28b91c.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/8-8be177b6.js")),["chunks/8-8be177b6.js","components/pages/matrix/_page.svelte-a0d544b3.js","chunks/index-f58f646f.js","chunks/index-73028485.js","chunks/constants-7ff5b34c.js","chunks/util-three-e74c98be.js"],import.meta.url),()=>x((()=>import("./chunks/9-4e0582c5.js")),["chunks/9-4e0582c5.js","components/pages/model/_page.svelte-1461a4a4.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/10-570f5109.js")),["chunks/10-570f5109.js","components/pages/particles/_page.svelte-3cdbae64.js","chunks/index-f58f646f.js","chunks/index-73028485.js","chunks/util-three-e74c98be.js"],import.meta.url),()=>x((()=>import("./chunks/11-21167d64.js")),["chunks/11-21167d64.js","components/pages/planets/_page.svelte-76cb5130.js","chunks/index-f58f646f.js","chunks/index-73028485.js","chunks/constants-7ff5b34c.js"],import.meta.url),()=>x((()=>import("./chunks/12-259c9010.js")),["chunks/12-259c9010.js","components/pages/portal/_page.svelte-d244d9fe.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/13-42ee3116.js")),["chunks/13-42ee3116.js","components/pages/raycaster/_page.svelte-c8f7fb4f.js","chunks/index-f58f646f.js","chunks/index-73028485.js","chunks/util-three-e74c98be.js"],import.meta.url),()=>x((()=>import("./chunks/14-c1e09e31.js")),["chunks/14-c1e09e31.js","components/pages/room/_page.svelte-717e8f4f.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/15-8cf370f7.js")),["chunks/15-8cf370f7.js","components/pages/sea/_page.svelte-67a5318d.js","chunks/index-f58f646f.js","chunks/index-73028485.js","chunks/debug-db1384ce.js"],import.meta.url),()=>x((()=>import("./chunks/16-e8616464.js")),["chunks/16-e8616464.js","components/pages/shader/_page.svelte-a6c6e1d5.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/17-9e85cc8b.js")),["chunks/17-9e85cc8b.js","components/pages/shader-patterns/_page.svelte-a31728f9.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url),()=>x((()=>import("./chunks/18-539e5a5e.js")),["chunks/18-539e5a5e.js","components/pages/sphere-particles/_page.svelte-a2c4f38b.js","chunks/index-f58f646f.js","chunks/index-73028485.js","chunks/util-343fee83.js","chunks/debug-db1384ce.js"],import.meta.url),()=>x((()=>import("./chunks/19-23cd136d.js")),["chunks/19-23cd136d.js","components/pages/sushi/_page.svelte-f3779711.js","chunks/index-f58f646f.js"],import.meta.url),()=>x((()=>import("./chunks/20-26de054c.js")),["chunks/20-26de054c.js","components/pages/terrain/_page.svelte-99419741.js","chunks/index-f58f646f.js","chunks/index-73028485.js"],import.meta.url)],Z=({error:e})=>{console.error(e)};class ee{constructor(e,t){this.status=e,this.body="string"==typeof t?{message:t}:t||{message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class te{constructor(e,t){this.status=e,this.location=t}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0"),Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const re="sveltekit:index",ne=function(e,t,r,n){const a=new Set(t);return Object.entries(r).map((([t,[r,a,l]])=>{const{pattern:i,names:c,types:u}=function(e){const t=[],r=[];let n=!0;return{pattern:"/"===e?/^\/$/:new RegExp(`^${e.split(/(?:\/|$)/).slice(1).filter(M).map(((e,a,o)=>{const s=decodeURIComponent(e),l=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(s);if(l)return t.push(l[1]),r.push(l[2]),"(?:/(.*))?";const i=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(s);if(i)return t.push(i[1]),r.push(i[2]),"(?:/([^/]+))?";const c=a===o.length-1;return s?"/"+s.split(/\[(.+?)\](?!\])/).map(((e,a)=>{if(a%2){const n=C.exec(e);if(!n)throw new Error(`Invalid param: ${e}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,a,o,s,l]=n;return t.push(s),r.push(l),o?"(.*?)":a?"([^/]*)?":"([^/]+?)"}return c&&e.includes(".")&&(n=!1),e.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})).join(""):void 0})).join("")}${n?"/?":""}$`),names:t,types:r}}(t),p={id:t,exec:e=>{const t=i.exec(e);if(t)return function(e,t,r,n){const a={};for(let o=0;o<t.length;o+=1){const s=t[o],l=r[o];let i=e[o+1]||"";if(l){const e=n[l];if(!e)throw new Error(`Missing "${l}" param matcher`);if(!e(i))return}a[s]=i}return a}(t,c,u,n)},errors:[1,...l||[]].map((t=>e[t])),layouts:[0,...a||[]].map(s),leaf:o(r)};return p.errors.length=p.layouts.length=Math.max(p.errors.length,p.layouts.length),p}));function o(t){const r=t<0;return r&&(t=~t),[r,e[t]]}function s(t){return void 0===t?t:[a.has(t),e[t]]}}(Y,[],{"/":[2],"/alley":[3],"/baked":[4],"/campfire":[5],"/galaxy":[6],"/instanced":[7],"/matrix":[8],"/model":[9],"/particles":[10],"/planets":[11],"/portal":[12],"/raycaster":[13],"/room":[14],"/sea":[15],"/shader-patterns":[17],"/shader":[16],"/sphere-particles":[18],"/sushi":[19],"/terrain":[20]},{}),ae=Y[0],oe=Y[1];ae(),oe();let se={};try{se=JSON.parse(sessionStorage["sveltekit:scroll"])}catch{}function le(e){se[e]=P()}function ie({target:e,base:t,trailing_slash:r}){var n;const a=[];let o=null;const s={before_navigate:[],after_navigate:[]};let l,i={branch:[],error:null,url:null},c=!1,u=!1,p=!0,d=!1,h=!1,m=null==(n=history.state)?void 0:n[re];m||(m=Date.now(),history.replaceState({...history.state,[re]:m},"",location.href));const g=se[m];g&&(history.scrollRestoration="manual",scrollTo(g.x,g.y));let _,v,y,w=!1;async function b(){y=y||Promise.resolve(),await y,y=null;const e=new URL(location.href),t=F(e,!0);o=null,await k(t,e,[])}async function $(e,{noscroll:t=!1,replaceState:r=!1,keepfocus:n=!1,state:a={}},o,s){return"string"==typeof e&&(e=new URL(e,I(document))),K({url:e,scroll:t?P():null,keepfocus:n,redirect_chain:o,details:{state:a,replaceState:r},nav_token:s,accepted:()=>{},blocked:()=>{},type:"goto"})}async function E(e){const t=F(e,!1);if(!t)throw new Error(`Attempted to prefetch a URL that does not belong to this app: ${e}`);return o={id:t.id,promise:U(t)},o.promise}async function k(e,t,r,n,s={},c){var f,g;v=s;let y=e&&await U(e);if(y||(y=await W(t,null,ue(new Error(`Not found: ${t.pathname}`),{url:t,params:{},routeId:null}),404)),t=(null==e?void 0:e.url)||t,v!==s)return!1;if("redirect"===y.type){if(!(r.length>10||r.includes(t.pathname)))return $(new URL(y.location,t).href,{},[...r,t.pathname],s),!1;y=await M({status:500,error:ue(new Error("Redirect loop"),{url:t,params:{},routeId:null}),url:t,routeId:null})}else if((null==(g=null==(f=y.props)?void 0:f.page)?void 0:g.status)>=400){await A.updated.check()&&await z(t)}if(a.length=0,h=!1,d=!0,n&&n.details){const{details:e}=n,r=e.replaceState?0:1;e.state[re]=m+=r,history[e.replaceState?"replaceState":"pushState"](e.state,"",t)}if(o=null,u){i=y.state,y.props.page&&(y.props.page.url=t);const e=()=>{};l.$set(y.props),e()}else R(y);if(n){const{scroll:e,keepfocus:r}=n;if(!r){const e=document.body,t=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout((()=>{var e;null==(e=getSelection())||e.removeAllRanges()})),null!==t?e.setAttribute("tabindex",t):e.removeAttribute("tabindex")}if(await O(),p){const r=t.hash&&document.getElementById(t.hash.slice(1));e?scrollTo(e.x,e.y):r?r.scrollIntoView():scrollTo(0,0)}}else await O();p=!0,y.props.page&&(_=y.props.page),c&&c(),d=!1}function R(t){var r,n;i=t.state;const a=document.querySelector("style[data-sveltekit]");a&&a.remove(),_=t.props.page;const o=()=>{};l=new X({target:e,props:{...t.props,stores:A},hydrate:!0}),o();const c={from:null,to:de("to",{params:i.params,routeId:null!=(n=null==(r=i.route)?void 0:r.id)?n:null,url:new URL(location.href)}),type:"load"};s.after_navigate.forEach((e=>e(c))),u=!0}async function j({url:e,params:t,branch:r,status:n,error:a,route:o,form:s}){var l;const c=r.filter(Boolean),u={type:"loaded",state:{url:e,params:t,branch:r,error:a,route:o},props:{components:c.map((e=>e.node.component))}};void 0!==s&&(u.props.form=s);let p={},d=!_;for(let f=0;f<c.length;f+=1){const e=c[f];p={...p,...e.data},!d&&i.branch.some((t=>t===e))||(u.props[`data_${f}`]=p,d=d||Object.keys(null!=(l=e.data)?l:{}).length>0)}d||(d=Object.keys(_.data).length!==Object.keys(p).length);if(!i.url||e.href!==i.url.href||i.error!==a||void 0!==s||d){u.props.page={error:a,params:t,routeId:o&&o.id,status:n,url:e,form:s,data:d?p:_.data};const r=(e,t)=>{Object.defineProperty(u.props.page,e,{get:()=>{throw new Error(`$page.${e} has been replaced by $page.url.${t}`)}})};r("origin","origin"),r("path","pathname"),r("query","searchParams")}return u}async function S({loader:e,parent:t,url:r,params:n,routeId:a,server_data_node:o}){var s,l,i,c,p;let d=null;const f={dependencies:new Set,params:new Set,parent:!1,url:!1},h=await e();if(null==(s=h.shared)?void 0:s.load){let e=function(...e){for(const t of e){const{href:e}=new URL(t,r);f.dependencies.add(e)}};const s={routeId:a,params:new Proxy(n,{get:(e,t)=>(f.params.add(t),e[t])}),data:null!=(l=null==o?void 0:o.data)?l:null,url:N(r,(()=>{f.url=!0})),async fetch(t,n){let a;t instanceof Request?(a=t.url,n={body:"GET"===t.method||"HEAD"===t.method?void 0:await t.blob(),cache:t.cache,credentials:t.credentials,headers:t.headers,integrity:t.integrity,keepalive:t.keepalive,method:t.method,mode:t.mode,redirect:t.redirect,referrer:t.referrer,referrerPolicy:t.referrerPolicy,signal:t.signal,...n}):a=t;const o=new URL(a,r).href;return e(o),u?function(e,t){const r=q.get(e);if(r){if(performance.now()<r.ttl)return new Response(r.body,r.init);q.delete(e)}return B(e,t)}(o,n):J(a,o,n)},setHeaders:()=>{},depends:e,parent:()=>(f.parent=!0,t())};Object.defineProperties(s,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),d=null!=(i=await h.shared.load.call(null,s))?i:null,d=d?await async function(e){var t;for(const r in e)if("function"==typeof(null==(t=e[r])?void 0:t.then))return Object.fromEntries(await Promise.all(Object.entries(e).map((async([e,t])=>[e,await t]))));return e}(d):null}return{node:h,loader:e,server:o,shared:(null==(c=h.shared)?void 0:c.load)?{type:"data",data:d,uses:f}:null,data:null!=(p=null!=d?d:null==o?void 0:o.data)?p:null}}function x(e,t,r,n){if(h)return!0;if(!r)return!1;if(r.parent&&t)return!0;if(r.url&&e)return!0;for(const a of r.params)if(n[a]!==i.params[a])return!0;for(const o of r.dependencies)if(a.some((e=>e(new URL(o)))))return!0;return!1}function T(e,t){var r,n;return"data"===(null==e?void 0:e.type)?{type:"data",data:e.data,uses:{dependencies:new Set(null!=(r=e.uses.dependencies)?r:[]),params:new Set(null!=(n=e.uses.params)?n:[]),parent:!!e.uses.parent,url:!!e.uses.url}}:"skip"===(null==e?void 0:e.type)&&null!=t?t:null}async function U({id:e,invalidating:t,url:r,params:n,route:a}){var s;if((null==o?void 0:o.id)===e)return o.promise;const{errors:l,layouts:c,leaf:u}=a,p=[...c,u];l.forEach((e=>null==e?void 0:e().catch((()=>{})))),p.forEach((e=>null==e?void 0:e[1]().catch((()=>{}))));let d=null;const f=!!i.url&&e!==i.url.pathname+i.url.search,h=p.reduce(((e,t,r)=>{var a;const o=i.branch[r],s=!!(null==t?void 0:t[0])&&((null==o?void 0:o.loader)!==t[1]||x(f,e.some(Boolean),null==(a=o.server)?void 0:a.uses,n));return e.push(s),e}),[]);if(h.some(Boolean)){try{d=await ce(r,h)}catch(y){return M({status:500,error:ue(y,{url:r,params:n,routeId:a.id}),url:r,routeId:a.id})}if("redirect"===d.type)return d}const m=null==d?void 0:d.nodes;let g=!1;const _=p.map((async(e,t)=>{var o;if(!e)return;const s=i.branch[t],l=null==m?void 0:m[t];if(!(l&&"skip"!==l.type||e[1]!==(null==s?void 0:s.loader)||x(f,g,null==(o=s.shared)?void 0:o.uses,n)))return s;if(g=!0,"error"===(null==l?void 0:l.type))throw l;return S({loader:e[1],url:r,params:n,routeId:a.id,parent:async()=>{var e;const r={};for(let n=0;n<t;n+=1)Object.assign(r,null==(e=await _[n])?void 0:e.data);return r},server_data_node:T(void 0===l&&e[0]?{type:"skip"}:null!=l?l:null,null==s?void 0:s.server)})}));for(const o of _)o.catch((()=>{}));const v=[];for(let o=0;o<p.length;o+=1)if(p[o])try{v.push(await _[o])}catch(w){if(w instanceof te)return{type:"redirect",location:w.location};let e,t=500;(null==m?void 0:m.includes(w))?(t=null!=(s=w.status)?s:t,e=w.error):w instanceof ee?(t=w.status,e=w.body):e=ue(w,{params:n,url:r,routeId:a.id});const i=await C(o,v,l);return i?await j({url:r,params:n,branch:v.slice(0,i.idx).concat(i.node),status:t,error:e,route:a}):await W(r,a.id,e,t)}else v.push(void 0);return await j({url:r,params:n,branch:v,status:200,error:null,route:a,form:t?void 0:null})}async function C(e,t,r){for(;e--;)if(r[e]){let a=e;for(;!t[a];)a-=1;try{return{idx:a+1,node:{node:await r[e](),loader:r[e],data:{},server:null,shared:null}}}catch(n){continue}}}async function M({status:e,error:t,url:r,routeId:n}){var a;const o={};let s=null;if((await ae()).server)try{const e=await ce(r,[!0]);if("data"!==e.type||e.nodes[0]&&"data"!==e.nodes[0].type)throw 0;s=null!=(a=e.nodes[0])?a:null}catch{(r.origin!==location.origin||r.pathname!==location.pathname||c)&&await z(r)}const l=await S({loader:ae,url:r,params:o,routeId:n,parent:()=>Promise.resolve({}),server_data_node:T(s)}),i={node:await oe(),loader:oe,shared:null,server:null,data:null};return await j({url:r,params:o,branch:[l,i],status:e,error:t,route:null})}function F(e,n){if(G(e))return;const a=decodeURI(e.pathname.slice(t.length)||"/");for(const t of ne){const o=t.exec(a);if(o){const a=new URL(e.origin+D(e.pathname,r)+e.search+e.hash);return{id:a.pathname+a.search,invalidating:n,route:t,params:V(o),url:a}}}}function G(e){return e.origin!==location.origin||!e.pathname.startsWith(t)}async function K({url:e,scroll:t,keepfocus:r,redirect_chain:n,details:a,type:o,delta:l,nav_token:c,accepted:p,blocked:d}){var f,h,g,_;let v=!1;const y=F(e,!1),w={from:de("from",{params:i.params,routeId:null!=(h=null==(f=i.route)?void 0:f.id)?h:null,url:i.url}),to:de("to",{params:null!=(g=null==y?void 0:y.params)?g:null,routeId:null!=(_=null==y?void 0:y.route.id)?_:null,url:e}),type:o};void 0!==l&&(w.delta=l);const b={...w,cancel:()=>{v=!0}};s.before_navigate.forEach((e=>e(b))),v?d():(le(m),p(),u&&A.navigating.set(w),await k(y,e,n,{scroll:t,keepfocus:r,details:a},c,(()=>{s.after_navigate.forEach((e=>e(w))),A.navigating.set(null)})))}async function W(e,t,r,n){return e.origin!==location.origin||e.pathname!==location.pathname||c?await z(e):await M({status:n,error:r,url:e,routeId:t})}function z(e){return location.href=e.href,new Promise((()=>{}))}return{after_navigate:e=>{f((()=>(s.after_navigate.push(e),()=>{const t=s.after_navigate.indexOf(e);s.after_navigate.splice(t,1)})))},before_navigate:e=>{f((()=>(s.before_navigate.push(e),()=>{const t=s.before_navigate.indexOf(e);s.before_navigate.splice(t,1)})))},disable_scroll_handling:()=>{!d&&u||(p=!1)},goto:(e,t={})=>$(e,t,[]),invalidate:e=>{if(void 0===e)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if("function"==typeof e)a.push(e);else{const{href:t}=new URL(e,location.href);a.push((e=>e.href===t))}return b()},invalidateAll:()=>(h=!0,b()),prefetch:async e=>{const t=new URL(e,I(document));await E(t)},prefetch_routes:async e=>{const t=(e?ne.filter((t=>e.some((e=>t.exec(e))))):ne).map((e=>Promise.all([...e.layouts,e.leaf].map((e=>null==e?void 0:e[1]())))));await Promise.all(t)},apply_action:async e=>{if("error"===e.type){const t=new URL(location.href),{branch:r,route:n}=i;if(!n)return;const a=await C(i.branch.length,r,n.errors);if(a){const o=await j({url:t,params:i.params,branch:r.slice(0,a.idx).concat(a.node),status:500,error:e.error,route:n});i=o.state;const s=()=>{};l.$set(o.props),s()}}else if("redirect"===e.type)$(e.location,{},[]);else{const t={form:e.data,page:{..._,form:e.data,status:e.status}},r=()=>{};l.$set(t),r()}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",(e=>{var t,r;let n=!1;const a={from:de("from",{params:i.params,routeId:null!=(r=null==(t=i.route)?void 0:t.id)?r:null,url:i.url}),to:null,type:"unload",cancel:()=>n=!0};s.before_navigate.forEach((e=>e(a))),n?(e.preventDefault(),e.returnValue=""):history.scrollRestoration="auto"})),addEventListener("visibilitychange",(()=>{if("hidden"===document.visibilityState){le(m);try{sessionStorage["sveltekit:scroll"]=JSON.stringify(se)}catch{}}}));const e=e=>{const{url:t,options:r}=L(e);if(t&&r.prefetch){if(G(t))return;E(t)}};let t;addEventListener("touchstart",e),addEventListener("mousemove",(e=>{clearTimeout(t),t=setTimeout((()=>{var t;null==(t=e.target)||t.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))}),20)})),addEventListener("sveltekit:trigger_prefetch",e),addEventListener("click",(e=>{if(e.button||1!==e.which)return;if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;if(e.defaultPrevented)return;const{a:t,url:r,options:n}=L(e);if(!t||!r)return;const a=t instanceof SVGAElement;if(!a&&r.protocol!==location.protocol&&"https:"!==r.protocol&&"http:"!==r.protocol)return;const o=(t.getAttribute("rel")||"").split(/\s+/);if(t.hasAttribute("download")||o.includes("external")||n.reload)return;if(a?t.target.baseVal:t.target)return;const[s,l]=r.href.split("#");if(void 0!==l&&s===location.href.split("#")[0])return w=!0,le(m),i.url=r,A.page.set({..._,url:r}),void A.page.notify();K({url:r,scroll:n.noscroll?P():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:r.href===location.href},accepted:()=>e.preventDefault(),blocked:()=>e.preventDefault(),type:"link"})})),addEventListener("popstate",(e=>{if(e.state){if(e.state[re]===m)return;const t=e.state[re]-m;K({url:new URL(location.href),scroll:se[e.state[re]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{m=e.state[re]},blocked:()=>{history.go(-t)},type:"popstate",delta:t})}})),addEventListener("hashchange",(()=>{w&&(w=!1,history.replaceState({...history.state,[re]:++m},"",location.href))}));for(const r of document.querySelectorAll("link"))"icon"===r.rel&&(r.href=r.href);addEventListener("pageshow",(e=>{e.persisted&&A.navigating.set(null)}))},_hydrate:async({status:e,error:t,node_ids:r,params:n,routeId:a,data:o,form:s})=>{var l;c=!0;const i=new URL(location.href);let u;try{const c=r.map((async(e,t)=>{const r=o[t];return S({loader:Y[e],url:i,params:n,routeId:a,parent:async()=>{const e={};for(let r=0;r<t;r+=1)Object.assign(e,(await c[r]).data);return e},server_data_node:T(r)})}));u=await j({url:i,params:n,branch:await Promise.all(c),status:e,error:t,form:s,route:null!=(l=ne.find((e=>e.id===a)))?l:null})}catch(p){if(p instanceof te)return void(await z(new URL(p.location,location.href)));u=await M({status:p instanceof ee?p.status:500,error:ue(p,{url:i,params:n,routeId:a}),url:i,routeId:a})}R(u)}}}async function ce(e,t){const r=new URL(e);r.pathname=e.pathname.replace(/\/$/,"")+"/__data.json";const n=await B(r.href,{headers:{"x-sveltekit-invalidated":t.map((e=>e?"1":"")).join(",")}}),a=await n.text();if(!n.ok)throw new Error(JSON.parse(a));return function(e){const t=JSON.parse(e);if("number"==typeof t)return a(t);const r=t,n=Array(r.length);function a(e){if(-1===e)return;if(-3===e)return NaN;if(-4===e)return 1/0;if(-5===e)return-1/0;if(-6===e)return-0;if(e in n)return n[e];const t=r[e];if(t&&"object"==typeof t)if(Array.isArray(t))if("string"==typeof t[0])switch(t[0]){case"Date":n[e]=new Date(t[1]);break;case"Set":const r=new Set;n[e]=r;for(let e=1;e<t.length;e+=1)r.add(a(t[e]));break;case"Map":const o=new Map;n[e]=o;for(let e=1;e<t.length;e+=2)o.set(a(t[e]),a(t[e+1]));break;case"RegExp":n[e]=new RegExp(t[1],t[2]);break;case"Object":n[e]=Object(t[1]);break;case"BigInt":n[e]=BigInt(t[1]);break;case"null":const s=Object.create(null);n[e]=s;for(let e=1;e<t.length;e+=2)s[t[e]]=a(t[e+1])}else{const r=new Array(t.length);n[e]=r;for(let e=0;e<t.length;e+=1){const n=t[e];-2!==n&&(r[e]=a(n))}}else{const r={};n[e]=r;for(const e in t){const n=t[e];r[e]=a(n)}}else n[e]=t;return n[e]}return a(0)}(a)}function ue(e,t){var r;return e instanceof ee?e.body:null!=(r=Z({error:e,event:t}))?r:{message:null!=t.routeId?"Internal Error":"Not Found"}}const pe=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function de(e,t){for(const r of pe)Object.defineProperty(t,r,{get(){throw new Error(`The navigation shape changed - ${e}.${r} should now be ${e}.url.${r}`)},enumerable:!1});return t}async function fe({env:e,hydrate:t,paths:r,target:n,trailing_slash:a}){T(r);const o=ie({target:n,base:r.base,trailing_slash:a});S({client:o}),t?await o._hydrate(t):o.goto(location.href,{replaceState:!0}),o._start_router()}export{fe as start};
