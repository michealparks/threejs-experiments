import{U as a,at as s,au as e,av as w,P as o,aw as h,ax as t,ay as n,az as i,aA as d}from"./vendor-dc2a1d13.js";import{S as r,C as c}from"./gl-afc887b2.js";const m=(w=1,o=4500104)=>new a(new s(w,w,w),new e({color:o})),g=(s=1,e=16711680)=>new a(new w(s,16,16),new o({color:e})),p=()=>{const a=c.warmLight,s=new h(a,3);return s.castShadow=!0,s.shadow.mapSize.width=r.width,s.shadow.mapSize.height=r.height,s.shadow.radius=8,s.shadow.bias=-1e-4,s},u=()=>{const a=new t(c.warmLight,5);return a.castShadow=!0,a.angle=50,a.penumbra=1,a.shadow.mapSize.width=r.width,a.shadow.mapSize.height=r.height,a.shadow.radius=8,a.shadow.bias=-1e-4,a},S=()=>{const a=new n(c.white,1);return a.castShadow=!0,a.shadow.bias=-.001,a},b=()=>new i(c.white,.3),l=(s=80,o=12)=>{const h=new e({color:2733814}),t=new w(s,o,o);return h.side=d,new a(t,h)};export{S as a,g as b,m as c,u as d,p as e,b as f,l as g};
