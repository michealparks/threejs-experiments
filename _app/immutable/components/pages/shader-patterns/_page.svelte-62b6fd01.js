import{S as e,i as t,s as v}from"../../../chunks/index-a2938516.js";import{c as o,S as n,p as r,i as c,s as a,j as g,u as i}from"../../../chunks/index-ba1d3bc3.js";const x="varying vec2 vUv;void main(){vUv=uv;vec4 modelPosition=modelMatrix*vec4(position,1.0);gl_Position=projectionMatrix*viewMatrix*modelPosition;}",s="varying vec2 vUv;void main(){gl_FragColor=vec4(vUv,1.0,1.0);}",f="varying vec2 vUv;void main(){float strength=vUv.x;gl_FragColor=vec4(strength,strength,strength,1.0);}",y="varying vec2 vUv;void main(){float strength=step(0.8,mod(vUv.x*10.0,1.0));strength*=step(0.8,mod(vUv.y*10.0,1.0));gl_FragColor=vec4(strength,strength,strength,1.0);}",d="uniform float time;varying vec2 vUv;void main(){float ts=sin(time);float tc=cos(time);float tt=tan(time);float strength=step(0.2,max(abs(vUv.x-0.5),abs(vUv.y-0.5)));strength*=1.0-step(0.25,max(abs(vUv.x-0.5),abs(vUv.y-0.5)));gl_FragColor=vec4(ts*strength,tc*strength,tt*strength,1.0);}",l="varying vec2 vUv;float random(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}void main(){float mag=10.0;vec2 gridUv=vec2(floor(vUv.x*mag)/mag,floor(vUv.y*mag)/mag);float strength=random(gridUv);gl_FragColor=vec4(vec3(strength),1.0);}",m="varying vec2 vUv;void main(){float strength=0.015/(distance(vUv,vec2(0.5)));gl_FragColor=vec4(vec3(strength),0.1);}",w="varying vec2 vUv;void main(){vec2 wavedUv=vec2(vUv.x+sin(vUv.y*30.0)*0.1,vUv.y+sin(vUv.x*30.0)*0.1);float strength=1.0-step(0.01,abs(distance(wavedUv,vec2(0.5))-0.25));gl_FragColor=vec4(vec3(strength),1.0);}",h="varying vec2 vUv;vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}float cnoise(vec2 P){vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);Pi=mod(Pi,289.0);vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;vec4 i=permute(permute(ix)+iy);vec4 gx=2.0*fract(i*0.0243902439)-1.0;vec4 gy=abs(gx)-0.5;vec4 tx=floor(gx+0.5);gx=gx-tx;vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;float n00=dot(g00,vec2(fx.x,fy.x));float n10=dot(g10,vec2(fx.y,fy.y));float n01=dot(g01,vec2(fx.z,fy.z));float n11=dot(g11,vec2(fx.w,fy.w));vec2 fade_xy=fade(Pf.xy);vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);float n_xy=mix(n_x.x,n_x.y,fade_xy.y);return 2.3*n_xy;}void main(){float strength=cnoise(vUv*10.0);gl_FragColor=vec4(vec3(strength),1.0);}",U="varying vec2 vUv;vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}float cnoise(vec2 P){vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);Pi=mod(Pi,289.0);vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;vec4 i=permute(permute(ix)+iy);vec4 gx=2.0*fract(i*0.0243902439)-1.0;vec4 gy=abs(gx)-0.5;vec4 tx=floor(gx+0.5);gx=gx-tx;vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;float n00=dot(g00,vec2(fx.x,fy.x));float n10=dot(g10,vec2(fx.y,fy.y));float n01=dot(g01,vec2(fx.z,fy.z));float n11=dot(g11,vec2(fx.w,fy.w));vec2 fade_xy=fade(Pf.xy);vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);float n_xy=mix(n_x.x,n_x.y,fade_xy.y);return 2.3*n_xy;}void main(){float strength=step(0.9,sin(cnoise(vUv*5.0)*20.0));gl_FragColor=vec4(vec3(strength),1.0);}";function u(e){const t=[s,f,y,d,l,m,w,h,U],v=[];o.position.set(0,4,4);for(const[o,g]of t.entries()){const e=new n({uniforms:{time:{value:1}},vertexShader:x,fragmentShader:g,transparent:!0}),t=new r(1,1,1,1,1,1),i=new c(t,e);i.rotation.x=o/2,i.rotation.x+=.5,i.rotation.y+=.5,i.position.set(2*o,0,0),a.add(i),v.push(i)}o.lookAt(v[0].position);const u=new Set;let P=0;return i((e=>{for(const t of v)t.rotation.x=e/1e3,t.material.uniforms.time.value+=.01;for(const t of u)switch(t){case"a":case"arrowleft":P=-.15;break;case"d":case"arrowright":P=.15}P/=1.1,o.position.x+=P})),window.addEventListener("keydown",(e=>{u.add(e.key.toLowerCase())})),window.addEventListener("keyup",(e=>{u.delete(e.key.toLowerCase())})),g(),[]}class P extends e{constructor(e){super(),t(this,e,u,null,v,{})}}export{P as default};
