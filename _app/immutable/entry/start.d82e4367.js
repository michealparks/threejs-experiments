import{o as e,t}from"../chunks/index.6b6f0a4a.js";import{S as r,a as n,I as a,g as o,f as i,b as s,c as l,s as c,i as u,d,P as f,e as p}from"../chunks/singletons.9d1d885d.js";import{b as h}from"../chunks/paths.d426e88a.js";function v(e){for(const t in e)e[t]=decodeURIComponent(e[t]);return e}const m=["href","pathname","search","searchParams","toString","toJSON"];function y(e,t){const r=new URL(e);for(const n of m){let e=r[n];Object.defineProperty(r,n,{get:()=>(t(),e),enumerable:!0,configurable:!0})}return function(e){Object.defineProperty(e,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}(r),r}const g="/__data.json";function w(e){try{return JSON.parse(sessionStorage[e])}catch{}}function b(e,t){const r=JSON.stringify(t);try{sessionStorage[e]=r}catch{}}const _=window.fetch;window.fetch=(e,t)=>("GET"!==(e instanceof Request?e.method:(null==t?void 0:t.method)||"GET")&&S.delete(E(e)),_(e,t));const S=new Map;function E(e,t){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if((null==t?void 0:t.headers)||(null==t?void 0:t.body)){const e=[];t.headers&&e.push([...new Headers(t.headers)].join(",")),t.body&&("string"==typeof t.body||ArrayBuffer.isView(t.body))&&e.push(t.body),r+=`[data-hash="${function(...e){let t=5381;for(const r of e)if("string"==typeof r){let e=r.length;for(;e;)t=33*t^r.charCodeAt(--e)}else{if(!ArrayBuffer.isView(r))throw new TypeError("value must be a string or TypedArray");{const e=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let n=e.length;for(;n;)t=33*t^e[--n]}}return(t>>>0).toString(36)}(...e)}"]`}return r}const k=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function x(e){const t=[];var r;return{pattern:"/"===e?/^\/$/:new RegExp(`^${(r=e,r.slice(1).split("/").filter(R)).map((e=>{const r=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(e);if(r)return t.push({name:r[1],matcher:r[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const n=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(e);if(n)return t.push({name:n[1],matcher:n[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!e)return;const a=e.split(/\[(.+?)\](?!\])/);return"/"+a.map(((e,r)=>{if(r%2){if(e.startsWith("x+"))return $(String.fromCharCode(parseInt(e.slice(2),16)));if(e.startsWith("u+"))return $(String.fromCharCode(...e.slice(2).split("-").map((e=>parseInt(e,16)))));const n=k.exec(e);if(!n)throw new Error(`Invalid param: ${e}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,o,i,s,l]=n;return t.push({name:s,matcher:l,optional:!!o,rest:!!i,chained:!!i&&(1===r&&""===a[0])}),i?"(.*?)":o?"([^/]*)?":"([^/]+?)"}return $(e)})).join("")})).join("")}/?$`),params:t}}function R(e){return!/^\([^)]+\)$/.test(e)}function $(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}let L=class{constructor(e,t){this.status=e,this.body="string"==typeof t?{message:t}:t||{message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}},P=class{constructor(e,t){this.status=e,this.location=t}};Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const j=-1,U=-2,A=-3,O=-4,I=-5,T=-6;function N(e){const t=new Set(e);return function(r,n){if(r)for(const a in r){if("_"===a[0]||t.has(a))continue;const r=D(a,null==n?void 0:n.slice(n.lastIndexOf(".")))??`valid exports are ${e.join(", ")}, or anything with a '_' prefix`;throw new Error(`Invalid export '${a}'${n?` in ${n}`:""} (${r})`)}}}function D(e,t=".js"){let r=[];if(C.includes(e)&&r.push(`+page${t}`),q.includes(e)&&r.push(`+page.server${t}`),M.includes(e)&&r.push(`+server${t}`),r.length>0)return`'${e}' is a valid export in ${r.join(" or ")}`}const C=["load","prerender","csr","ssr","trailingSlash","config"],q=["load","prerender","csr","ssr","actions","trailingSlash","config"],M=["GET","POST","PATCH","PUT","DELETE","OPTIONS","prerender","trailingSlash","config"];N(C),N(q),N(M);const J=w(r)??{},B=w(n)??{};function F(e){J[e]=d()}function G(p,m){var g;const w=function({nodes:e,server_loads:t,dictionary:r,matchers:n}){const a=new Set(t);return Object.entries(r).map((([t,[r,a,s]])=>{const{pattern:l,params:c}=x(t),u={id:t,exec:e=>{const t=l.exec(e);if(t)return function(e,t,r){const n={},a=e.slice(1);let o=0;for(let i=0;i<t.length;i+=1){const e=t[i],s=a[i-o];if(e.chained&&e.rest&&o)n[e.name]=a.slice(i-o,i+1).filter((e=>e)).join("/"),o=0;else if(void 0!==s)if(e.matcher&&!r[e.matcher](s)){if(!e.optional||!e.chained)return;o++}else{n[e.name]=s;const r=t[i+1],l=a[i+1];r&&!r.rest&&r.optional&&l&&(o=0)}else e.rest&&(n[e.name]="")}if(!o)return n}(t,c,n)},errors:[1,...s||[]].map((t=>e[t])),layouts:[0,...a||[]].map(i),leaf:o(r)};return u.errors.length=u.layouts.length=Math.max(u.errors.length,u.layouts.length),u}));function o(t){const r=t<0;return r&&(t=~t),[r,e[t]]}function i(t){return void 0===t?t:[a.has(t),e[t]]}}(p),k=p.nodes[0],R=p.nodes[1];k(),R();const $=document.documentElement,j=[],U=[];let A=null;const O={before_navigate:[],after_navigate:[]};let I,T={branch:[],error:null,url:null},N=!1,D=!1,C=!0,q=!1,M=!1,G=!1,W=!1,z=null==(g=history.state)?void 0:g[a];z||(z=Date.now(),history.replaceState({...history.state,[a]:z},"",location.href));const Q=J[z];let X,Y,Z;async function ee(){Z=Z||Promise.resolve(),await Z,Z=null;const e=new URL(location.href),t=ve(e,!0);A=null;const r=Y={},n=t&&await fe(t);if(r===Y&&n){if("redirect"===n.type)return ae(new URL(n.location,e).href,{},[e.pathname],r);I.$set(n.props)}}function te(e){U.some((e=>null==e?void 0:e.snapshot))&&(B[e]=U.map((e=>{var t;return null==(t=null==e?void 0:e.snapshot)?void 0:t.capture()})))}function re(e){var t;null==(t=B[e])||t.forEach(((e,t)=>{var r,n;null==(n=null==(r=U[t])?void 0:r.snapshot)||n.restore(e)}))}function ne(){F(z),b(r,J),te(z),b(n,B)}async function ae(e,{noScroll:t=!1,replaceState:r=!1,keepFocus:n=!1,state:a={},invalidateAll:i=!1},s,l){return"string"==typeof e&&(e=new URL(e,o(document))),ge({url:e,scroll:t?d():null,keepfocus:n,redirect_chain:s,details:{state:a,replaceState:r},nav_token:l,accepted:()=>{i&&(W=!0)},blocked:()=>{},type:"goto"})}async function oe(e){return A={id:e.id,promise:fe(e).then((e=>("loaded"===e.type&&e.state.error&&(A=null),e)))},A.promise}async function ie(...e){const t=w.filter((t=>e.some((e=>t.exec(e))))).map((e=>Promise.all([...e.layouts,e.leaf].map((e=>null==e?void 0:e[1]())))));await Promise.all(t)}function se(e){var t;T=e.state;const r=document.querySelector("style[data-sveltekit]");r&&r.remove(),X=e.props.page,I=new p.root({target:m,props:{...e.props,stores:c,components:U},hydrate:!0}),re(z);const n={from:null,to:{params:T.params,route:{id:(null==(t=T.route)?void 0:t.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};O.after_navigate.forEach((e=>e(n))),D=!0}async function le({url:e,params:t,branch:r,status:n,error:a,route:o,form:i}){let s="never";for(const v of r)void 0!==(null==v?void 0:v.slash)&&(s=v.slash);var l,c;e.pathname=(l=e.pathname,c=s,"/"===l||"ignore"===c?l:"never"===c?l.endsWith("/")?l.slice(0,-1):l:"always"!==c||l.endsWith("/")?l:l+"/"),e.search=e.search;const u={type:"loaded",state:{url:e,params:t,branch:r,error:a,route:o},props:{constructors:(d=r,d.filter((e=>null!=e))).map((e=>e.node.component))}};var d;void 0!==i&&(u.props.form=i);let f={},p=!X,h=0;for(let v=0;v<Math.max(r.length,T.branch.length);v+=1){const e=r[v],t=T.branch[v];(null==e?void 0:e.data)!==(null==t?void 0:t.data)&&(p=!0),e&&(f={...f,...e.data},p&&(u.props[`data_${h}`]=f),h+=1)}return(!T.url||e.href!==T.url.href||T.error!==a||void 0!==i&&i!==X.form||p)&&(u.props.page={error:a,params:t,route:{id:(null==o?void 0:o.id)??null},status:n,url:new URL(e),form:i??null,data:p?f:X.data}),u}async function ce({loader:e,parent:t,url:r,params:n,route:a,server_data_node:o}){var i,s,l;let c=null;const u={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},d=await e();if(null==(i=d.universal)?void 0:i.load){let e=function(...e){for(const t of e){const{href:e}=new URL(t,r);u.dependencies.add(e)}};const i={route:{get id(){return u.route=!0,a.id}},params:new Proxy(n,{get:(e,t)=>(u.params.add(t),e[t])}),data:(null==o?void 0:o.data)??null,url:y(r,(()=>{u.url=!0})),async fetch(t,n){let a;t instanceof Request?(a=t.url,n={body:"GET"===t.method||"HEAD"===t.method?void 0:await t.blob(),cache:t.cache,credentials:t.credentials,headers:t.headers,integrity:t.integrity,keepalive:t.keepalive,method:t.method,mode:t.mode,redirect:t.redirect,referrer:t.referrer,referrerPolicy:t.referrerPolicy,signal:t.signal,...n}):a=t;const o=new URL(a,r);return e(o.href),o.origin===r.origin&&(a=o.href.slice(r.origin.length)),D?function(e,t,r){if(S.size>0){const t=E(e,r),n=S.get(t);if(n){if(performance.now()<n.ttl&&["default","force-cache","only-if-cached",void 0].includes(null==r?void 0:r.cache))return new Response(n.body,n.init);S.delete(t)}}return _(t,r)}(a,o.href,n):function(e,t){const r=E(e,t),n=document.querySelector(r);if(null==n?void 0:n.textContent){const{body:e,...t}=JSON.parse(n.textContent),a=n.getAttribute("data-ttl");return a&&S.set(r,{body:e,init:t,ttl:1e3*Number(a)}),Promise.resolve(new Response(e,t))}return _(e,t)}(a,n)},setHeaders:()=>{},depends:e,parent:()=>(u.parent=!0,t())};c=await d.universal.load.call(null,i)??null,c=c?await async function(e){var t;for(const r in e)if("function"==typeof(null==(t=e[r])?void 0:t.then))return Object.fromEntries(await Promise.all(Object.entries(e).map((async([e,t])=>[e,await t]))));return e}(c):null}return{node:d,loader:e,server:o,universal:(null==(s=d.universal)?void 0:s.load)?{type:"data",data:c,uses:u}:null,data:c??(null==o?void 0:o.data)??null,slash:(null==(l=d.universal)?void 0:l.trailingSlash)??(null==o?void 0:o.slash)}}function ue(e,t,r,n,a){if(W)return!0;if(!n)return!1;if(n.parent&&e)return!0;if(n.route&&t)return!0;if(n.url&&r)return!0;for(const o of n.params)if(a[o]!==T.params[o])return!0;for(const o of n.dependencies)if(j.some((e=>e(new URL(o)))))return!0;return!1}function de(e,t){return"data"===(null==e?void 0:e.type)?e:"skip"===(null==e?void 0:e.type)?t??null:null}async function fe({id:e,invalidating:t,url:r,params:n,route:a}){if((null==A?void 0:A.id)===e)return A.promise;const{errors:o,layouts:i,leaf:s}=a,l=[...i,s];o.forEach((e=>null==e?void 0:e().catch((()=>{})))),l.forEach((e=>null==e?void 0:e[1]().catch((()=>{}))));let u=null;const d=!!T.url&&e!==T.url.pathname+T.url.search,f=!!T.route&&a.id!==T.route.id;let p=!1;const h=l.map(((e,t)=>{var r;const a=T.branch[t],o=!!(null==e?void 0:e[0])&&((null==a?void 0:a.loader)!==e[1]||ue(p,f,d,null==(r=a.server)?void 0:r.uses,n));return o&&(p=!0),o}));if(h.some(Boolean)){try{u=await H(r,h)}catch(w){return he({status:w instanceof L?w.status:500,error:await _e(w,{url:r,params:n,route:{id:a.id}}),url:r,route:a})}if("redirect"===u.type)return u}const v=null==u?void 0:u.nodes;let m=!1;const y=l.map((async(e,t)=>{var o;if(!e)return;const i=T.branch[t],s=null==v?void 0:v[t];if(!(s&&"skip"!==s.type||e[1]!==(null==i?void 0:i.loader)||ue(m,f,d,null==(o=i.universal)?void 0:o.uses,n)))return i;if(m=!0,"error"===(null==s?void 0:s.type))throw s;return ce({loader:e[1],url:r,params:n,route:a,parent:async()=>{var e;const r={};for(let n=0;n<t;n+=1)Object.assign(r,null==(e=await y[n])?void 0:e.data);return r},server_data_node:de(void 0===s&&e[0]?{type:"skip"}:s??null,e[0]?null==i?void 0:i.server:void 0)})}));for(const c of y)c.catch((()=>{}));const g=[];for(let _=0;_<l.length;_+=1)if(l[_])try{g.push(await y[_])}catch(b){if(b instanceof P)return{type:"redirect",location:b.location};let e,t=500;if(null==v?void 0:v.includes(b))t=b.status??t,e=b.error;else if(b instanceof L)t=b.status,e=b.body;else{if(await c.updated.check())return await be(r);e=await _e(b,{params:n,url:r,route:{id:a.id}})}const i=await pe(_,g,o);return i?await le({url:r,params:n,branch:g.slice(0,i.idx).concat(i.node),status:t,error:e,route:a}):await we(r,{id:a.id},e,t)}else g.push(void 0);return await le({url:r,params:n,branch:g,status:200,error:null,route:a,form:t?void 0:null})}async function pe(e,t,r){for(;e--;)if(r[e]){let a=e;for(;!t[a];)a-=1;try{return{idx:a+1,node:{node:await r[e](),loader:r[e],data:{},server:null,universal:null}}}catch(n){continue}}}async function he({status:e,error:t,url:r,route:n}){const a={};let o=null;if(0===p.server_loads[0])try{const e=await H(r,[!0]);if("data"!==e.type||e.nodes[0]&&"data"!==e.nodes[0].type)throw 0;o=e.nodes[0]??null}catch{(r.origin!==location.origin||r.pathname!==location.pathname||N)&&await be(r)}const i=await ce({loader:k,url:r,params:a,route:n,parent:()=>Promise.resolve({}),server_data_node:de(o)}),s={node:await R(),loader:R,universal:null,server:null,data:null};return await le({url:r,params:a,branch:[i,s],status:e,error:t,route:null})}function ve(e,t){if(u(e,h))return;const r=me(e);for(const n of w){const a=n.exec(r);if(a){return{id:e.pathname+e.search,invalidating:t,route:n,params:v(a),url:e}}}}function me(e){return(e.pathname.slice(h.length)||"/").split("%25").map(decodeURI).join("%25")}function ye({url:e,type:t,intent:r,delta:n}){var a,o;let i=!1;const s={from:{params:T.params,route:{id:(null==(a=T.route)?void 0:a.id)??null},url:T.url},to:{params:(null==r?void 0:r.params)??null,route:{id:(null==(o=null==r?void 0:r.route)?void 0:o.id)??null},url:e},willUnload:!r,type:t};void 0!==n&&(s.delta=n);const l={...s,cancel:()=>{i=!0}};return M||O.before_navigate.forEach((e=>e(l))),i?null:s}async function ge({url:e,scroll:r,keepfocus:n,redirect_chain:o,details:i,type:s,delta:l,nav_token:d={},accepted:f,blocked:p}){var v,m,y;const g=ve(e,!1),w=ye({url:e,type:s,delta:l,intent:g});if(!w)return void p();const b=z;f(),M=!0,D&&c.navigating.set(w),Y=d;let _=g&&await fe(g);if(!_){if(u(e,h))return await be(e);_=await we(e,{id:null},await _e(new Error(`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=(null==g?void 0:g.url)||e,Y!==d)return!1;if("redirect"===_.type){if(!(o.length>10||o.includes(e.pathname)))return ae(new URL(_.location,e).href,{},[...o,e.pathname],d),!1;_=await he({status:500,error:await _e(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}})}else if((null==(v=_.props.page)?void 0:v.status)>=400){await c.updated.check()&&await be(e)}if(j.length=0,W=!1,q=!0,F(b),te(b),(null==(m=_.props.page)?void 0:m.url)&&_.props.page.url.pathname!==e.pathname&&(e.pathname=null==(y=_.props.page)?void 0:y.url.pathname),i){const t=i.replaceState?0:1;if(i.state[a]=z+=t,history[i.replaceState?"replaceState":"pushState"](i.state,"",e),!i.replaceState){let e=z+1;for(;B[e]||J[e];)delete B[e],delete J[e],e+=1}}A=null,D?(T=_.state,_.props.page&&(_.props.page.url=e),I.$set(_.props)):se(_);const{activeElement:S}=document;if(await t(),C){const t=e.hash&&document.getElementById(decodeURIComponent(e.hash.slice(1)));r?scrollTo(r.x,r.y):t?t.scrollIntoView():scrollTo(0,0)}const E=document.activeElement!==S&&document.activeElement!==document.body;n||E||await K(),C=!0,_.props.page&&(X=_.props.page),M=!1,O.after_navigate.forEach((e=>e(w))),c.navigating.set(null),q=!1}async function we(e,t,r,n){return e.origin!==location.origin||e.pathname!==location.pathname||N?await be(e):await he({status:n,error:r,url:e,route:t})}function be(e){return location.href=e.href,new Promise((()=>{}))}function _e(e,t){return e instanceof L?e.body:p.hooks.handleError({error:e,event:t})??{message:null!=t.route.id?"Internal Error":"Not Found"}}return Q&&(history.scrollRestoration="manual",scrollTo(Q.x,Q.y)),{after_navigate:t=>{e((()=>(O.after_navigate.push(t),()=>{const e=O.after_navigate.indexOf(t);O.after_navigate.splice(e,1)})))},before_navigate:t=>{e((()=>(O.before_navigate.push(t),()=>{const e=O.before_navigate.indexOf(t);O.before_navigate.splice(e,1)})))},disable_scroll_handling:()=>{!q&&D||(C=!1)},goto:(e,t={})=>ae(e,t,[]),invalidate:e=>{if("function"==typeof e)j.push(e);else{const{href:t}=new URL(e,location.href);j.push((e=>e.href===t))}return ee()},invalidateAll:()=>(W=!0,ee()),preload_data:async e=>{const t=new URL(e,o(document)),r=ve(t,!1);if(!r)throw new Error(`Attempted to preload a URL that does not belong to this app: ${t}`);await oe(r)},preload_code:ie,apply_action:async e=>{if("error"===e.type){const r=new URL(location.href),{branch:n,route:a}=T;if(!a)return;const o=await pe(T.branch.length,n,a.errors);if(o){const i=await le({url:r,params:T.params,branch:n.slice(0,o.idx).concat(o.node),status:e.status??500,error:e.error,route:a});T=i.state,I.$set(i.props),t().then(K)}}else"redirect"===e.type?ae(e.location,{invalidateAll:!0},[]):(I.$set({form:null,page:{...X,form:e.data,status:e.status}}),await t(),I.$set({form:e.data}),"success"===e.type&&K())},_start_router:()=>{var e;history.scrollRestoration="manual",addEventListener("beforeunload",(e=>{var t;let r=!1;if(ne(),!M){const e={from:{params:T.params,route:{id:(null==(t=T.route)?void 0:t.id)??null},url:T.url},to:null,willUnload:!0,type:"leave",cancel:()=>r=!0};O.before_navigate.forEach((t=>t(e)))}r?(e.preventDefault(),e.returnValue=""):history.scrollRestoration="auto"})),addEventListener("visibilitychange",(()=>{"hidden"===document.visibilityState&&ne()})),(null==(e=navigator.connection)?void 0:e.saveData)||function(){let e;function t(e){n(e.composedPath()[0],1)}$.addEventListener("mousemove",(t=>{const r=t.target;clearTimeout(e),e=setTimeout((()=>{n(r,2)}),20)})),$.addEventListener("mousedown",t),$.addEventListener("touchstart",t,{passive:!0});const r=new IntersectionObserver((e=>{for(const t of e)t.isIntersecting&&(ie(me(new URL(t.target.href))),r.unobserve(t.target))}),{threshold:0});function n(e,t){const r=i(e,$);if(!r)return;const{url:n,external:a,download:o}=s(r,h);if(a||o)return;const c=l(r);if(!c.reload)if(t<=c.preload_data){const e=ve(n,!1);e&&oe(e)}else t<=c.preload_code&&ie(me(n))}function a(){r.disconnect();for(const e of $.querySelectorAll("a")){const{url:t,external:n,download:a}=s(e,h);if(n||a)continue;const o=l(e);o.reload||(o.preload_code===f.viewport&&r.observe(e),o.preload_code===f.eager&&ie(me(t)))}}O.after_navigate.push(a),a()}(),$.addEventListener("click",(e=>{if(e.button||1!==e.which)return;if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;if(e.defaultPrevented)return;const t=i(e.composedPath()[0],$);if(!t)return;const{url:r,external:n,target:a,download:o}=s(t,h);if(!r)return;if("_parent"===a||"_top"===a){if(window.parent!==window)return}else if(a&&"_self"!==a)return;const u=l(t);if(!(t instanceof SVGAElement)&&r.protocol!==location.protocol&&"https:"!==r.protocol&&"http:"!==r.protocol)return;if(o)return;if(n||u.reload)return void(ye({url:r,type:"link"})?M=!0:e.preventDefault());const[f,p]=r.href.split("#");if(void 0!==p&&f===location.href.split("#")[0]){if(G=!0,F(z),T.url=r,c.page.set({...X,url:r}),c.page.notify(),!u.replace_state)return;G=!1,e.preventDefault()}ge({url:r,scroll:u.noscroll?d():null,keepfocus:u.keep_focus??!1,redirect_chain:[],details:{state:{},replaceState:u.replace_state??r.href===location.href},accepted:()=>e.preventDefault(),blocked:()=>e.preventDefault(),type:"link"})})),$.addEventListener("submit",(e=>{if(e.defaultPrevented)return;const t=HTMLFormElement.prototype.cloneNode.call(e.target),r=e.submitter;if("get"!==((null==r?void 0:r.formMethod)||t.method))return;const n=new URL((null==r?void 0:r.hasAttribute("formaction"))&&(null==r?void 0:r.formAction)||t.action);if(u(n,h))return;const a=e.target,{keep_focus:o,noscroll:i,reload:s,replace_state:c}=l(a);if(s)return;e.preventDefault(),e.stopPropagation();const f=new FormData(a),p=null==r?void 0:r.getAttribute("name");p&&f.append(p,(null==r?void 0:r.getAttribute("value"))??""),n.search=new URLSearchParams(f).toString(),ge({url:n,scroll:i?d():null,keepfocus:o??!1,redirect_chain:[],details:{state:{},replaceState:c??n.href===location.href},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})})),addEventListener("popstate",(async e=>{var t;if(null==(t=e.state)?void 0:t[a]){if(e.state[a]===z)return;const t=J[e.state[a]];if(T.url.href.split("#")[0]===location.href.split("#")[0])return J[z]=d(),z=e.state[a],void scrollTo(t.x,t.y);const r=e.state[a]-z;let n=!1;await ge({url:new URL(location.href),scroll:t,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{z=e.state[a]},blocked:()=>{history.go(-r),n=!0},type:"popstate",delta:r}),n||re(z)}})),addEventListener("hashchange",(()=>{G&&(G=!1,history.replaceState({...history.state,[a]:++z},"",location.href))}));for(const t of document.querySelectorAll("link"))"icon"===t.rel&&(t.href=t.href);addEventListener("pageshow",(e=>{e.persisted&&c.navigating.set(null)}))},_hydrate:async({status:e=200,error:t,node_ids:r,params:n,route:a,data:o,form:i})=>{N=!0;const s=new URL(location.href);let l;({params:n={},route:a={id:null}}=ve(s,!1)||{});try{const c=r.map((async(e,t)=>{const r=o[t];return(null==r?void 0:r.uses)&&(r.uses=V(r.uses)),ce({loader:p.nodes[e],url:s,params:n,route:a,parent:async()=>{const e={};for(let r=0;r<t;r+=1)Object.assign(e,(await c[r]).data);return e},server_data_node:de(r)})}));l=await le({url:s,params:n,branch:await Promise.all(c),status:e,error:t,form:i,route:w.find((({id:e})=>e===a.id))??null})}catch(c){if(c instanceof P)return void(await be(new URL(c.location,location.href)));l=await he({status:c instanceof L?c.status:500,error:await _e(c,{url:s,params:n,route:a}),url:s,route:a})}se(l)}}}async function H(e,t){const r=new URL(e);r.pathname=e.pathname.replace(/\/$/,"")+g,r.searchParams.append("x-sveltekit-invalidated",t.map((e=>e?"1":"")).join("_"));const n=await _(r.href);if(!n.ok)throw new L(n.status,await n.json());return new Promise((async e=>{var t;const r=new Map,a=n.body.getReader(),o=new TextDecoder;function i(e){return function(e,t){if("number"==typeof e)return a(e,!0);if(!Array.isArray(e)||0===e.length)throw new Error("Invalid input");const r=e,n=Array(r.length);function a(e,o=!1){if(e===j)return;if(e===A)return NaN;if(e===O)return 1/0;if(e===I)return-1/0;if(e===T)return-0;if(o)throw new Error("Invalid input");if(e in n)return n[e];const i=r[e];if(i&&"object"==typeof i)if(Array.isArray(i))if("string"==typeof i[0]){const r=i[0],o=null==t?void 0:t[r];if(o)return n[e]=o(a(i[1]));switch(r){case"Date":n[e]=new Date(i[1]);break;case"Set":const t=new Set;n[e]=t;for(let e=1;e<i.length;e+=1)t.add(a(i[e]));break;case"Map":const o=new Map;n[e]=o;for(let e=1;e<i.length;e+=2)o.set(a(i[e]),a(i[e+1]));break;case"RegExp":n[e]=new RegExp(i[1],i[2]);break;case"Object":n[e]=Object(i[1]);break;case"BigInt":n[e]=BigInt(i[1]);break;case"null":const s=Object.create(null);n[e]=s;for(let e=1;e<i.length;e+=2)s[i[e]]=a(i[e+1]);break;default:throw new Error(`Unknown type ${r}`)}}else{const t=new Array(i.length);n[e]=t;for(let e=0;e<i.length;e+=1){const r=i[e];r!==U&&(t[e]=a(r))}}else{const t={};n[e]=t;for(const e in i){const r=i[e];t[e]=a(r)}}else n[e]=i;return n[e]}return a(0)}(e,{Promise:e=>new Promise(((t,n)=>{r.set(e,{fulfil:t,reject:n})}))})}let s="";for(;;){const{done:n,value:l}=await a.read();if(n&&!s)break;for(s+=!l&&s?"\n":o.decode(l);;){const n=s.indexOf("\n");if(-1===n)break;const a=JSON.parse(s.slice(0,n));if(s=s.slice(n+1),"redirect"===a.type)return e(a);if("data"===a.type)null==(t=a.nodes)||t.forEach((e=>{"data"===(null==e?void 0:e.type)&&(e.uses=V(e.uses),e.data=i(e.data))})),e(a);else if("chunk"===a.type){const{id:e,data:t,error:n}=a,o=r.get(e);r.delete(e),n?o.reject(i(n)):o.fulfil(i(t))}}}}))}function V(e){return{dependencies:new Set((null==e?void 0:e.dependencies)??[]),params:new Set((null==e?void 0:e.params)??[]),parent:!!(null==e?void 0:e.parent),route:!!(null==e?void 0:e.route),url:!!(null==e?void 0:e.url)}}function K(){const e=document.querySelector("[autofocus]");if(!e){const e=document.body,t=e.getAttribute("tabindex");return e.tabIndex=-1,e.focus({preventScroll:!0}),null!==t?e.setAttribute("tabindex",t):e.removeAttribute("tabindex"),new Promise((e=>{setTimeout((()=>{var t;e(null==(t=getSelection())?void 0:t.removeAllRanges())}))}))}e.focus()}async function W(e,t,r){const n=G(e,t);p({client:n}),r?await n._hydrate(r):n.goto(location.href,{replaceState:!0}),n._start_router()}export{W as start};
