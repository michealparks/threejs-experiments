import{S as s,i as a,s as r,k as e,q as t,a as u,l as n,m as i,r as c,h as o,c as b,b as l,G as p,u as d,B as g,H as m}from"../chunks/index-1236a393.js";import{s as v}from"../chunks/singletons-8ccc91b8.js";const f={subscribe:s=>(()=>{const s=v;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}})().page.subscribe(s)};function h(s){var a;let r,m,v,f,h,k=s[0].status+"",x=(null==(a=s[0].error)?void 0:a.message)+"";return{c(){r=e("h1"),m=t(k),v=u(),f=e("p"),h=t(x)},l(s){r=n(s,"H1",{});var a=i(r);m=c(a,k),a.forEach(o),v=b(s),f=n(s,"P",{});var e=i(f);h=c(e,x),e.forEach(o)},m(s,a){l(s,r,a),p(r,m),l(s,v,a),l(s,f,a),p(f,h)},p(s,[a]){var r;1&a&&k!==(k=s[0].status+"")&&d(m,k),1&a&&x!==(x=(null==(r=s[0].error)?void 0:r.message)+"")&&d(h,x)},i:g,o:g,d(s){s&&o(r),s&&o(v),s&&o(f)}}}function k(s,a,r){let e;return m(s,f,(s=>r(0,e=s))),[e]}let x=class extends s{constructor(s){super(),a(this,s,k,h,r,{})}};export{x as default};
