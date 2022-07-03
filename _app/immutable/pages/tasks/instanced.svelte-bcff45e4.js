import{S as P,i as C,s as j,w as z}from"../../chunks/index-9379afd2.js";import{aw as $,ax as A,ay as T,az as I,aA as O,i as U,G as Y,aB as W,av as X,a5 as J}from"../../chunks/gl-9f8be024.js";import{a as N}from"../../chunks/assets-a572b544.js";import{O as K}from"../../chunks/orbit-controls-8a0943e2.js";class Q extends ${constructor(g){super(g),this.type=A}parse(g){const m=function(e,a){switch(e){case 1:console.error("THREE.RGBELoader Read Error: "+(a||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(a||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(a||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(a||""))}return-1},L=`
`,w=function(e,a,i){a=a||1024;let s=e.pos,n=-1,r=0,l="",t=String.fromCharCode.apply(null,new Uint16Array(e.subarray(s,s+128)));for(;0>(n=t.indexOf(L))&&r<a&&s<e.byteLength;)l+=t,r+=t.length,s+=128,t+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(s,s+128)));return-1<n?(i!==!1&&(e.pos+=r+n+1),l+t.slice(0,n)):!1},G=function(e){const a=/^#\?(\S+)/,i=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,n=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,r={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let l,t;if(e.pos>=e.byteLength||!(l=w(e)))return m(1,"no header found");if(!(t=l.match(a)))return m(3,"bad initial token");for(r.valid|=1,r.programtype=t[1],r.string+=l+`
`;l=w(e),l!==!1;){if(r.string+=l+`
`,l.charAt(0)==="#"){r.comments+=l+`
`;continue}if((t=l.match(i))&&(r.gamma=parseFloat(t[1])),(t=l.match(o))&&(r.exposure=parseFloat(t[1])),(t=l.match(s))&&(r.valid|=2,r.format=t[1]),(t=l.match(n))&&(r.valid|=4,r.height=parseInt(t[1],10),r.width=parseInt(t[2],10)),r.valid&2&&r.valid&4)break}return r.valid&2?r.valid&4?r:m(3,"missing image size specifier"):m(3,"missing format specifier")},x=function(e,a,i){const o=a;if(o<8||o>32767||e[0]!==2||e[1]!==2||e[2]&128)return new Uint8Array(e);if(o!==(e[2]<<8|e[3]))return m(3,"wrong scanline width");const s=new Uint8Array(4*a*i);if(!s.length)return m(4,"unable to allocate buffer space");let n=0,r=0;const l=4*o,t=new Uint8Array(4),R=new Uint8Array(l);let S=i;for(;S>0&&r<e.byteLength;){if(r+4>e.byteLength)return m(1);if(t[0]=e[r++],t[1]=e[r++],t[2]=e[r++],t[3]=e[r++],t[0]!=2||t[1]!=2||(t[2]<<8|t[3])!=o)return m(3,"bad rgbe scanline format");let B=0,h;for(;B<l&&r<e.byteLength;){h=e[r++];const p=h>128;if(p&&(h-=128),h===0||B+h>l)return m(3,"bad scanline data");if(p){const d=e[r++];for(let D=0;D<h;D++)R[B++]=d}else R.set(e.subarray(r,r+h),B),B+=h,r+=h}const q=o;for(let p=0;p<q;p++){let d=0;s[n]=R[p+d],d+=o,s[n+1]=R[p+d],d+=o,s[n+2]=R[p+d],d+=o,s[n+3]=R[p+d],n+=4}S--}return s},H=function(e,a,i,o){const s=e[a+3],n=Math.pow(2,s-128)/255;i[o+0]=e[a+0]*n,i[o+1]=e[a+1]*n,i[o+2]=e[a+2]*n,i[o+3]=1},V=function(e,a,i,o){const s=e[a+3],n=Math.pow(2,s-128)/255;i[o+0]=I.toHalfFloat(Math.min(e[a+0]*n,65504)),i[o+1]=I.toHalfFloat(Math.min(e[a+1]*n,65504)),i[o+2]=I.toHalfFloat(Math.min(e[a+2]*n,65504)),i[o+3]=I.toHalfFloat(1)},M=new Uint8Array(g);M.pos=0;const E=G(M);if(E!==-1){const e=E.width,a=E.height,i=x(M.subarray(M.pos),e,a);if(i!==-1){let o,s,n;switch(this.type){case T:n=i.length/4;const r=new Float32Array(n*4);for(let t=0;t<n;t++)H(i,t*4,r,t*4);o=r,s=T;break;case A:n=i.length/4;const l=new Uint16Array(n*4);for(let t=0;t<n;t++)V(i,t*4,l,t*4);o=l,s=A;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:e,height:a,data:o,header:E.string,gamma:E.gamma,exposure:E.exposure,type:s}}}return null}setDataType(g){return this.type=g,this}load(g,u,c,y){function b(_,m){switch(_.type){case T:case A:_.encoding=O,_.minFilter=U,_.magFilter=U,_.generateMipmaps=!1,_.flipY=!0;break}u&&u(_,m)}return super.load(g,b,c,y)}}function Z(k){const g={overpass:"https://threejs.org/examples/textures/equirectangular/pedestrian_overpass_1k.hdr",quarry:"https://threejs.org/examples/textures/equirectangular/quarry_01_1k.hdr",spot:"https://threejs.org/examples/textures/equirectangular/spot1Lux.hdr",sunset:"https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr"},u=c=>Math.random()*c*2-c;return z(async()=>{const c=Y(),y=new K(c.camera,document.body);y.autoRotate=!0,c.ambientLight.intensity=.5;const[b]=await Promise.all([new Q().loadAsync(g.sunset),N.load("mug.glb")]),_=new W(c.renderer);_.compileEquirectangularShader();const m=_.fromEquirectangular(b).texture;c.scene.background=m,c.scene.environment=m,b.dispose(),_.dispose();const f=300,F=N.get("mug.glb").scene.getObjectByName("Mug"),L=new X(F.geometry,F.material,f),w=new J;let G=0;for(;G<f;)w.setPosition(u(4),u(4),u(4)),L.setMatrixAt(G,w),G+=1;c.scene.add(L),c.camera.position.set(1,.8,1);const x=()=>{y.update()};c.setAnimationLoop(x)}),[]}class ne extends P{constructor(g){super(),C(this,g,Z,null,j,{})}}export{ne as default};