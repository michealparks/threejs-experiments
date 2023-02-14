import{S as e,i as t,s as r,a as n,e as a,c as o,b as s,g as i,t as l,d as u,f as c,h as d,j as p,o as f,k as m,l as h,m as v,n as g,p as _,q as y,r as w,u as b,v as E,w as $,x as k,y as R,z as L,A,B as j}from"./chunks/index-a2938516.js";import{S,a as P,I as O,g as x,f as I,b as D,c as T,s as U,i as V,d as N,P as C,e as q,h as B}from"./chunks/singletons-2b37e9ba.js";import{_ as M}from"./chunks/preload-helper-706a0e5c.js";import{b as F,s as J}from"./chunks/paths-d46c718d.js";function G(e){for(const t in e)e[t]=decodeURIComponent(e[t]);return e}const H=["href","pathname","search","searchParams","toString","toJSON"];function K(e,t){const r=new URL(e);for(const n of H){let e=r[n];Object.defineProperty(r,n,{get:()=>(t(),e),enumerable:!0,configurable:!0})}return function(e){Object.defineProperty(e,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}(r),r}const z="/__data.json";function W(e){try{return JSON.parse(sessionStorage[e])}catch{}}function Q(e,t){const r=JSON.stringify(t);try{sessionStorage[e]=r}catch{}}const X=window.fetch;window.fetch=(e,t)=>("GET"!==(e instanceof Request?e.method:(null==t?void 0:t.method)||"GET")&&Y.delete(Z(e)),X(e,t));const Y=new Map;function Z(e,t){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if((null==t?void 0:t.headers)||(null==t?void 0:t.body)){const e=[];t.headers&&e.push([...new Headers(t.headers)].join(",")),t.body&&("string"==typeof t.body||ArrayBuffer.isView(t.body))&&e.push(t.body),r+=`[data-hash="${function(...e){let t=5381;for(const r of e)if("string"==typeof r){let e=r.length;for(;e;)t=33*t^r.charCodeAt(--e)}else{if(!ArrayBuffer.isView(r))throw new TypeError("value must be a string or TypedArray");{const e=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let n=e.length;for(;n;)t=33*t^e[--n]}}return(t>>>0).toString(36)}(...e)}"]`}return r}const ee=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function te(e){const t=[];var r;return{pattern:"/"===e?/^\/$/:new RegExp(`^${(r=e,r.slice(1).split("/").filter(re)).map((e=>{const r=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(e);if(r)return t.push({name:r[1],matcher:r[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const n=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(e);if(n)return t.push({name:n[1],matcher:n[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!e)return;const a=e.split(/\[(.+?)\](?!\])/);return"/"+a.map(((e,r)=>{if(r%2){if(e.startsWith("x+"))return ne(String.fromCharCode(parseInt(e.slice(2),16)));if(e.startsWith("u+"))return ne(String.fromCharCode(...e.slice(2).split("-").map((e=>parseInt(e,16)))));const n=ee.exec(e);if(!n)throw new Error(`Invalid param: ${e}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,o,s,i,l]=n;return t.push({name:i,matcher:l,optional:!!o,rest:!!s,chained:!!s&&(1===r&&""===a[0])}),s?"(.*?)":o?"([^/]*)?":"([^/]+?)"}return ne(e)})).join("")})).join("")}/?$`),params:t}}function re(e){return!/^\([^)]+\)$/.test(e)}function ne(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function ae(e){let t,r,n;var o=e[1][0];function p(e){return{props:{data:e[3],form:e[2]}}}return o&&(t=$(o,p(e)),e[12](t)),{c(){t&&k(t.$$.fragment),r=a()},l(e){t&&R(t.$$.fragment,e),r=a()},m(e,a){t&&L(t,e,a),s(e,r,a),n=!0},p(e,n){const a={};if(8&n&&(a.data=e[3]),4&n&&(a.form=e[2]),o!==(o=e[1][0])){if(t){i();const e=t;l(e.$$.fragment,1,0,(()=>{A(e,1)})),u()}o?(t=$(o,p(e)),e[12](t),k(t.$$.fragment),c(t.$$.fragment,1),L(t,r.parentNode,r)):t=null}else o&&t.$set(a)},i(e){n||(t&&c(t.$$.fragment,e),n=!0)},o(e){t&&l(t.$$.fragment,e),n=!1},d(n){e[12](null),n&&d(r),t&&A(t,n)}}}function oe(e){let t,r,n;var o=e[1][0];function p(e){return{props:{data:e[3],$$slots:{default:[se]},$$scope:{ctx:e}}}}return o&&(t=$(o,p(e)),e[11](t)),{c(){t&&k(t.$$.fragment),r=a()},l(e){t&&R(t.$$.fragment,e),r=a()},m(e,a){t&&L(t,e,a),s(e,r,a),n=!0},p(e,n){const a={};if(8&n&&(a.data=e[3]),8215&n&&(a.$$scope={dirty:n,ctx:e}),o!==(o=e[1][0])){if(t){i();const e=t;l(e.$$.fragment,1,0,(()=>{A(e,1)})),u()}o?(t=$(o,p(e)),e[11](t),k(t.$$.fragment),c(t.$$.fragment,1),L(t,r.parentNode,r)):t=null}else o&&t.$set(a)},i(e){n||(t&&c(t.$$.fragment,e),n=!0)},o(e){t&&l(t.$$.fragment,e),n=!1},d(n){e[11](null),n&&d(r),t&&A(t,n)}}}function se(e){let t,r,n;var o=e[1][1];function p(e){return{props:{data:e[4],form:e[2]}}}return o&&(t=$(o,p(e)),e[10](t)),{c(){t&&k(t.$$.fragment),r=a()},l(e){t&&R(t.$$.fragment,e),r=a()},m(e,a){t&&L(t,e,a),s(e,r,a),n=!0},p(e,n){const a={};if(16&n&&(a.data=e[4]),4&n&&(a.form=e[2]),o!==(o=e[1][1])){if(t){i();const e=t;l(e.$$.fragment,1,0,(()=>{A(e,1)})),u()}o?(t=$(o,p(e)),e[10](t),k(t.$$.fragment),c(t.$$.fragment,1),L(t,r.parentNode,r)):t=null}else o&&t.$set(a)},i(e){n||(t&&c(t.$$.fragment,e),n=!0)},o(e){t&&l(t.$$.fragment,e),n=!1},d(n){e[10](null),n&&d(r),t&&A(t,n)}}}function ie(e){let t,r=e[6]&&le(e);return{c(){t=m("div"),r&&r.c(),this.h()},l(e){t=h(e,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var n=v(t);r&&r.l(n),n.forEach(d),this.h()},h(){g(t,"id","svelte-announcer"),g(t,"aria-live","assertive"),g(t,"aria-atomic","true"),_(t,"position","absolute"),_(t,"left","0"),_(t,"top","0"),_(t,"clip","rect(0 0 0 0)"),_(t,"clip-path","inset(50%)"),_(t,"overflow","hidden"),_(t,"white-space","nowrap"),_(t,"width","1px"),_(t,"height","1px")},m(e,n){s(e,t,n),r&&r.m(t,null)},p(e,n){e[6]?r?r.p(e,n):(r=le(e),r.c(),r.m(t,null)):r&&(r.d(1),r=null)},d(e){e&&d(t),r&&r.d()}}}function le(e){let t;return{c(){t=y(e[7])},l(r){t=w(r,e[7])},m(e,r){s(e,t,r)},p(e,r){128&r&&b(t,e[7])},d(e){e&&d(t)}}}function ue(e){let t,r,p,f,m;const h=[oe,ae],v=[];function g(e,t){return e[1][1]?0:1}t=g(e),r=v[t]=h[t](e);let _=e[5]&&ie(e);return{c(){r.c(),p=n(),_&&_.c(),f=a()},l(e){r.l(e),p=o(e),_&&_.l(e),f=a()},m(e,r){v[t].m(e,r),s(e,p,r),_&&_.m(e,r),s(e,f,r),m=!0},p(e,[n]){let a=t;t=g(e),t===a?v[t].p(e,n):(i(),l(v[a],1,1,(()=>{v[a]=null})),u(),r=v[t],r?r.p(e,n):(r=v[t]=h[t](e),r.c()),c(r,1),r.m(p.parentNode,p)),e[5]?_?_.p(e,n):(_=ie(e),_.c(),_.m(f.parentNode,f)):_&&(_.d(1),_=null)},i(e){m||(c(r),m=!0)},o(e){l(r),m=!1},d(e){v[t].d(e),e&&d(p),_&&_.d(e),e&&d(f)}}}function ce(e,t,r){let{stores:n}=t,{page:a}=t,{constructors:o}=t,{components:s=[]}=t,{form:i}=t,{data_0:l=null}=t,{data_1:u=null}=t;p(n.page.notify);let c=!1,d=!1,m=null;return f((()=>{const e=n.page.subscribe((()=>{c&&(r(6,d=!0),r(7,m=document.title||"untitled page"))}));return r(5,c=!0),e})),e.$$set=e=>{"stores"in e&&r(8,n=e.stores),"page"in e&&r(9,a=e.page),"constructors"in e&&r(1,o=e.constructors),"components"in e&&r(0,s=e.components),"form"in e&&r(2,i=e.form),"data_0"in e&&r(3,l=e.data_0),"data_1"in e&&r(4,u=e.data_1)},e.$$.update=()=>{768&e.$$.dirty&&n.page.set(a)},[s,o,i,l,u,c,d,m,n,a,function(e){E[e?"unshift":"push"]((()=>{s[1]=e,r(0,s)}))},function(e){E[e?"unshift":"push"]((()=>{s[0]=e,r(0,s)}))},function(e){E[e?"unshift":"push"]((()=>{s[0]=e,r(0,s)}))}]}class de extends e{constructor(e){super(),t(this,e,ce,ue,r,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const pe=[()=>M((()=>import("./chunks/0-da446445.js")),["./chunks/0-da446445.js","./chunks/_layout-c2b46e4d.js","./components/pages/_layout.svelte-d048f9a7.js","./chunks/preload-helper-706a0e5c.js","./chunks/index-a2938516.js","./chunks/debug-5440ea37.js","./chunks/index-ba1d3bc3.js","./chunks/paths-d46c718d.js","./assets/_layout-187ee799.css"],import.meta.url),()=>M((()=>import("./chunks/1-e6f4bca7.js")),["./chunks/1-e6f4bca7.js","./components/error.svelte-9e264fff.js","./chunks/index-a2938516.js","./chunks/singletons-2b37e9ba.js","./chunks/paths-d46c718d.js"],import.meta.url),()=>M((()=>import("./chunks/2-54ecba32.js")),["./chunks/2-54ecba32.js","./components/pages/_page.svelte-1d6fa508.js","./chunks/index-a2938516.js","./components/pages/portal/_page.svelte-7fb5fc8b.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/3-60cecd23.js")),["./chunks/3-60cecd23.js","./components/pages/alley/_page.svelte-54ef9b1d.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/4-97effd32.js")),["./chunks/4-97effd32.js","./components/pages/baked/_page.svelte-20839547.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/5-9f4724d5.js")),["./chunks/5-9f4724d5.js","./components/pages/campfire/_page.svelte-8da09868.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js","./chunks/util-21cdfddc.js","./chunks/util-three-f7e5711f.js"],import.meta.url),()=>M((()=>import("./chunks/6-f964f7e7.js")),["./chunks/6-f964f7e7.js","./components/pages/galaxy/_page.svelte-02b60ac5.js","./chunks/index-a2938516.js","./chunks/debug-5440ea37.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/7-870fa9cb.js")),["./chunks/7-870fa9cb.js","./components/pages/geometry-nodes/_page.svelte-9a5dd269.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/8-b9272dbc.js")),["./chunks/8-b9272dbc.js","./components/pages/instanced/_page.svelte-fad3a957.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/9-313a3dfe.js")),["./chunks/9-313a3dfe.js","./components/pages/matrix/_page.svelte-aec6327b.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js","./chunks/constants-195d497c.js","./chunks/util-three-f7e5711f.js"],import.meta.url),()=>M((()=>import("./chunks/10-a6f4a9ca.js")),["./chunks/10-a6f4a9ca.js","./components/pages/model/_page.svelte-96edd796.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/11-a12dc805.js")),["./chunks/11-a12dc805.js","./components/pages/particles/_page.svelte-48b5acc3.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js","./chunks/util-three-f7e5711f.js"],import.meta.url),()=>M((()=>import("./chunks/12-b28bbb25.js")),["./chunks/12-b28bbb25.js","./components/pages/planets/_page.svelte-9db0f7ec.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js","./chunks/constants-195d497c.js"],import.meta.url),()=>M((()=>import("./chunks/13-a052c740.js")),["./chunks/13-a052c740.js","./components/pages/portal/_page.svelte-7fb5fc8b.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/14-98ee214c.js")),["./chunks/14-98ee214c.js","./components/pages/raycaster/_page.svelte-ff9c54a1.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js","./chunks/util-three-f7e5711f.js"],import.meta.url),()=>M((()=>import("./chunks/15-fee1a1d2.js")),["./chunks/15-fee1a1d2.js","./components/pages/room/_page.svelte-4333163e.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/16-40a29ac1.js")),["./chunks/16-40a29ac1.js","./components/pages/sea/_page.svelte-d0c05385.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js","./chunks/debug-5440ea37.js"],import.meta.url),()=>M((()=>import("./chunks/17-e469e860.js")),["./chunks/17-e469e860.js","./components/pages/shader/_page.svelte-887960ec.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/18-52552709.js")),["./chunks/18-52552709.js","./components/pages/shader-patterns/_page.svelte-62b6fd01.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url),()=>M((()=>import("./chunks/19-9e7ffe4d.js")),["./chunks/19-9e7ffe4d.js","./components/pages/sphere-particles/_page.svelte-df1841a3.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js","./chunks/util-21cdfddc.js","./chunks/debug-5440ea37.js"],import.meta.url),()=>M((()=>import("./chunks/20-7287b379.js")),["./chunks/20-7287b379.js","./components/pages/sushi/_page.svelte-92afde0e.js","./chunks/index-a2938516.js"],import.meta.url),()=>M((()=>import("./chunks/21-37f276fb.js")),["./chunks/21-37f276fb.js","./components/pages/terrain/_page.svelte-92ef23a5.js","./chunks/index-a2938516.js","./chunks/index-ba1d3bc3.js"],import.meta.url)],fe=[],me={handleError:({error:e})=>{console.error(e)}};let he=class{constructor(e,t){this.status=e,this.body="string"==typeof t?{message:t}:t||{message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}},ve=class{constructor(e,t){this.status=e,this.location=t}};Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const ge=-1,_e=-2,ye=-3,we=-4,be=-5,Ee=-6;const $e=function(e,t,r,n){const a=new Set(t);return Object.entries(r).map((([t,[r,a,i]])=>{const{pattern:l,params:u}=te(t),c={id:t,exec:e=>{const t=l.exec(e);if(t)return function(e,t,r){const n={},a=e.slice(1);let o=0;for(let s=0;s<t.length;s+=1){const e=t[s],i=a[s-o];if(e.chained&&e.rest&&o)n[e.name]=a.slice(s-o,s+1).filter((e=>e)).join("/"),o=0;else if(void 0!==i)if(e.matcher&&!r[e.matcher](i)){if(!e.optional||!e.chained)return;o++}else n[e.name]=i;else e.rest&&(n[e.name]="")}if(!o)return n}(t,u,n)},errors:[1,...i||[]].map((t=>e[t])),layouts:[0,...a||[]].map(s),leaf:o(r)};return c.errors.length=c.layouts.length=Math.max(c.errors.length,c.layouts.length),c}));function o(t){const r=t<0;return r&&(t=~t),[r,e[t]]}function s(t){return void 0===t?t:[a.has(t),e[t]]}}(pe,fe,{"/":[2],"/alley":[3],"/baked":[4],"/campfire":[5],"/galaxy":[6],"/geometry-nodes":[7],"/instanced":[8],"/matrix":[9],"/model":[10],"/particles":[11],"/planets":[12],"/portal":[13],"/raycaster":[14],"/room":[15],"/sea":[16],"/shader-patterns":[18],"/shader":[17],"/sphere-particles":[19],"/sushi":[20],"/terrain":[21]},{}),ke=pe[0],Re=pe[1];ke(),Re();const Le=W(S)??{},Ae=W(P)??{};function je(e){Le[e]=N()}function Se({target:e}){var t;const r=document.documentElement,n=[],a=[];let o=null;const s={before_navigate:[],after_navigate:[]};let i,l={branch:[],error:null,url:null},u=!1,c=!1,d=!0,p=!1,m=!1,h=!1,v=!1,g=null==(t=history.state)?void 0:t[O];g||(g=Date.now(),history.replaceState({...history.state,[O]:g},"",location.href));const _=Le[g];let y,w,b;async function E(){b=b||Promise.resolve(),await b,b=null;const e=new URL(location.href),t=re(e,!0);o=null,await q(t,e,[])}function $(e){a.some((e=>null==e?void 0:e.snapshot))&&(Ae[e]=a.map((e=>{var t;return null==(t=null==e?void 0:e.snapshot)?void 0:t.capture()})))}function k(e){var t;null==(t=Ae[e])||t.forEach(((e,t)=>{var r,n;null==(n=null==(r=a[t])?void 0:r.snapshot)||n.restore(e)}))}async function R(e,{noScroll:t=!1,replaceState:r=!1,keepFocus:n=!1,state:a={},invalidateAll:o=!1},s,i){return"string"==typeof e&&(e=new URL(e,x(document))),oe({url:e,scroll:t?N():null,keepfocus:n,redirect_chain:s,details:{state:a,replaceState:r},nav_token:i,accepted:()=>{o&&(v=!0)},blocked:()=>{},type:"goto"})}async function L(e){return o={id:e.id,promise:W(e).then((e=>("loaded"===e.type&&e.state.error&&(o=null),e)))},o.promise}async function A(...e){const t=$e.filter((t=>e.some((e=>t.exec(e))))).map((e=>Promise.all([...e.layouts,e.leaf].map((e=>null==e?void 0:e[1]())))));await Promise.all(t)}async function q(e,t,r,a,s,u={},f){var m,h,_;w=u;let b=e&&await W(e);if(b||(b=await se(t,{id:null},await Oe(new Error(`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)),t=(null==e?void 0:e.url)||t,w!==u)return!1;if("redirect"===b.type){if(!(r.length>10||r.includes(t.pathname)))return R(new URL(b.location,t).href,{},[...r,t.pathname],u),!1;b=await te({status:500,error:await Oe(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}})}else if((null==(m=b.props.page)?void 0:m.status)>=400){await U.updated.check()&&await ie(t)}if(n.length=0,v=!1,p=!0,a&&(je(a),$(a)),(null==(h=b.props.page)?void 0:h.url)&&b.props.page.url.pathname!==t.pathname&&(t.pathname=null==(_=b.props.page)?void 0:_.url.pathname),s&&s.details){const{details:e}=s,r=e.replaceState?0:1;if(e.state[O]=g+=r,history[e.replaceState?"replaceState":"pushState"](e.state,"",t),!e.replaceState){let e=g+1;for(;Ae[e]||Le[e];)delete Ae[e],delete Le[e],e+=1}}if(o=null,c?(l=b.state,b.props.page&&(b.props.page.url=t),i.$set(b.props)):B(b),s){const{scroll:e,keepfocus:r}=s,{activeElement:n}=document;await j();const a=document.activeElement!==n&&document.activeElement!==document.body;if(r||a||await xe(),d){const r=t.hash&&document.getElementById(decodeURIComponent(t.hash.slice(1)));e?scrollTo(e.x,e.y):r?r.scrollIntoView():scrollTo(0,0)}}else await j();d=!0,b.props.page&&(y=b.props.page),f&&f(),p=!1}function B(t){var r;l=t.state;const n=document.querySelector("style[data-sveltekit]");n&&n.remove(),y=t.props.page,i=new de({target:e,props:{...t.props,stores:U,components:a},hydrate:!0}),k(g);const o={from:null,to:{params:l.params,route:{id:(null==(r=l.route)?void 0:r.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};s.after_navigate.forEach((e=>e(o))),c=!0}async function M({url:e,params:t,branch:r,status:n,error:a,route:o,form:s}){let i="never";for(const l of r)void 0!==(null==l?void 0:l.slash)&&(i=l.slash);var u,c;e.pathname=(u=e.pathname,c=i,"/"===u||"ignore"===c?u:"never"===c?u.endsWith("/")?u.slice(0,-1):u:"always"!==c||u.endsWith("/")?u:u+"/"),e.search=e.search;const d={type:"loaded",state:{url:e,params:t,branch:r,error:a,route:o},props:{constructors:(p=r,p.filter((e=>null!=e))).map((e=>e.node.component))}};var p;void 0!==s&&(d.props.form=s);let f={},m=!y,h=0;for(let v=0;v<Math.max(r.length,l.branch.length);v+=1){const e=r[v],t=l.branch[v];(null==e?void 0:e.data)!==(null==t?void 0:t.data)&&(m=!0),e&&(f={...f,...e.data},m&&(d.props[`data_${h}`]=f),h+=1)}return(!l.url||e.href!==l.url.href||l.error!==a||void 0!==s&&s!==y.form||m)&&(d.props.page={error:a,params:t,route:{id:(null==o?void 0:o.id)??null},status:n,url:new URL(e),form:s??null,data:m?f:y.data}),d}async function J({loader:e,parent:t,url:r,params:n,route:a,server_data_node:o}){var s,i,l;let u=null;const d={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},p=await e();if(null==(s=p.universal)?void 0:s.load){let e=function(...e){for(const t of e){const{href:e}=new URL(t,r);d.dependencies.add(e)}};const s={route:{get id(){return d.route=!0,a.id}},params:new Proxy(n,{get:(e,t)=>(d.params.add(t),e[t])}),data:(null==o?void 0:o.data)??null,url:K(r,(()=>{d.url=!0})),async fetch(t,n){let a;t instanceof Request?(a=t.url,n={body:"GET"===t.method||"HEAD"===t.method?void 0:await t.blob(),cache:t.cache,credentials:t.credentials,headers:t.headers,integrity:t.integrity,keepalive:t.keepalive,method:t.method,mode:t.mode,redirect:t.redirect,referrer:t.referrer,referrerPolicy:t.referrerPolicy,signal:t.signal,...n}):a=t;const o=new URL(a,r);return e(o.href),o.origin===r.origin&&(a=o.href.slice(r.origin.length)),c?function(e,t,r){if(Y.size>0){const t=Z(e,r),n=Y.get(t);if(n){if(performance.now()<n.ttl&&["default","force-cache","only-if-cached",void 0].includes(null==r?void 0:r.cache))return new Response(n.body,n.init);Y.delete(t)}}return X(t,r)}(a,o.href,n):function(e,t){const r=Z(e,t),n=document.querySelector(r);if(null==n?void 0:n.textContent){const{body:e,...t}=JSON.parse(n.textContent),a=n.getAttribute("data-ttl");return a&&Y.set(r,{body:e,init:t,ttl:1e3*Number(a)}),Promise.resolve(new Response(e,t))}return X(e,t)}(a,n)},setHeaders:()=>{},depends:e,parent:()=>(d.parent=!0,t())};u=await p.universal.load.call(null,s)??null,u=u?await async function(e){var t;for(const r in e)if("function"==typeof(null==(t=e[r])?void 0:t.then))return Object.fromEntries(await Promise.all(Object.entries(e).map((async([e,t])=>[e,await t]))));return e}(u):null}return{node:p,loader:e,server:o,universal:(null==(i=p.universal)?void 0:i.load)?{type:"data",data:u,uses:d}:null,data:u??(null==o?void 0:o.data)??null,slash:(null==(l=p.universal)?void 0:l.trailingSlash)??(null==o?void 0:o.slash)}}function H(e,t,r,a,o){if(v)return!0;if(!a)return!1;if(a.parent&&e)return!0;if(a.route&&t)return!0;if(a.url&&r)return!0;for(const n of a.params)if(o[n]!==l.params[n])return!0;for(const s of a.dependencies)if(n.some((e=>e(new URL(s)))))return!0;return!1}function z(e,t){return"data"===(null==e?void 0:e.type)?{type:"data",data:e.data,uses:{dependencies:new Set(e.uses.dependencies??[]),params:new Set(e.uses.params??[]),parent:!!e.uses.parent,route:!!e.uses.route,url:!!e.uses.url},slash:e.slash}:"skip"===(null==e?void 0:e.type)?t??null:null}async function W({id:e,invalidating:t,url:r,params:n,route:a}){if((null==o?void 0:o.id)===e)return o.promise;const{errors:s,layouts:i,leaf:u}=a,c=[...i,u];s.forEach((e=>null==e?void 0:e().catch((()=>{})))),c.forEach((e=>null==e?void 0:e[1]().catch((()=>{}))));let d=null;const p=!!l.url&&e!==l.url.pathname+l.url.search,f=!!l.route&&a.id!==l.route.id;let m=!1;const h=c.map(((e,t)=>{var r;const a=l.branch[t],o=!!(null==e?void 0:e[0])&&((null==a?void 0:a.loader)!==e[1]||H(m,f,p,null==(r=a.server)?void 0:r.uses,n));return o&&(m=!0),o}));if(h.some(Boolean)){try{d=await Pe(r,h)}catch(w){return te({status:w instanceof he?w.status:500,error:await Oe(w,{url:r,params:n,route:{id:a.id}}),url:r,route:a})}if("redirect"===d.type)return d}const v=null==d?void 0:d.nodes;let g=!1;const _=c.map((async(e,t)=>{var o;if(!e)return;const s=l.branch[t],i=null==v?void 0:v[t];if(!(i&&"skip"!==i.type||e[1]!==(null==s?void 0:s.loader)||H(g,f,p,null==(o=s.universal)?void 0:o.uses,n)))return s;if(g=!0,"error"===(null==i?void 0:i.type))throw i;return J({loader:e[1],url:r,params:n,route:a,parent:async()=>{var e;const r={};for(let n=0;n<t;n+=1)Object.assign(r,null==(e=await _[n])?void 0:e.data);return r},server_data_node:z(void 0===i&&e[0]?{type:"skip"}:i??null,e[0]?null==s?void 0:s.server:void 0)})}));for(const o of _)o.catch((()=>{}));const y=[];for(let o=0;o<c.length;o+=1)if(c[o])try{y.push(await _[o])}catch(b){if(b instanceof ve)return{type:"redirect",location:b.location};let e,t=500;if(null==v?void 0:v.includes(b))t=b.status??t,e=b.error;else if(b instanceof he)t=b.status,e=b.body;else{if(await U.updated.check())return await ie(r);e=await Oe(b,{params:n,url:r,route:{id:a.id}})}const i=await ee(o,y,s);return i?await M({url:r,params:n,branch:y.slice(0,i.idx).concat(i.node),status:t,error:e,route:a}):await se(r,{id:a.id},e,t)}else y.push(void 0);return await M({url:r,params:n,branch:y,status:200,error:null,route:a,form:t?void 0:null})}async function ee(e,t,r){for(;e--;)if(r[e]){let a=e;for(;!t[a];)a-=1;try{return{idx:a+1,node:{node:await r[e](),loader:r[e],data:{},server:null,universal:null}}}catch(n){continue}}}async function te({status:e,error:t,url:r,route:n}){const a={};let o=null;if(0===fe[0])try{const e=await Pe(r,[!0]);if("data"!==e.type||e.nodes[0]&&"data"!==e.nodes[0].type)throw 0;o=e.nodes[0]??null}catch{(r.origin!==location.origin||r.pathname!==location.pathname||u)&&await ie(r)}const s=await J({loader:ke,url:r,params:a,route:n,parent:()=>Promise.resolve({}),server_data_node:z(o)}),i={node:await Re(),loader:Re,universal:null,server:null,data:null};return await M({url:r,params:a,branch:[s,i],status:e,error:t,route:null})}function re(e,t){if(V(e,F))return;const r=ne(e);for(const n of $e){const a=n.exec(r);if(a){return{id:e.pathname+e.search,invalidating:t,route:n,params:G(a),url:e}}}}function ne(e){return(e.pathname.slice(F.length)||"/").split("%25").map(decodeURI).join("%25")}function ae({url:e,type:t,intent:r,delta:n}){var a,o;let i=!1;const u={from:{params:l.params,route:{id:(null==(a=l.route)?void 0:a.id)??null},url:l.url},to:{params:(null==r?void 0:r.params)??null,route:{id:(null==(o=null==r?void 0:r.route)?void 0:o.id)??null},url:e},willUnload:!r,type:t};void 0!==n&&(u.delta=n);const c={...u,cancel:()=>{i=!0}};return m||s.before_navigate.forEach((e=>e(c))),i?null:u}async function oe({url:e,scroll:t,keepfocus:r,redirect_chain:n,details:a,type:o,delta:i,nav_token:l,accepted:u,blocked:d}){const p=re(e,!1),f=ae({url:e,type:o,delta:i,intent:p});if(!f)return void d();const h=g;u(),m=!0,c&&U.navigating.set(f),await q(p,e,n,h,{scroll:t,keepfocus:r,details:a},l,(()=>{m=!1,s.after_navigate.forEach((e=>e(f))),U.navigating.set(null)}))}async function se(e,t,r,n){return e.origin!==location.origin||e.pathname!==location.pathname||u?await ie(e):await te({status:n,error:r,url:e,route:t})}function ie(e){return location.href=e.href,new Promise((()=>{}))}return _&&(history.scrollRestoration="manual",scrollTo(_.x,_.y)),{after_navigate:e=>{f((()=>(s.after_navigate.push(e),()=>{const t=s.after_navigate.indexOf(e);s.after_navigate.splice(t,1)})))},before_navigate:e=>{f((()=>(s.before_navigate.push(e),()=>{const t=s.before_navigate.indexOf(e);s.before_navigate.splice(t,1)})))},disable_scroll_handling:()=>{!p&&c||(d=!1)},goto:(e,t={})=>R(e,t,[]),invalidate:e=>{if("function"==typeof e)n.push(e);else{const{href:t}=new URL(e,location.href);n.push((e=>e.href===t))}return E()},invalidateAll:()=>(v=!0,E()),preload_data:async e=>{const t=new URL(e,x(document)),r=re(t,!1);if(!r)throw new Error(`Attempted to preload a URL that does not belong to this app: ${t}`);await L(r)},preload_code:A,apply_action:async e=>{if("error"===e.type){const t=new URL(location.href),{branch:r,route:n}=l;if(!n)return;const a=await ee(l.branch.length,r,n.errors);if(a){const o=await M({url:t,params:l.params,branch:r.slice(0,a.idx).concat(a.node),status:e.status??500,error:e.error,route:n});l=o.state,i.$set(o.props),j().then(xe)}}else if("redirect"===e.type)R(e.location,{invalidateAll:!0},[]);else{const t={form:e.data,page:{...y,form:e.data,status:e.status}};i.$set(t),"success"===e.type&&j().then(xe)}},_start_router:()=>{var e;history.scrollRestoration="manual",addEventListener("beforeunload",(e=>{var t;let r=!1;if(!m){const e={from:{params:l.params,route:{id:(null==(t=l.route)?void 0:t.id)??null},url:l.url},to:null,willUnload:!0,type:"leave",cancel:()=>r=!0};s.before_navigate.forEach((t=>t(e)))}r?(e.preventDefault(),e.returnValue=""):history.scrollRestoration="auto"})),addEventListener("visibilitychange",(()=>{"hidden"===document.visibilityState&&(je(g),Q(S,Le),$(g),Q(P,Ae))})),(null==(e=navigator.connection)?void 0:e.saveData)||function(){let e;function t(e){a(e.composedPath()[0],1)}r.addEventListener("mousemove",(t=>{const r=t.target;clearTimeout(e),e=setTimeout((()=>{a(r,2)}),20)})),r.addEventListener("mousedown",t),r.addEventListener("touchstart",t,{passive:!0});const n=new IntersectionObserver((e=>{for(const t of e)t.isIntersecting&&(A(ne(new URL(t.target.href))),n.unobserve(t.target))}),{threshold:0});function a(e,t){const n=I(e,r);if(!n)return;const{url:a,external:o}=D(n,F);if(o)return;const s=T(n);if(!s.reload)if(t<=s.preload_data){const e=re(a,!1);e&&L(e)}else t<=s.preload_code&&A(ne(a))}function o(){n.disconnect();for(const e of r.querySelectorAll("a")){const{url:t,external:r}=D(e,F);if(r)continue;const a=T(e);a.reload||(a.preload_code===C.viewport&&n.observe(e),a.preload_code===C.eager&&A(ne(t)))}}s.after_navigate.push(o),o()}(),r.addEventListener("click",(e=>{if(e.button||1!==e.which)return;if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;if(e.defaultPrevented)return;const t=I(e.composedPath()[0],r);if(!t)return;const{url:n,external:a,target:o}=D(t,F);if(!n)return;if("_parent"===o||"_top"===o){if(window.parent!==window)return}else if(o&&"_self"!==o)return;const s=T(t);if(!(t instanceof SVGAElement)&&n.protocol!==location.protocol&&"https:"!==n.protocol&&"http:"!==n.protocol)return;if(a||s.reload){return ae({url:n,type:"link"})||e.preventDefault(),void(m=!0)}const[i,u]=n.href.split("#");if(void 0!==u&&i===location.href.split("#")[0])return h=!0,je(g),l.url=n,U.page.set({...y,url:n}),void U.page.notify();oe({url:n,scroll:s.noscroll?N():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:n.href===location.href},accepted:()=>e.preventDefault(),blocked:()=>e.preventDefault(),type:"link"})})),r.addEventListener("submit",(e=>{if(e.defaultPrevented)return;const t=HTMLFormElement.prototype.cloneNode.call(e.target),r=e.submitter;if("get"!==((null==r?void 0:r.formMethod)||t.method))return;const n=new URL((null==r?void 0:r.hasAttribute("formaction"))&&(null==r?void 0:r.formAction)||t.action);if(V(n,F))return;const a=e.target,{noscroll:o,reload:s}=T(a);if(s)return;e.preventDefault(),e.stopPropagation();const i=new FormData(a),l=null==r?void 0:r.getAttribute("name");l&&i.append(l,(null==r?void 0:r.getAttribute("value"))??""),n.search=new URLSearchParams(i).toString(),oe({url:n,scroll:o?N():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})})),addEventListener("popstate",(async e=>{var t;if(null==(t=e.state)?void 0:t[O]){if(e.state[O]===g)return;const t=Le[e.state[O]];if(l.url.href.split("#")[0]===location.href.split("#")[0])return Le[g]=N(),g=e.state[O],void scrollTo(t.x,t.y);const r=e.state[O]-g;let n=!1;await oe({url:new URL(location.href),scroll:t,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{g=e.state[O]},blocked:()=>{history.go(-r),n=!0},type:"popstate",delta:r}),n||k(g)}})),addEventListener("hashchange",(()=>{h&&(h=!1,history.replaceState({...history.state,[O]:++g},"",location.href))}));for(const t of document.querySelectorAll("link"))"icon"===t.rel&&(t.href=t.href);addEventListener("pageshow",(e=>{e.persisted&&U.navigating.set(null)}))},_hydrate:async({status:e=200,error:t,node_ids:r,params:n,route:a,data:o,form:s})=>{u=!0;const i=new URL(location.href);let l;({params:n={},route:a={id:null}}=re(i,!1)||{});try{const u=r.map((async(e,t)=>{const r=o[t];return J({loader:pe[e],url:i,params:n,route:a,parent:async()=>{const e={};for(let r=0;r<t;r+=1)Object.assign(e,(await u[r]).data);return e},server_data_node:z(r)})}));l=await M({url:i,params:n,branch:await Promise.all(u),status:e,error:t,form:s,route:$e.find((({id:e})=>e===a.id))??null})}catch(c){if(c instanceof ve)return void(await ie(new URL(c.location,location.href)));l=await te({status:c instanceof he?c.status:500,error:await Oe(c,{url:i,params:n,route:a}),url:i,route:a})}B(l)}}}async function Pe(e,t){var r;const n=new URL(e);n.pathname=e.pathname.replace(/\/$/,"")+z,n.searchParams.append("x-sveltekit-invalidated",t.map((e=>e?"1":"")).join("_"));const a=await X(n.href),o=await a.json();if(!a.ok)throw new he(a.status,o);return null==(r=o.nodes)||r.forEach((e=>{"data"===(null==e?void 0:e.type)&&(e.data=function(e,t){if("number"==typeof e)return a(e,!0);if(!Array.isArray(e)||0===e.length)throw new Error("Invalid input");const r=e,n=Array(r.length);function a(e,o=!1){if(e===ge)return;if(e===ye)return NaN;if(e===we)return 1/0;if(e===be)return-1/0;if(e===Ee)return-0;if(o)throw new Error("Invalid input");if(e in n)return n[e];const s=r[e];if(s&&"object"==typeof s)if(Array.isArray(s))if("string"==typeof s[0]){const r=s[0],o=null==t?void 0:t[r];if(o)return n[e]=o(a(s[1]));switch(r){case"Date":n[e]=new Date(s[1]);break;case"Set":const t=new Set;n[e]=t;for(let e=1;e<s.length;e+=1)t.add(a(s[e]));break;case"Map":const o=new Map;n[e]=o;for(let e=1;e<s.length;e+=2)o.set(a(s[e]),a(s[e+1]));break;case"RegExp":n[e]=new RegExp(s[1],s[2]);break;case"Object":n[e]=Object(s[1]);break;case"BigInt":n[e]=BigInt(s[1]);break;case"null":const i=Object.create(null);n[e]=i;for(let e=1;e<s.length;e+=2)i[s[e]]=a(s[e+1]);break;default:throw new Error(`Unknown type ${r}`)}}else{const t=new Array(s.length);n[e]=t;for(let e=0;e<s.length;e+=1){const r=s[e];r!==_e&&(t[e]=a(r))}}else{const t={};n[e]=t;for(const e in s){const r=s[e];t[e]=a(r)}}else n[e]=s;return n[e]}return a(0)}(e.data),e.uses={dependencies:new Set(e.uses.dependencies??[]),params:new Set(e.uses.params??[]),parent:!!e.uses.parent,route:!!e.uses.route,url:!!e.uses.url})})),o}function Oe(e,t){return e instanceof he?e.body:me.handleError({error:e,event:t})??{message:null!=t.route.id?"Internal Error":"Not Found"}}function xe(){const e=document.querySelector("[autofocus]");if(!e){const e=document.body,t=e.getAttribute("tabindex");return e.tabIndex=-1,e.focus({preventScroll:!0}),null!==t?e.setAttribute("tabindex",t):e.removeAttribute("tabindex"),new Promise((e=>{setTimeout((()=>{var t;e(null==(t=getSelection())?void 0:t.removeAllRanges())}))}))}e.focus()}async function Ie({assets:e,env:t,hydrate:r,target:n,version:a}){J(e),B(a);const o=Se({target:n});q({client:o}),r?await o._hydrate(r):o.goto(location.href,{replaceState:!0}),o._start_router()}export{Ie as start};
