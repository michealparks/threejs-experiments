import{c as s,S as u,a as m}from"./gl-4a6563e5.js";var d="varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}",f="uniform float uAlpha;uniform float uTime;varying vec2 vUv;void main(){float strength=clamp(distance(vUv,vec2(0.5)),0.0,1.0);gl_FragColor=vec4(0,0,0,uAlpha+strength*0.9);}";const p=t=>{let e=1,o=!1,r=0;const n=new s(2,2,1,1),a=new u({uniforms:{uAlpha:{value:e},uTime:{value:r}},vertexShader:d,fragmentShader:f,transparent:!0,depthTest:!1}),i=new m(n,a);t.add(i);const l=v=>{if(e<=0){t.remove(i),n.dispose(),a.dispose();return}r+=v,o&&(e-=.01,a.uniforms.uAlpha.value=e),a.uniforms.uTime.value=r,requestAnimationFrame(l)};return l(0),()=>{o=!0}};export{p as l};
