import{ag as e,Q as a,ah as n}from"./vendor-9aeeaeec.js";const o=o=>{let r=1,i=!1,v=0;const t=new e(2,2,1,1),s=new a({uniforms:{uAlpha:{value:r},uTime:{value:v}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}",fragmentShader:"uniform float uAlpha;uniform float uTime;varying vec2 vUv;void main(){float strength=clamp(distance(vUv,vec2(0.5)),0.0,1.0);gl_FragColor=vec4(0,0,0,uAlpha+strength*0.3);}",transparent:!0}),u=new n(t,s);o.add(u);const l=e=>{if(r<=0)return o.remove(u),t.dispose(),void s.dispose();v+=e,i&&(r-=.01,s.uniforms.uAlpha.value=r),s.uniforms.uTime.value=v,requestAnimationFrame(l)};return l(0),()=>{i=!0}};export{o as l};
