import{S as m,i as f,s as d,e as _,c as v,a as g,d as o,b,g as x,n as c,Q as P,w,R as y}from"./index-9379afd2.js";import{t as k}from"./tweakpane-ca06611a.js";function D(a){let e;return{c(){e=_("div"),this.h()},l(n){e=v(n,"DIV",{class:!0}),g(e).forEach(o),this.h()},h(){b(e,"class","pane svelte-1vvsncb")},m(n,s){x(n,e,s),a[3](e)},p:c,i:c,o:c,d(n){n&&o(e),a[3](null)}}}function E(a,e,n){let s,{inputs:i={}}=e,{parameters:r={}}=e;const l=P();w(()=>{const t=new k.exports.Pane({container:s});for(const[h,u]of Object.entries(i))t.addInput(r,h,u);t.on("change",()=>l("change"))});function p(t){y[t?"unshift":"push"](()=>{s=t,n(0,s)})}return a.$$set=t=>{"inputs"in t&&n(1,i=t.inputs),"parameters"in t&&n(2,r=t.parameters)},[s,i,r,p]}class j extends m{constructor(e){super(),f(this,e,E,D,d,{inputs:1,parameters:2})}}export{j as P};