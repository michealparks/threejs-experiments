import{a as i,ak as c,al as o,am as r,M as w,f as g,an as s,e as d,ao as n,D as S,ap as m,aq as p}from"./gl-4a6563e5.js";const l=(e=1,t=4500104)=>new i(new c(e,e,e),new o({color:t})),y=(e=1,t=16711680)=>new i(new r(e,16,16),new w({color:t})),L=()=>{const t=n.warmLight,a=new g(t,3);return a.castShadow=!0,a.shadow.mapSize.width=s.width,a.shadow.mapSize.height=s.height,a.shadow.radius=8,a.shadow.bias=-1e-4,a},M=()=>{const t=new d(n.warmLight,5);return t.castShadow=!0,t.angle=50,t.penumbra=1,t.shadow.mapSize.width=s.width,t.shadow.mapSize.height=s.height,t.shadow.radius=8,t.shadow.bias=-1e-4,t},b=()=>{const t=new S(n.white,1);return t.castShadow=!0,t.shadow.bias=-.001,t},D=()=>new m(n.white,.3),P=(e=80,t=12)=>{const a=new o({color:2733814}),h=new r(e,t,t);return a.side=p,new i(h,a)};export{M as a,l as b,b as c,y as d,L as e,D as f,P as g};
