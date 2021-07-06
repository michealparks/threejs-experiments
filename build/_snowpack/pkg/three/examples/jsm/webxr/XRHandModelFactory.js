import { am as Group, $ as SphereGeometry, Y as BoxGeometry, a7 as MeshStandardMaterial, k as Mesh, aP as Vector4, s as Vector3, aQ as Curve, h as Loader, a4 as LoaderUtils, a5 as FileLoader, q as TextureLoader, ac as RepeatWrapping, ax as ClampToEdgeWrapping, T as Texture, J as MeshPhongMaterial, aR as MeshLambertMaterial, a as Color, v as sRGBEncoding, aS as EquirectangularReflectionMapping, M as Matrix4, aq as Bone, ag as PropertyBinding, a0 as Object3D, O as OrthographicCamera, P as PerspectiveCamera, a1 as PointLight, an as MathUtils, K as SpotLight, a3 as DirectionalLight, ah as SkinnedMesh, af as LineBasicMaterial, aj as Line, ar as Skeleton, w as AmbientLight, o as BufferGeometry, aT as Float32BufferAttribute, aU as Uint16BufferAttribute, aV as Matrix3, p as BufferAttribute, ap as AnimationClip, aW as Euler, aE as VectorKeyframeTrack, Q as Quaternion, aF as QuaternionKeyframeTrack, aG as NumberKeyframeTrack } from '../../../../common/three.module-be8725f9.js';

class XRHandPrimitiveModel {

	constructor( handModel, controller, path, handedness, options ) {

		this.controller = controller;
		this.handModel = handModel;

	  this.envMap = null;

		this.handMesh = new Group();
		this.handModel.add( this.handMesh );

		if ( window.XRHand ) {

			let geometry;

			if ( ! options || ! options.primitive || options.primitive === 'sphere' ) {

				geometry = new SphereGeometry( 1, 10, 10 );

			} else if ( options.primitive === 'box' ) {

				geometry = new BoxGeometry( 1, 1, 1 );

			}

			const jointMaterial = new MeshStandardMaterial( { color: 0xffffff, roughness: 1, metalness: 0 } );
			const tipMaterial = new MeshStandardMaterial( { color: 0x999999, roughness: 1, metalness: 0 } );

			const joints = [
				'wrist',
				'thumb-metacarpal',
				'thumb-phalanx-proximal',
				'thumb-phalanx-distal',
				'thumb-tip',
				'index-finger-metacarpal',
				'index-finger-phalanx-proximal',
				'index-finger-phalanx-intermediate',
				'index-finger-phalanx-distal',
				'index-finger-tip',
				'middle-finger-metacarpal',
				'middle-finger-phalanx-proximal',
				'middle-finger-phalanx-intermediate',
				'middle-finger-phalanx-distal',
				'middle-finger-tip',
				'ring-finger-metacarpal',
				'ring-finger-phalanx-proximal',
				'ring-finger-phalanx-intermediate',
				'ring-finger-phalanx-distal',
				'ring-finger-tip',
				'pinky-finger-metacarpal',
				'pinky-finger-phalanx-proximal',
				'pinky-finger-phalanx-intermediate',
				'pinky-finger-phalanx-distal',
				'pinky-finger-tip'
			];

			for ( const jointName of joints ) {

				var cube = new Mesh( geometry, jointName.indexOf( 'tip' ) !== - 1 ? tipMaterial : jointMaterial );
				cube.castShadow = true;
				cube.receiveShadow = true;
				cube.jointName = jointName;
				this.handMesh.add( cube );

			}

		}

	}

	updateMesh() {

		const defaultRadius = 0.008;
		const objects = this.handMesh.children;

		// XR Joints
		const XRJoints = this.controller.joints;

		for ( let i = 0; i < objects.length; i ++ ) {

			const jointMesh = objects[ i ];
			const XRJoint = XRJoints[ jointMesh.jointName ];

			if ( XRJoint.visible ) {

				jointMesh.position.copy( XRJoint.position );
				jointMesh.quaternion.copy( XRJoint.quaternion );
				jointMesh.scale.setScalar( XRJoint.jointRadius || defaultRadius );

			}

			jointMesh.visible = XRJoint.visible;

		}

	}

}

/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
*/
var gn={},bn=function(n,r,t,e,i){var a=gn[r]||(gn[r]=URL.createObjectURL(new Blob([n],{type:"text/javascript"}))),o=new Worker(a);return o.onerror=function(f){return i(f.error,null)},o.onmessage=function(f){return i(null,f.data)},o.postMessage(t,e),o},A=Uint8Array,R=Uint16Array,nr=Uint32Array,ur=new A([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),lr=new A([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Mr=new A([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),wn=function(n,r){for(var t=new R(31),e=0;e<31;++e)t[e]=r+=1<<n[e-1];for(var i=new nr(t[30]),e=1;e<30;++e)for(var a=t[e];a<t[e+1];++a)i[a]=a-t[e]<<5|e;return [t,i]},yn=wn(ur,2),Nr=yn[0],Ir=yn[1];Nr[28]=258,Ir[258]=28;for(var mn=wn(lr,0),zn=mn[0],Qr=mn[1],Ur=new R(32768),T=0;T<32768;++T){var ir=(T&43690)>>>1|(T&21845)<<1;ir=(ir&52428)>>>2|(ir&13107)<<2,ir=(ir&61680)>>>4|(ir&3855)<<4,Ur[T]=((ir&65280)>>>8|(ir&255)<<8)>>>1;}for(var V=function(n,r,t){for(var e=n.length,i=0,a=new R(r);i<e;++i)++a[n[i]-1];var o=new R(r);for(i=0;i<r;++i)o[i]=o[i-1]+a[i-1]<<1;var f;if(t){f=new R(1<<r);var h=15-r;for(i=0;i<e;++i)if(n[i])for(var s=i<<4|n[i],u=r-n[i],l=o[n[i]-1]++<<u,p=l|(1<<u)-1;l<=p;++l)f[Ur[l]>>>h]=s;}else for(f=new R(e),i=0;i<e;++i)n[i]&&(f[i]=Ur[o[n[i]-1]++]>>>15-n[i]);return f},tr=new A(288),T=0;T<144;++T)tr[T]=8;for(var T=144;T<256;++T)tr[T]=9;for(var T=256;T<280;++T)tr[T]=7;for(var T=280;T<288;++T)tr[T]=8;for(var vr=new A(32),T=0;T<32;++T)vr[T]=5;var xn=V(tr,9,0),An=V(tr,9,1),Dn=V(vr,5,0),Mn=V(vr,5,1),Gr=function(n){for(var r=n[0],t=1;t<n.length;++t)n[t]>r&&(r=n[t]);return r},X=function(n,r,t){var e=r/8|0;return (n[e]|n[e+1]<<8)>>(r&7)&t},Or=function(n,r){var t=r/8|0;return (n[t]|n[t+1]<<8|n[t+2]<<16)>>(r&7)},Cr=function(n){return (n/8|0)+(n&7&&1)},$=function(n,r,t){(r==null||r<0)&&(r=0),(t==null||t>n.length)&&(t=n.length);var e=new(n instanceof R?R:n instanceof nr?nr:A)(t-r);return e.set(n.subarray(r,t)),e},Fr=function(n,r,t){var e=n.length;if(!e||t&&!t.l&&e<5)return r||new A(0);var i=!r||t,a=!t||t.i;t||(t={}),r||(r=new A(e*3));var o=function(Tr){var Dr=r.length;if(Tr>Dr){var hr=new A(Math.max(Dr*2,Tr));hr.set(r),r=hr;}},f=t.f||0,h=t.p||0,s=t.b||0,u=t.l,l=t.d,p=t.m,y=t.n,c=e*8;do{if(!u){t.f=f=X(n,h,1);var g=X(n,h+1,3);if(h+=3,g)if(g==1)u=An,l=Mn,p=9,y=5;else if(g==2){var m=X(n,h,31)+257,D=X(n,h+10,15)+4,C=m+X(n,h+5,31)+1;h+=14;for(var U=new A(C),x=new A(19),v=0;v<D;++v)x[Mr[v]]=X(n,h+v*3,7);h+=D*3;var E=Gr(x),S=(1<<E)-1;if(!a&&h+C*(E+7)>c)break;for(var K=V(x,E,1),v=0;v<C;){var I=K[X(n,h,S)];h+=I&15;var w=I>>>4;if(w<16)U[v++]=w;else {var Z=0,B=0;for(w==16?(B=3+X(n,h,3),h+=2,Z=U[v-1]):w==17?(B=3+X(n,h,7),h+=3):w==18&&(B=11+X(n,h,127),h+=7);B--;)U[v++]=Z;}}var G=U.subarray(0,m),k=U.subarray(m);p=Gr(G),y=Gr(k),u=V(G,p,1),l=V(k,y,1);}else throw "invalid block type";else {var w=Cr(h)+4,M=n[w-4]|n[w-3]<<8,z=w+M;if(z>e){if(a)throw "unexpected EOF";break}i&&o(s+M),r.set(n.subarray(w,z),s),t.b=s+=M,t.p=h=z*8;continue}if(h>c)throw "unexpected EOF"}i&&o(s+131072);for(var O=(1<<p)-1,H=(1<<y)-1,N=p+y+18;a||h+N<c;){var Z=u[Or(n,h)&O],Q=Z>>>4;if(h+=Z&15,h>c)throw "unexpected EOF";if(!Z)throw "invalid length/literal";if(Q<256)r[s++]=Q;else if(Q==256){u=null;break}else {var W=Q-254;if(Q>264){var v=Q-257,d=ur[v];W=X(n,h,(1<<d)-1)+Nr[v],h+=d;}var _=l[Or(n,h)&H],j=_>>>4;if(!_)throw "invalid distance";h+=_&15;var k=zn[j];if(j>3){var d=lr[j];k+=Or(n,h)&(1<<d)-1,h+=d;}if(h>c)throw "unexpected EOF";i&&o(s+131072);for(var q=s+W;s<q;s+=4)r[s]=r[s-k],r[s+1]=r[s+1-k],r[s+2]=r[s+2-k],r[s+3]=r[s+3-k];s=q;}}t.l=u,t.p=h,t.b=s,u&&(f=1,t.m=p,t.d=l,t.n=y);}while(!f);return s==r.length?r:$(r,0,s)},b=function(n,r,t){t<<=r&7;var e=r/8|0;n[e]|=t,n[e+1]|=t>>>8;},cr=function(n,r,t){t<<=r&7;var e=r/8|0;n[e]|=t,n[e+1]|=t>>>8,n[e+2]|=t>>>16;},Er=function(n,r){for(var t=[],e=0;e<n.length;++e)n[e]&&t.push({s:e,f:n[e]});var i=t.length,a=t.slice();if(!i)return [er,0];if(i==1){var o=new A(t[0].s+1);return o[t[0].s]=1,[o,1]}t.sort(function(C,U){return C.f-U.f}),t.push({s:-1,f:25001});var f=t[0],h=t[1],s=0,u=1,l=2;for(t[0]={s:-1,f:f.f+h.f,l:f,r:h};u!=i-1;)f=t[t[s].f<t[l].f?s++:l++],h=t[s!=u&&t[s].f<t[l].f?s++:l++],t[u++]={s:-1,f:f.f+h.f,l:f,r:h};for(var p=a[0].s,e=1;e<i;++e)a[e].s>p&&(p=a[e].s);var y=new R(p+1),c=Pr(t[u-1],y,0);if(c>r){var e=0,g=0,w=c-r,M=1<<w;for(a.sort(function(U,x){return y[x.s]-y[U.s]||U.f-x.f});e<i;++e){var z=a[e].s;if(y[z]>r)g+=M-(1<<c-y[z]),y[z]=r;else break}for(g>>>=w;g>0;){var m=a[e].s;y[m]<r?g-=1<<r-y[m]++-1:++e;}for(;e>=0&&g;--e){var D=a[e].s;y[D]==r&&(--y[D],++g);}c=r;}return [new A(y),c]},Pr=function(n,r,t){return n.s==-1?Math.max(Pr(n.l,r,t+1),Pr(n.r,r,t+1)):r[n.s]=t},Vr=function(n){for(var r=n.length;r&&!n[--r];);for(var t=new R(++r),e=0,i=n[0],a=1,o=function(h){t[e++]=h;},f=1;f<=r;++f)if(n[f]==i&&f!=r)++a;else {if(!i&&a>2){for(;a>138;a-=138)o(32754);a>2&&(o(a>10?a-11<<5|28690:a-3<<5|12305),a=0);}else if(a>3){for(o(i),--a;a>6;a-=6)o(8304);a>2&&(o(a-3<<5|8208),a=0);}for(;a--;)o(i);a=1,i=n[f];}return [t.subarray(0,e),r]},pr=function(n,r){for(var t=0,e=0;e<r.length;++e)t+=n[e]*r[e];return t},Sr=function(n,r,t){var e=t.length,i=Cr(r+2);n[i]=e&255,n[i+1]=e>>>8,n[i+2]=n[i]^255,n[i+3]=n[i+1]^255;for(var a=0;a<e;++a)n[i+a+4]=t[a];return (i+4+e)*8},Xr=function(n,r,t,e,i,a,o,f,h,s,u){b(r,u++,t),++i[256];for(var l=Er(i,15),p=l[0],y=l[1],c=Er(a,15),g=c[0],w=c[1],M=Vr(p),z=M[0],m=M[1],D=Vr(g),C=D[0],U=D[1],x=new R(19),v=0;v<z.length;++v)x[z[v]&31]++;for(var v=0;v<C.length;++v)x[C[v]&31]++;for(var E=Er(x,7),S=E[0],K=E[1],I=19;I>4&&!S[Mr[I-1]];--I);var Z=s+5<<3,B=pr(i,tr)+pr(a,vr)+o,G=pr(i,p)+pr(a,g)+o+14+3*I+pr(x,S)+(2*x[16]+3*x[17]+7*x[18]);if(Z<=B&&Z<=G)return Sr(r,u,n.subarray(h,h+s));var k,O,H,N;if(b(r,u,1+(G<B)),u+=2,G<B){k=V(p,y,0),O=p,H=V(g,w,0),N=g;var Q=V(S,K,0);b(r,u,m-257),b(r,u+5,U-1),b(r,u+10,I-4),u+=14;for(var v=0;v<I;++v)b(r,u+3*v,S[Mr[v]]);u+=3*I;for(var W=[z,C],d=0;d<2;++d)for(var _=W[d],v=0;v<_.length;++v){var j=_[v]&31;b(r,u,Q[j]),u+=S[j],j>15&&(b(r,u,_[v]>>>5&127),u+=_[v]>>>12);}}else k=xn,O=tr,H=Dn,N=vr;for(var v=0;v<f;++v)if(e[v]>255){var j=e[v]>>>18&31;cr(r,u,k[j+257]),u+=O[j+257],j>7&&(b(r,u,e[v]>>>23&31),u+=ur[j]);var q=e[v]&31;cr(r,u,H[q]),u+=N[q],q>3&&(cr(r,u,e[v]>>>5&8191),u+=lr[q]);}else cr(r,u,k[e[v]]),u+=O[e[v]];return cr(r,u,k[256]),u+O[256]},Un=new nr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),er=new A(0),Cn=function(n,r,t,e,i,a){var o=n.length,f=new A(e+o+5*(1+Math.ceil(o/7e3))+i),h=f.subarray(e,f.length-i),s=0;if(!r||o<8)for(var u=0;u<=o;u+=65535){var l=u+65535;l<o?s=Sr(h,s,n.subarray(u,l)):(h[u]=a,s=Sr(h,s,n.subarray(u,o)));}else {for(var p=Un[r-1],y=p>>>13,c=p&8191,g=(1<<t)-1,w=new R(32768),M=new R(g+1),z=Math.ceil(t/3),m=2*z,D=function(Kr){return (n[Kr]^n[Kr+1]<<z^n[Kr+2]<<m)&g},C=new nr(25e3),U=new R(288),x=new R(32),v=0,E=0,u=0,S=0,K=0,I=0;u<o;++u){var Z=D(u),B=u&32767,G=M[Z];if(w[B]=G,M[Z]=B,K<=u){var k=o-u;if((v>7e3||S>24576)&&k>423){s=Xr(n,h,0,C,U,x,E,S,I,u-I,s),S=v=E=0,I=u;for(var O=0;O<286;++O)U[O]=0;for(var O=0;O<30;++O)x[O]=0;}var H=2,N=0,Q=c,W=B-G&32767;if(k>2&&Z==D(u-W))for(var d=Math.min(y,k)-1,_=Math.min(32767,u),j=Math.min(258,k);W<=_&&--Q&&B!=G;){if(n[u+H]==n[u+H-W]){for(var q=0;q<j&&n[u+q]==n[u+q-W];++q);if(q>H){if(H=q,N=W,q>d)break;for(var Tr=Math.min(W,q-2),Dr=0,O=0;O<Tr;++O){var hr=u-W+O+32768&32767,_n=w[hr],vn=hr-_n+32768&32767;vn>Dr&&(Dr=vn,G=hr);}}}B=G,G=w[B],W+=B-G+32768&32767;}if(N){C[S++]=268435456|Ir[H]<<18|Qr[N];var cn=Ir[H]&31,pn=Qr[N]&31;E+=ur[cn]+lr[pn],++U[257+cn],++x[pn],K=u+H,++v;}else C[S++]=n[u],++U[n[u]];}}s=Xr(n,h,a,C,U,x,E,S,I,u-I,s),!a&&s&7&&(s=Sr(h,s+1,er));}return $(f,0,e+Cr(s)+i)},Fn=function(){for(var n=new nr(256),r=0;r<256;++r){for(var t=r,e=9;--e;)t=(t&1&&3988292384)^t>>>1;n[r]=t;}return n}(),gr=function(){var n=-1;return {p:function(r){for(var t=n,e=0;e<r.length;++e)t=Fn[t&255^r[e]]^t>>>8;n=t;},d:function(){return ~n}}},$r=function(){var n=1,r=0;return {p:function(t){for(var e=n,i=r,a=t.length,o=0;o!=a;){for(var f=Math.min(o+2655,a);o<f;++o)i+=e+=t[o];e=(e&65535)+15*(e>>16),i=(i&65535)+15*(i>>16);}n=e,r=i;},d:function(){return n%=65521,r%=65521,(n>>>8<<16|(r&255)<<8|r>>>8)+((n&255)<<23)*2}}},sr=function(n,r,t,e,i){return Cn(n,r.level==null?6:r.level,r.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):12+r.mem,t,e,!i)},Zr=function(n,r){var t={};for(var e in n)t[e]=n[e];for(var e in r)t[e]=r[e];return t},Sn=function(n,r,t){for(var e=n(),i=n.toString(),a=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/ /g,"").split(","),o=0;o<e.length;++o){var f=e[o],h=a[o];if(typeof f=="function"){r+=";"+h+"=";var s=f.toString();if(f.prototype)if(s.indexOf("[native code]")!=-1){var u=s.indexOf(" ",8)+1;r+=s.slice(u,s.indexOf("(",u));}else {r+=s;for(var l in f.prototype)r+=";"+h+".prototype."+l+"="+f.prototype[l].toString();}else r+=s;}else t[h]=f;}return [r,t]},Rr=[],rt=function(n){var r=[];for(var t in n)(n[t]instanceof A||n[t]instanceof R||n[t]instanceof nr)&&r.push((n[t]=new n[t].constructor(n[t])).buffer);return r},Zn=function(n,r,t,e){var i;if(!Rr[t]){for(var a="",o={},f=n.length-1,h=0;h<f;++h)i=Sn(n[h],a,o),a=i[0],o=i[1];Rr[t]=Sn(n[f],a,o);}var s=Zr({},Rr[t][1]);return bn(Rr[t][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+r.toString()+"}",t,s,rt(s),e)},wr=function(){return [A,R,nr,ur,lr,Mr,Nr,zn,An,Mn,Ur,V,Gr,X,Or,Cr,$,Fr,xr,ar,Lr]},yr=function(){return [A,R,nr,ur,lr,Mr,Ir,Qr,xn,tr,Dn,vr,Ur,Un,er,V,b,cr,Er,Pr,Vr,pr,Sr,Xr,Cr,$,Cn,sr,kr,ar]},kn=function(){return [_r,rn,F,gr,Fn]},Bn=function(){return [br,Gn]},Tn=function(){return [nn,F,$r]},In=function(){return [On]},ar=function(n){return postMessage(n,[n.buffer])},Lr=function(n){return n&&n.size&&new A(n.size)},mr=function(n,r,t,e,i,a){var o=Zn(t,e,i,function(f,h){o.terminate(),a(f,h);});return o.postMessage([n,r],r.consume?[n.buffer]:[]),function(){o.terminate();}},L=function(n){return n.ondata=function(r,t){return postMessage([r,t],[r.buffer])},function(r){return n.push(r.data[0],r.data[1])}},zr=function(n,r,t,e,i){var a,o=Zn(n,e,i,function(f,h){f?(o.terminate(),r.ondata.call(r,f)):(h[1]&&o.terminate(),r.ondata.call(r,f,h[0],h[1]));});o.postMessage(t),r.push=function(f,h){if(a)throw "stream finished";if(!r.ondata)throw "no stream handler";o.postMessage([f,a=h],[f.buffer]);},r.terminate=function(){o.terminate();};},Y=function(n,r){return n[r]|n[r+1]<<8},P=function(n,r){return (n[r]|n[r+1]<<8|n[r+2]<<16)+(n[r+3]<<23)*2},dr=function(n,r){return P(n,r)|P(n,r)*4294967296},F=function(n,r,t){for(;t;++r)n[r]=t,t>>>=8;},_r=function(n,r){var t=r.filename;if(n[0]=31,n[1]=139,n[2]=8,n[8]=r.level<2?4:r.level==9?2:0,n[9]=3,r.mtime!=0&&F(n,4,Math.floor(new Date(r.mtime||Date.now())/1e3)),t){n[3]=8;for(var e=0;e<=t.length;++e)n[e+10]=t.charCodeAt(e);}},br=function(n){if(n[0]!=31||n[1]!=139||n[2]!=8)throw "invalid gzip data";var r=n[3],t=10;r&4&&(t+=n[10]|(n[11]<<8)+2);for(var e=(r>>3&1)+(r>>4&1);e>0;e-=!n[t++]);return t+(r&2)},Gn=function(n){var r=n.length;return (n[r-4]|n[r-3]<<8|n[r-2]<<16)+2*(n[r-1]<<23)},rn=function(n){return 10+(n.filename&&n.filename.length+1||0)},nn=function(n,r){var t=r.level,e=t==0?0:t<6?1:t==9?3:2;n[0]=120,n[1]=e<<6|(e?32-2*e:1);},On=function(n){if((n[0]&15)!=8||n[0]>>>4>7||(n[0]<<8|n[1])%31)throw "invalid zlib data";if(n[1]&32)throw "invalid zlib data: preset dictionaries not supported"};function tn(n,r){return !r&&typeof n=="function"&&(r=n,n={}),this.ondata=r,n}var rr=function(){function n(r,t){!t&&typeof r=="function"&&(t=r,r={}),this.ondata=t,this.o=r||{};}return n.prototype.p=function(r,t){this.ondata(sr(r,this.o,0,0,!t),t);},n.prototype.push=function(r,t){if(this.d)throw "stream finished";if(!this.ondata)throw "no stream handler";this.d=t,this.p(r,t||!1);},n}(),En=function(){function n(r,t){zr([yr,function(){return [L,rr]}],this,tn.call(this,r,t),function(e){var i=new rr(e.data);onmessage=L(i);},6);}return n}();function Pn(n,r,t){if(t||(t=r,r={}),typeof t!="function")throw "no callback";return mr(n,r,[yr],function(e){return ar(kr(e.data[0],e.data[1]))},0,t)}function kr(n,r){return sr(n,r||{},0,0)}var J=function(){function n(r){this.s={},this.p=new A(0),this.ondata=r;}return n.prototype.e=function(r){if(this.d)throw "stream finished";if(!this.ondata)throw "no stream handler";var t=this.p.length,e=new A(t+r.length);e.set(this.p),e.set(r,t),this.p=e;},n.prototype.c=function(r){this.d=this.s.i=r||!1;var t=this.s.b,e=Fr(this.p,this.o,this.s);this.ondata($(e,t,this.s.b),this.d),this.o=$(e,this.s.b-32768),this.s.b=this.o.length,this.p=$(this.p,this.s.p/8|0),this.s.p&=7;},n.prototype.push=function(r,t){this.e(r),this.c(t);},n}(),en=function(){function n(r){this.ondata=r,zr([wr,function(){return [L,J]}],this,0,function(){var t=new J;onmessage=L(t);},7);}return n}();function an(n,r,t){if(t||(t=r,r={}),typeof t!="function")throw "no callback";return mr(n,r,[wr],function(e){return ar(xr(e.data[0],Lr(e.data[1])))},1,t)}function xr(n,r){return Fr(n,r)}var qr=function(){function n(r,t){this.c=gr(),this.l=0,this.v=1,rr.call(this,r,t);}return n.prototype.push=function(r,t){rr.prototype.push.call(this,r,t);},n.prototype.p=function(r,t){this.c.p(r),this.l+=r.length;var e=sr(r,this.o,this.v&&rn(this.o),t&&8,!t);this.v&&(_r(e,this.o),this.v=0),t&&(F(e,e.length-8,this.c.d()),F(e,e.length-4,this.l)),this.ondata(e,t);},n}(),Rn=function(){function n(r,t){zr([yr,kn,function(){return [L,rr,qr]}],this,tn.call(this,r,t),function(e){var i=new qr(e.data);onmessage=L(i);},8);}return n}();function qn(n,r,t){if(t||(t=r,r={}),typeof t!="function")throw "no callback";return mr(n,r,[yr,kn,function(){return [Hr]}],function(e){return ar(Hr(e.data[0],e.data[1]))},2,t)}function Hr(n,r){r||(r={});var t=gr(),e=n.length;t.p(n);var i=sr(n,r,rn(r),8),a=i.length;return _r(i,r),F(i,a-8,t.d()),F(i,a-4,e),i}var Wr=function(){function n(r){this.v=1,J.call(this,r);}return n.prototype.push=function(r,t){if(J.prototype.e.call(this,r),this.v){var e=this.p.length>3?br(this.p):4;if(e>=this.p.length&&!t)return;this.p=this.p.subarray(e),this.v=0;}if(t){if(this.p.length<8)throw "invalid gzip stream";this.p=this.p.subarray(0,-8);}J.prototype.c.call(this,t);},n}(),Hn=function(){function n(r){this.ondata=r,zr([wr,Bn,function(){return [L,J,Wr]}],this,0,function(){var t=new Wr;onmessage=L(t);},9);}return n}();function Wn(n,r,t){if(t||(t=r,r={}),typeof t!="function")throw "no callback";return mr(n,r,[wr,Bn,function(){return [Yr]}],function(e){return ar(Yr(e.data[0]))},3,t)}function Yr(n,r){return Fr(n.subarray(br(n),-8),r||new A(Gn(n)))}var on=function(){function n(r,t){this.c=$r(),this.v=1,rr.call(this,r,t);}return n.prototype.push=function(r,t){rr.prototype.push.call(this,r,t);},n.prototype.p=function(r,t){this.c.p(r);var e=sr(r,this.o,this.v&&2,t&&4,!t);this.v&&(nn(e,this.o),this.v=0),t&&F(e,e.length-4,this.c.d()),this.ondata(e,t);},n}(),nt=function(){function n(r,t){zr([yr,Tn,function(){return [L,rr,on]}],this,tn.call(this,r,t),function(e){var i=new on(e.data);onmessage=L(i);},10);}return n}();function tt(n,r,t){if(t||(t=r,r={}),typeof t!="function")throw "no callback";return mr(n,r,[yr,Tn,function(){return [fn]}],function(e){return ar(fn(e.data[0],e.data[1]))},4,t)}function fn(n,r){r||(r={});var t=$r();t.p(n);var e=sr(n,r,2,4);return nn(e,r),F(e,e.length-4,t.d()),e}var jr=function(){function n(r){this.v=1,J.call(this,r);}return n.prototype.push=function(r,t){if(J.prototype.e.call(this,r),this.v){if(this.p.length<2&&!t)return;this.p=this.p.subarray(2),this.v=0;}if(t){if(this.p.length<4)throw "invalid zlib stream";this.p=this.p.subarray(0,-4);}J.prototype.c.call(this,t);},n}(),Yn=function(){function n(r){this.ondata=r,zr([wr,In,function(){return [L,J,jr]}],this,0,function(){var t=new jr;onmessage=L(t);},11);}return n}();function jn(n,r,t){if(t||(t=r,r={}),typeof t!="function")throw "no callback";return mr(n,r,[wr,In,function(){return [Jr]}],function(e){return ar(Jr(e.data[0],Lr(e.data[1])))},5,t)}function Jr(n,r){return Fr((On(n),n.subarray(2,-4)),r)}var Jn=function(){function n(r){this.G=Wr,this.I=J,this.Z=jr,this.ondata=r;}return n.prototype.push=function(r,t){if(!this.ondata)throw "no stream handler";if(this.s)this.s.push(r,t);else {if(this.p&&this.p.length){var e=new A(this.p.length+r.length);e.set(this.p),e.set(r,this.p.length);}else this.p=r;if(this.p.length>2){var i=this,a=function(){i.ondata.apply(i,arguments);};this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(a):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(a):new this.Z(a),this.s.push(this.p,t),this.p=null;}}},n}(),et=function(){function n(r){this.G=Hn,this.I=en,this.Z=Yn,this.ondata=r;}return n.prototype.push=function(r,t){Jn.prototype.push.call(this,r,t);},n}();function it(n,r,t){if(t||(t=r,r={}),typeof t!="function")throw "no callback";return n[0]==31&&n[1]==139&&n[2]==8?Wn(n,r,t):(n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31?an(n,r,t):jn(n,r,t)}function at(n,r){return n[0]==31&&n[1]==139&&n[2]==8?Yr(n,r):(n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31?xr(n,r):Jr(n,r)}var sn=function(n,r,t,e){for(var i in n){var a=n[i],o=r+i;a instanceof A?t[o]=[a,e]:Array.isArray(a)?t[o]=[a[0],Zr(e,a[1])]:sn(a,o+"/",t,e);}},Kn=typeof TextEncoder!="undefined"&&new TextEncoder,hn=typeof TextDecoder!="undefined"&&new TextDecoder,Nn=0;try{hn.decode(er,{stream:!0}),Nn=1;}catch(n){}var Qn=function(n){for(var r="",t=0;;){var e=n[t++],i=(e>127)+(e>223)+(e>239);if(t+i>n.length)return [r,$(n,t-1)];i?i==3?(e=((e&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,r+=String.fromCharCode(55296|e>>10,56320|e&1023)):i&1?r+=String.fromCharCode((e&31)<<6|n[t++]&63):r+=String.fromCharCode((e&15)<<12|(n[t++]&63)<<6|n[t++]&63):r+=String.fromCharCode(e);}},ot=function(){function n(r){this.ondata=r,Nn?this.t=new TextDecoder:this.p=er;}return n.prototype.push=function(r,t){if(!this.ondata)throw "no callback";if(t||(t=!1),this.t)return this.ondata(this.t.decode(r,{stream:!t}),t);var e=new A(this.p.length+r.length);e.set(this.p),e.set(r,this.p.length);var i=Qn(e),a=i[0],o=i[1];if(t&&o.length)throw "invalid utf-8 data";this.p=o,this.ondata(a,t);},n}(),ft=function(){function n(r){this.ondata=r;}return n.prototype.push=function(r,t){if(!this.ondata)throw "no callback";this.ondata(or(r),t||!1);},n}();function or(n,r){if(r){for(var t=new A(n.length),e=0;e<n.length;++e)t[e]=n.charCodeAt(e);return t}if(Kn)return Kn.encode(n);for(var i=n.length,a=new A(n.length+(n.length>>1)),o=0,f=function(u){a[o++]=u;},e=0;e<i;++e){if(o+5>a.length){var h=new A(o+8+(i-e<<1));h.set(a),a=h;}var s=n.charCodeAt(e);s<128||r?f(s):s<2048?(f(192|s>>>6),f(128|s&63)):s>55295&&s<57344?(s=65536+(s&1023<<10)|n.charCodeAt(++e)&1023,f(240|s>>>18),f(128|s>>>12&63),f(128|s>>>6&63),f(128|s&63)):(f(224|s>>>12),f(128|s>>>6&63),f(128|s&63));}return $(a,0,o)}function un(n,r){if(r){for(var t="",e=0;e<n.length;e+=16384)t+=String.fromCharCode.apply(null,n.subarray(e,e+16384));return t}else {if(hn)return hn.decode(n);var i=Qn(n),a=i[0],o=i[1];if(o.length)throw "invalid utf-8 data";return a}}var Vn=function(n){return n==1?3:n<6?2:n==9?1:0},Xn=function(n,r){return r+30+Y(n,r+26)+Y(n,r+28)},$n=function(n,r,t){var e=Y(n,r+28),i=un(n.subarray(r+46,r+46+e),!(Y(n,r+8)&2048)),a=r+46+e,o=P(n,r+20),f=t&&o==4294967295?Ln(n,a):[o,P(n,r+24),P(n,r+42)],h=f[0],s=f[1],u=f[2];return [Y(n,r+10),h,s,i,a+Y(n,r+30)+Y(n,r+32),u]},Ln=function(n,r){for(;Y(n,r)!=1;r+=4+Y(n,r+2));return [dr(n,r+12),dr(n,r+4),dr(n,r+20)]},fr=function(n){var r=0;if(n)for(var t in n){var e=n[t].length;if(e>65535)throw "extra field too long";r+=e+4;}return r},Ar=function(n,r,t,e,i,a,o,f){var h=e.length,s=t.extra,u=f&&f.length,l=fr(s);F(n,r,o!=null?33639248:67324752),r+=4,o!=null&&(n[r++]=20,n[r++]=t.os),n[r]=20,r+=2,n[r++]=t.flag<<1|(a==null&&8),n[r++]=i&&8,n[r++]=t.compression&255,n[r++]=t.compression>>8;var p=new Date(t.mtime==null?Date.now():t.mtime),y=p.getFullYear()-1980;if(y<0||y>119)throw "date not in range 1980-2099";if(F(n,r,(y<<24)*2|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>>1),r+=4,a!=null&&(F(n,r,t.crc),F(n,r+4,a),F(n,r+8,t.size)),F(n,r+12,h),F(n,r+14,l),r+=16,o!=null&&(F(n,r,u),F(n,r+6,t.attrs),F(n,r+10,o),r+=14),n.set(e,r),r+=h,l)for(var c in s){var g=s[c],w=g.length;F(n,r,+c),F(n,r+2,w),n.set(g,r+4),r+=4+w;}return u&&(n.set(f,r),r+=u),r},ln=function(n,r,t,e,i){F(n,r,101010256),F(n,r+8,t),F(n,r+10,t),F(n,r+12,e),F(n,r+16,i);},Br=function(){function n(r){this.filename=r,this.c=gr(),this.size=0,this.compression=0;}return n.prototype.process=function(r,t){this.ondata(null,r,t);},n.prototype.push=function(r,t){if(!this.ondata)throw "no callback - add to ZIP archive before pushing";this.c.p(r),this.size+=r.length,t&&(this.crc=this.c.d()),this.process(r,t||!1);},n}(),st=function(){function n(r,t){var e=this;t||(t={}),Br.call(this,r),this.d=new rr(t,function(i,a){e.ondata(null,i,a);}),this.compression=8,this.flag=Vn(t.level);}return n.prototype.process=function(r,t){try{this.d.push(r,t);}catch(e){this.ondata(e,null,t);}},n.prototype.push=function(r,t){Br.prototype.push.call(this,r,t);},n}(),ht=function(){function n(r,t){var e=this;t||(t={}),Br.call(this,r),this.d=new En(t,function(i,a,o){e.ondata(i,a,o);}),this.compression=8,this.flag=Vn(t.level),this.terminate=this.d.terminate;}return n.prototype.process=function(r,t){this.d.push(r,t);},n.prototype.push=function(r,t){Br.prototype.push.call(this,r,t);},n}(),ut=function(){function n(r){this.ondata=r,this.u=[],this.d=1;}return n.prototype.add=function(r){var t=this;if(this.d&2)throw "stream finished";var e=or(r.filename),i=e.length,a=r.comment,o=a&&or(a),f=i!=r.filename.length||o&&a.length!=o.length,h=i+fr(r.extra)+30;if(i>65535)throw "filename too long";var s=new A(h);Ar(s,0,r,e,f);var u=[s],l=function(){for(var w=0,M=u;w<M.length;w++){var z=M[w];t.ondata(null,z,!1);}u=[];},p=this.d;this.d=0;var y=this.u.length,c=Zr(r,{f:e,u:f,o,t:function(){r.terminate&&r.terminate();},r:function(){if(l(),p){var w=t.u[y+1];w?w.r():t.d=1;}p=1;}}),g=0;r.ondata=function(w,M,z){if(w)t.ondata(w,M,z),t.terminate();else if(g+=M.length,u.push(M),z){var m=new A(16);F(m,0,134695760),F(m,4,r.crc),F(m,8,g),F(m,12,r.size),u.push(m),c.c=g,c.b=h+g+16,c.crc=r.crc,c.size=r.size,p&&c.r(),p=1;}else p&&l();},this.u.push(c);},n.prototype.end=function(){var r=this;if(this.d&2)throw this.d&1?"stream finishing":"stream finished";this.d?this.e():this.u.push({r:function(){if(!(r.d&1))return;r.u.splice(-1,1),r.e();},t:function(){}}),this.d=3;},n.prototype.e=function(){for(var r=0,t=0,e=0,i=0,a=this.u;i<a.length;i++){var o=a[i];e+=46+o.f.length+fr(o.extra)+(o.o?o.o.length:0);}for(var f=new A(e+22),h=0,s=this.u;h<s.length;h++){var o=s[h];Ar(f,r,o,o.f,o.u,o.c,t,o.o),r+=46+o.f.length+fr(o.extra)+(o.o?o.o.length:0),t+=o.b;}ln(f,r,this.u.length,e,t),this.ondata(null,f,!0),this.d=2;},n.prototype.terminate=function(){for(var r=0,t=this.u;r<t.length;r++){var e=t[r];e.t();}this.d=2;},n}();function lt(n,r,t){if(t||(t=r,r={}),typeof t!="function")throw "no callback";var e={};sn(n,"",e,r);var i=Object.keys(e),a=i.length,o=0,f=0,h=a,s=new Array(a),u=[],l=function(){for(var g=0;g<u.length;++g)u[g]();},p=function(){var g=new A(f+22),w=o,M=f-o;f=0;for(var z=0;z<h;++z){var m=s[z];try{var D=m.c.length;Ar(g,f,m,m.f,m.u,D);var C=30+m.f.length+fr(m.extra),U=f+C;g.set(m.c,U),Ar(g,o,m,m.f,m.u,D,f,m.m),o+=16+C+(m.m?m.m.length:0),f=U+D;}catch(x){return t(x,null)}}ln(g,o,s.length,M,w),t(null,g);};a||p();for(var y=function(g){var w=i[g],M=e[w],z=M[0],m=M[1],D=gr(),C=z.length;D.p(z);var U=or(w),x=U.length,v=m.comment,E=v&&or(v),S=E&&E.length,K=fr(m.extra),I=m.level==0?0:8,Z=function(B,G){if(B)l(),t(B,null);else {var k=G.length;s[g]=Zr(m,{size:C,crc:D.d(),c:G,f:U,m:E,u:x!=w.length||E&&v.length!=S,compression:I}),o+=30+x+K+k,f+=76+2*(x+K)+(S||0)+k,--a||p();}};if(x>65535&&Z("filename too long",null),!I)Z(null,z);else if(C<16e4)try{Z(null,kr(z,m));}catch(B){Z(B,null);}else u.push(Pn(z,m,Z));},c=0;c<h;++c)y(c);return l}function vt(n,r){r||(r={});var t={},e=[];sn(n,"",t,r);var i=0,a=0;for(var o in t){var f=t[o],h=f[0],s=f[1],u=s.level==0?0:8,l=or(o),p=l.length,y=s.comment,c=y&&or(y),g=c&&c.length,w=fr(s.extra);if(p>65535)throw "filename too long";var M=u?kr(h,s):h,z=M.length,m=gr();m.p(h),e.push(Zr(s,{size:h.length,crc:m.d(),c:M,f:l,m:c,u:p!=o.length||c&&y.length!=g,o:i,compression:u})),i+=30+p+w+z,a+=76+2*(p+w)+(g||0)+z;}for(var D=new A(a+22),C=i,U=a-i,x=0;x<e.length;++x){var l=e[x];Ar(D,l.o,l,l.f,l.u,l.c.length);var v=30+l.f.length+fr(l.extra);D.set(l.c,l.o+v),Ar(D,i,l,l.f,l.u,l.c.length,l.o,l.m),i+=16+v+(l.m?l.m.length:0);}return ln(D,i,e.length,U,C),D}var dn=function(){function n(){}return n.prototype.push=function(r,t){this.ondata(null,r,t);},n.compression=0,n}(),ct=function(){function n(){var r=this;this.i=new J(function(t,e){r.ondata(null,t,e);});}return n.prototype.push=function(r,t){try{this.i.push(r,t);}catch(e){this.ondata(e,r,t);}},n.compression=8,n}(),pt=function(){function n(r,t){var e=this;t<32e4?this.i=new J(function(i,a){e.ondata(null,i,a);}):(this.i=new en(function(i,a,o){e.ondata(i,a,o);}),this.terminate=this.i.terminate);}return n.prototype.push=function(r,t){this.i.terminate&&(r=$(r,0)),this.i.push(r,t);},n.compression=8,n}(),gt=function(){function n(r){this.onfile=r,this.k=[],this.o={0:dn},this.p=er;}return n.prototype.push=function(r,t){var e=this;if(!this.onfile)throw "no callback";if(this.c>0){var i=Math.min(this.c,r.length),a=r.subarray(0,i);if(this.c-=i,this.d?this.d.push(a,!this.c):this.k[0].push(a),r=r.subarray(i),r.length)return this.push(r,t)}else {var o=0,f=0,h=void 0,s=void 0;this.p.length?r.length?(s=new A(this.p.length+r.length),s.set(this.p),s.set(r,this.p.length)):s=this.p:s=r;for(var u=s.length,l=this.c,p=l&&this.d,y=function(){var M,z=P(s,f);if(z==67324752){o=1,h=f,c.d=null,c.c=0;var m=Y(s,f+6),D=Y(s,f+8),C=m&2048,U=m&8,x=Y(s,f+26),v=Y(s,f+28);if(u>f+30+x+v){var E=[];c.k.unshift(E),o=2;var S=P(s,f+18),K=P(s,f+22),I=un(s.subarray(f+30,f+=30+x),!C);S==4294967295?(M=U?[-2]:Ln(s,f),S=M[0],K=M[1]):U&&(S=-1),f+=v,c.c=S;var Z={name:I,compression:D,start:function(){if(!Z.ondata)throw "no callback";if(!S)Z.ondata(null,er,!0);else {var B=e.o[D];if(!B)throw "unknown compression type "+D;var G=S<0?new B(I):new B(I,S,K);G.ondata=function(N,Q,W){Z.ondata(N,Q,W);};for(var k=0,O=E;k<O.length;k++){var H=O[k];G.push(H,!1);}e.k[0]==E?e.d=G:G.push(er,!0);}},terminate:function(){e.k[0]==E&&e.d.terminate&&e.d.terminate();}};S>=0&&(Z.size=S,Z.originalSize=K),c.onfile(Z);}return "break"}else if(l){if(z==134695760)return h=f+=12+(l==-2&&8),o=2,c.c=0,"break";if(z==33639248)return h=f-=4,o=2,c.c=0,"break"}},c=this;f<u-4;++f){var g=y();if(g==="break")break}if(this.p=er,l<0){var w=o?s.subarray(0,h-12-(l==-2&&8)-(P(s,h-16)==134695760&&4)):s.subarray(0,f);p?p.push(w,!!o):this.k[+(o==2)].push(w);}if(o&2)return this.push(s.subarray(f),t);this.p=s.subarray(f);}if(t&&this.c)throw "invalid zip file"},n.prototype.register=function(r){this.o[r.compression]=r;},n}();function wt(n,r){if(typeof r!="function")throw "no callback";for(var t=[],e=function(){for(var p=0;p<t.length;++p)t[p]();},i={},a=n.length-22;P(n,a)!=101010256;--a)if(!a||n.length-a>65558){r("invalid zip file",null);return}var o=Y(n,a+8);o||r(null,{});var f=o,h=P(n,a+16),s=h==4294967295;if(s){if(a=P(n,a-12),P(n,a)!=101075792){r("invalid zip file",null);return}f=o=P(n,a+32),h=P(n,a+48);}for(var u=function(p){var y=$n(n,h,s),c=y[0],g=y[1],w=y[2],M=y[3],z=y[4],m=y[5],D=Xn(n,m);h=z;var C=function(x,v){x?(e(),r(x,null)):(i[M]=v,--o||r(null,i));};if(!c)C(null,$(n,D,D+g));else if(c==8){var U=n.subarray(D,D+g);if(g<32e4)try{C(null,xr(U,new A(w)));}catch(x){C(x,null);}else t.push(an(U,{size:w},C));}else C("unknown compression type "+c,null);},l=0;l<f;++l)u();return e}function yt(n){for(var r={},t=n.length-22;P(n,t)!=101010256;--t)if(!t||n.length-t>65558)throw "invalid zip file";var e=Y(n,t+8);if(!e)return {};var i=P(n,t+16),a=i==4294967295;if(a){if(t=P(n,t-12),P(n,t)!=101075792)throw "invalid zip file";e=P(n,t+32),i=P(n,t+48);}for(var o=0;o<e;++o){var f=$n(n,i,a),h=f[0],s=f[1],u=f[2],l=f[3],p=f[4],y=f[5],c=Xn(n,y);if(i=p,!h)r[l]=$(n,c,c+s);else if(h==8)r[l]=xr(n.subarray(c,c+s),new A(u));else throw "unknown compression type "+h}return r}var fflate_module_min = null;

var fflate = /*#__PURE__*/Object.freeze({
	__proto__: null,
	AsyncCompress: Rn,
	AsyncDecompress: et,
	AsyncDeflate: En,
	AsyncGunzip: Hn,
	AsyncGzip: Rn,
	AsyncInflate: en,
	AsyncUnzipInflate: pt,
	AsyncUnzlib: Yn,
	AsyncZipDeflate: ht,
	AsyncZlib: nt,
	Compress: qr,
	DecodeUTF8: ot,
	Decompress: Jn,
	Deflate: rr,
	EncodeUTF8: ft,
	Gunzip: Wr,
	Gzip: qr,
	Inflate: J,
	Unzip: gt,
	UnzipInflate: ct,
	UnzipPassThrough: dn,
	Unzlib: jr,
	Zip: ut,
	ZipDeflate: st,
	ZipPassThrough: Br,
	Zlib: on,
	compress: qn,
	compressSync: Hr,
	decompress: it,
	decompressSync: at,
	deflate: Pn,
	deflateSync: kr,
	gunzip: Wn,
	gunzipSync: Yr,
	gzip: qn,
	gzipSync: Hr,
	inflate: an,
	inflateSync: xr,
	strFromU8: un,
	strToU8: or,
	unzip: wt,
	unzipSync: yt,
	unzlib: jn,
	unzlibSync: Jr,
	zip: lt,
	zipSync: vt,
	zlib: tt,
	zlibSync: fn,
	'default': fflate_module_min
});

/**
 * NURBS utils
 *
 * See NURBSCurve and NURBSSurface.
 **/


/**************************************************************
 *	NURBS Utils
 **************************************************************/

var NURBSUtils = {

	/*
	Finds knot vector span.

	p : degree
	u : parametric value
	U : knot vector

	returns the span
	*/
	findSpan: function ( p, u, U ) {

		var n = U.length - p - 1;

		if ( u >= U[ n ] ) {

			return n - 1;

		}

		if ( u <= U[ p ] ) {

			return p;

		}

		var low = p;
		var high = n;
		var mid = Math.floor( ( low + high ) / 2 );

		while ( u < U[ mid ] || u >= U[ mid + 1 ] ) {

			if ( u < U[ mid ] ) {

				high = mid;

			} else {

				low = mid;

			}

			mid = Math.floor( ( low + high ) / 2 );

		}

		return mid;

	},


	/*
	Calculate basis functions. See The NURBS Book, page 70, algorithm A2.2

	span : span in which u lies
	u    : parametric point
	p    : degree
	U    : knot vector

	returns array[p+1] with basis functions values.
	*/
	calcBasisFunctions: function ( span, u, p, U ) {

		var N = [];
		var left = [];
		var right = [];
		N[ 0 ] = 1.0;

		for ( var j = 1; j <= p; ++ j ) {

			left[ j ] = u - U[ span + 1 - j ];
			right[ j ] = U[ span + j ] - u;

			var saved = 0.0;

			for ( var r = 0; r < j; ++ r ) {

				var rv = right[ r + 1 ];
				var lv = left[ j - r ];
				var temp = N[ r ] / ( rv + lv );
				N[ r ] = saved + rv * temp;
				saved = lv * temp;

			 }

			 N[ j ] = saved;

		 }

		 return N;

	},


	/*
	Calculate B-Spline curve points. See The NURBS Book, page 82, algorithm A3.1.

	p : degree of B-Spline
	U : knot vector
	P : control points (x, y, z, w)
	u : parametric point

	returns point for given u
	*/
	calcBSplinePoint: function ( p, U, P, u ) {

		var span = this.findSpan( p, u, U );
		var N = this.calcBasisFunctions( span, u, p, U );
		var C = new Vector4( 0, 0, 0, 0 );

		for ( var j = 0; j <= p; ++ j ) {

			var point = P[ span - p + j ];
			var Nj = N[ j ];
			var wNj = point.w * Nj;
			C.x += point.x * wNj;
			C.y += point.y * wNj;
			C.z += point.z * wNj;
			C.w += point.w * Nj;

		}

		return C;

	},


	/*
	Calculate basis functions derivatives. See The NURBS Book, page 72, algorithm A2.3.

	span : span in which u lies
	u    : parametric point
	p    : degree
	n    : number of derivatives to calculate
	U    : knot vector

	returns array[n+1][p+1] with basis functions derivatives
	*/
	calcBasisFunctionDerivatives: function ( span, u, p, n, U ) {

		var zeroArr = [];
		for ( var i = 0; i <= p; ++ i )
			zeroArr[ i ] = 0.0;

		var ders = [];
		for ( var i = 0; i <= n; ++ i )
			ders[ i ] = zeroArr.slice( 0 );

		var ndu = [];
		for ( var i = 0; i <= p; ++ i )
			ndu[ i ] = zeroArr.slice( 0 );

		ndu[ 0 ][ 0 ] = 1.0;

		var left = zeroArr.slice( 0 );
		var right = zeroArr.slice( 0 );

		for ( var j = 1; j <= p; ++ j ) {

			left[ j ] = u - U[ span + 1 - j ];
			right[ j ] = U[ span + j ] - u;

			var saved = 0.0;

			for ( var r = 0; r < j; ++ r ) {

				var rv = right[ r + 1 ];
				var lv = left[ j - r ];
				ndu[ j ][ r ] = rv + lv;

				var temp = ndu[ r ][ j - 1 ] / ndu[ j ][ r ];
				ndu[ r ][ j ] = saved + rv * temp;
				saved = lv * temp;

			}

			ndu[ j ][ j ] = saved;

		}

		for ( var j = 0; j <= p; ++ j ) {

			ders[ 0 ][ j ] = ndu[ j ][ p ];

		}

		for ( var r = 0; r <= p; ++ r ) {

			var s1 = 0;
			var s2 = 1;

			var a = [];
			for ( var i = 0; i <= p; ++ i ) {

				a[ i ] = zeroArr.slice( 0 );

			}

			a[ 0 ][ 0 ] = 1.0;

			for ( var k = 1; k <= n; ++ k ) {

				var d = 0.0;
				var rk = r - k;
				var pk = p - k;

				if ( r >= k ) {

					a[ s2 ][ 0 ] = a[ s1 ][ 0 ] / ndu[ pk + 1 ][ rk ];
					d = a[ s2 ][ 0 ] * ndu[ rk ][ pk ];

				}

				var j1 = ( rk >= - 1 ) ? 1 : - rk;
				var j2 = ( r - 1 <= pk ) ? k - 1 : p - r;

				for ( var j = j1; j <= j2; ++ j ) {

					a[ s2 ][ j ] = ( a[ s1 ][ j ] - a[ s1 ][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
					d += a[ s2 ][ j ] * ndu[ rk + j ][ pk ];

				}

				if ( r <= pk ) {

					a[ s2 ][ k ] = - a[ s1 ][ k - 1 ] / ndu[ pk + 1 ][ r ];
					d += a[ s2 ][ k ] * ndu[ r ][ pk ];

				}

				ders[ k ][ r ] = d;

				var j = s1;
				s1 = s2;
				s2 = j;

			}

		}

		var r = p;

		for ( var k = 1; k <= n; ++ k ) {

			for ( var j = 0; j <= p; ++ j ) {

				ders[ k ][ j ] *= r;

			}

			r *= p - k;

		}

		return ders;

	},


	/*
		Calculate derivatives of a B-Spline. See The NURBS Book, page 93, algorithm A3.2.

		p  : degree
		U  : knot vector
		P  : control points
		u  : Parametric points
		nd : number of derivatives

		returns array[d+1] with derivatives
		*/
	calcBSplineDerivatives: function ( p, U, P, u, nd ) {

		var du = nd < p ? nd : p;
		var CK = [];
		var span = this.findSpan( p, u, U );
		var nders = this.calcBasisFunctionDerivatives( span, u, p, du, U );
		var Pw = [];

		for ( var i = 0; i < P.length; ++ i ) {

			var point = P[ i ].clone();
			var w = point.w;

			point.x *= w;
			point.y *= w;
			point.z *= w;

			Pw[ i ] = point;

		}

		for ( var k = 0; k <= du; ++ k ) {

			var point = Pw[ span - p ].clone().multiplyScalar( nders[ k ][ 0 ] );

			for ( var j = 1; j <= p; ++ j ) {

				point.add( Pw[ span - p + j ].clone().multiplyScalar( nders[ k ][ j ] ) );

			}

			CK[ k ] = point;

		}

		for ( var k = du + 1; k <= nd + 1; ++ k ) {

			CK[ k ] = new Vector4( 0, 0, 0 );

		}

		return CK;

	},


	/*
	Calculate "K over I"

	returns k!/(i!(k-i)!)
	*/
	calcKoverI: function ( k, i ) {

		var nom = 1;

		for ( var j = 2; j <= k; ++ j ) {

			nom *= j;

		}

		var denom = 1;

		for ( var j = 2; j <= i; ++ j ) {

			denom *= j;

		}

		for ( var j = 2; j <= k - i; ++ j ) {

			denom *= j;

		}

		return nom / denom;

	},


	/*
	Calculate derivatives (0-nd) of rational curve. See The NURBS Book, page 127, algorithm A4.2.

	Pders : result of function calcBSplineDerivatives

	returns array with derivatives for rational curve.
	*/
	calcRationalCurveDerivatives: function ( Pders ) {

		var nd = Pders.length;
		var Aders = [];
		var wders = [];

		for ( var i = 0; i < nd; ++ i ) {

			var point = Pders[ i ];
			Aders[ i ] = new Vector3( point.x, point.y, point.z );
			wders[ i ] = point.w;

		}

		var CK = [];

		for ( var k = 0; k < nd; ++ k ) {

			var v = Aders[ k ].clone();

			for ( var i = 1; i <= k; ++ i ) {

				v.sub( CK[ k - i ].clone().multiplyScalar( this.calcKoverI( k, i ) * wders[ i ] ) );

			}

			CK[ k ] = v.divideScalar( wders[ 0 ] );

		}

		return CK;

	},


	/*
	Calculate NURBS curve derivatives. See The NURBS Book, page 127, algorithm A4.2.

	p  : degree
	U  : knot vector
	P  : control points in homogeneous space
	u  : parametric points
	nd : number of derivatives

	returns array with derivatives.
	*/
	calcNURBSDerivatives: function ( p, U, P, u, nd ) {

		var Pders = this.calcBSplineDerivatives( p, U, P, u, nd );
		return this.calcRationalCurveDerivatives( Pders );

	},


	/*
	Calculate rational B-Spline surface point. See The NURBS Book, page 134, algorithm A4.3.

	p1, p2 : degrees of B-Spline surface
	U1, U2 : knot vectors
	P      : control points (x, y, z, w)
	u, v   : parametric values

	returns point for given (u, v)
	*/
	calcSurfacePoint: function ( p, q, U, V, P, u, v, target ) {

		var uspan = this.findSpan( p, u, U );
		var vspan = this.findSpan( q, v, V );
		var Nu = this.calcBasisFunctions( uspan, u, p, U );
		var Nv = this.calcBasisFunctions( vspan, v, q, V );
		var temp = [];

		for ( var l = 0; l <= q; ++ l ) {

			temp[ l ] = new Vector4( 0, 0, 0, 0 );
			for ( var k = 0; k <= p; ++ k ) {

				var point = P[ uspan - p + k ][ vspan - q + l ].clone();
				var w = point.w;
				point.x *= w;
				point.y *= w;
				point.z *= w;
				temp[ l ].add( point.multiplyScalar( Nu[ k ] ) );

			}

		}

		var Sw = new Vector4( 0, 0, 0, 0 );
		for ( var l = 0; l <= q; ++ l ) {

			Sw.add( temp[ l ].multiplyScalar( Nv[ l ] ) );

		}

		Sw.divideScalar( Sw.w );
		target.set( Sw.x, Sw.y, Sw.z );

	}

};

/**
 * NURBS curve object
 *
 * Derives from Curve, overriding getPoint and getTangent.
 *
 * Implementation is based on (x, y [, z=0 [, w=1]]) control points with w=weight.
 *
 **/

var NURBSCurve = function ( degree, knots /* array of reals */, controlPoints /* array of Vector(2|3|4) */, startKnot /* index in knots */, endKnot /* index in knots */ ) {

	Curve.call( this );

	this.degree = degree;
	this.knots = knots;
	this.controlPoints = [];
	// Used by periodic NURBS to remove hidden spans
	this.startKnot = startKnot || 0;
	this.endKnot = endKnot || ( this.knots.length - 1 );
	for ( var i = 0; i < controlPoints.length; ++ i ) {

		// ensure Vector4 for control points
		var point = controlPoints[ i ];
		this.controlPoints[ i ] = new Vector4( point.x, point.y, point.z, point.w );

	}

};


NURBSCurve.prototype = Object.create( Curve.prototype );
NURBSCurve.prototype.constructor = NURBSCurve;


NURBSCurve.prototype.getPoint = function ( t, optionalTarget ) {

	var point = optionalTarget || new Vector3();

	var u = this.knots[ this.startKnot ] + t * ( this.knots[ this.endKnot ] - this.knots[ this.startKnot ] ); // linear mapping t->u

	// following results in (wx, wy, wz, w) homogeneous point
	var hpoint = NURBSUtils.calcBSplinePoint( this.degree, this.knots, this.controlPoints, u );

	if ( hpoint.w != 1.0 ) {

		// project to 3D space: (wx, wy, wz, w) -> (x, y, z, 1)
		hpoint.divideScalar( hpoint.w );

	}

	return point.set( hpoint.x, hpoint.y, hpoint.z );

};


NURBSCurve.prototype.getTangent = function ( t, optionalTarget ) {

	var tangent = optionalTarget || new Vector3();

	var u = this.knots[ 0 ] + t * ( this.knots[ this.knots.length - 1 ] - this.knots[ 0 ] );
	var ders = NURBSUtils.calcNURBSDerivatives( this.degree, this.knots, this.controlPoints, u, 1 );
	tangent.copy( ders[ 1 ] ).normalize();

	return tangent;

};

/**
 * Loader loads FBX file and generates Group representing FBX scene.
 * Requires FBX file to be >= 7.0 and in ASCII or >= 6400 in Binary format
 * Versions lower than this may load but will probably have errors
 *
 * Needs Support:
 *  Morph normals / blend shape normals
 *
 * FBX format references:
 * 	https://wiki.blender.org/index.php/User:Mont29/Foundation/FBX_File_Structure
 * 	http://help.autodesk.com/view/FBX/2017/ENU/?guid=__cpp_ref_index_html (C++ SDK reference)
 *
 * 	Binary format specification:
 *		https://code.blender.org/2013/08/fbx-binary-file-format-specification/
 */


var FBXLoader = ( function () {

	var fbxTree;
	var connections;
	var sceneGraph;

	function FBXLoader( manager ) {

		Loader.call( this, manager );

	}

	FBXLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

		constructor: FBXLoader,

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var path = ( scope.path === '' ) ? LoaderUtils.extractUrlBase( url ) : scope.path;

			var loader = new FileLoader( this.manager );
			loader.setPath( scope.path );
			loader.setResponseType( 'arraybuffer' );
			loader.setRequestHeader( scope.requestHeader );
			loader.setWithCredentials( scope.withCredentials );

			loader.load( url, function ( buffer ) {

				try {

					onLoad( scope.parse( buffer, path ) );

				} catch ( e ) {

					if ( onError ) {

						onError( e );

					} else {

						console.error( e );

					}

					scope.manager.itemError( url );

				}

			}, onProgress, onError );

		},

		parse: function ( FBXBuffer, path ) {

			if ( isFbxFormatBinary( FBXBuffer ) ) {

				fbxTree = new BinaryParser().parse( FBXBuffer );

			} else {

				var FBXText = convertArrayBufferToString( FBXBuffer );

				if ( ! isFbxFormatASCII( FBXText ) ) {

					throw new Error( 'THREE.FBXLoader: Unknown format.' );

				}

				if ( getFbxVersion( FBXText ) < 7000 ) {

					throw new Error( 'THREE.FBXLoader: FBX version not supported, FileVersion: ' + getFbxVersion( FBXText ) );

				}

				fbxTree = new TextParser().parse( FBXText );

			}

			// console.log( fbxTree );

			var textureLoader = new TextureLoader( this.manager ).setPath( this.resourcePath || path ).setCrossOrigin( this.crossOrigin );

			return new FBXTreeParser( textureLoader, this.manager ).parse( fbxTree );

		}

	} );

	// Parse the FBXTree object returned by the BinaryParser or TextParser and return a Group
	function FBXTreeParser( textureLoader, manager ) {

		this.textureLoader = textureLoader;
		this.manager = manager;

	}

	FBXTreeParser.prototype = {

		constructor: FBXTreeParser,

		parse: function () {

			connections = this.parseConnections();

			var images = this.parseImages();
			var textures = this.parseTextures( images );
			var materials = this.parseMaterials( textures );
			var deformers = this.parseDeformers();
			var geometryMap = new GeometryParser().parse( deformers );

			this.parseScene( deformers, geometryMap, materials );

			return sceneGraph;

		},

		// Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
		// and details the connection type
		parseConnections: function () {

			var connectionMap = new Map();

			if ( 'Connections' in fbxTree ) {

				var rawConnections = fbxTree.Connections.connections;

				rawConnections.forEach( function ( rawConnection ) {

					var fromID = rawConnection[ 0 ];
					var toID = rawConnection[ 1 ];
					var relationship = rawConnection[ 2 ];

					if ( ! connectionMap.has( fromID ) ) {

						connectionMap.set( fromID, {
							parents: [],
							children: []
						} );

					}

					var parentRelationship = { ID: toID, relationship: relationship };
					connectionMap.get( fromID ).parents.push( parentRelationship );

					if ( ! connectionMap.has( toID ) ) {

						connectionMap.set( toID, {
							parents: [],
							children: []
						} );

					}

					var childRelationship = { ID: fromID, relationship: relationship };
					connectionMap.get( toID ).children.push( childRelationship );

				} );

			}

			return connectionMap;

		},

		// Parse FBXTree.Objects.Video for embedded image data
		// These images are connected to textures in FBXTree.Objects.Textures
		// via FBXTree.Connections.
		parseImages: function () {

			var images = {};
			var blobs = {};

			if ( 'Video' in fbxTree.Objects ) {

				var videoNodes = fbxTree.Objects.Video;

				for ( var nodeID in videoNodes ) {

					var videoNode = videoNodes[ nodeID ];

					var id = parseInt( nodeID );

					images[ id ] = videoNode.RelativeFilename || videoNode.Filename;

					// raw image data is in videoNode.Content
					if ( 'Content' in videoNode ) {

						var arrayBufferContent = ( videoNode.Content instanceof ArrayBuffer ) && ( videoNode.Content.byteLength > 0 );
						var base64Content = ( typeof videoNode.Content === 'string' ) && ( videoNode.Content !== '' );

						if ( arrayBufferContent || base64Content ) {

							var image = this.parseImage( videoNodes[ nodeID ] );

							blobs[ videoNode.RelativeFilename || videoNode.Filename ] = image;

						}

					}

				}

			}

			for ( var id in images ) {

				var filename = images[ id ];

				if ( blobs[ filename ] !== undefined ) images[ id ] = blobs[ filename ];
				else images[ id ] = images[ id ].split( '\\' ).pop();

			}

			return images;

		},

		// Parse embedded image data in FBXTree.Video.Content
		parseImage: function ( videoNode ) {

			var content = videoNode.Content;
			var fileName = videoNode.RelativeFilename || videoNode.Filename;
			var extension = fileName.slice( fileName.lastIndexOf( '.' ) + 1 ).toLowerCase();

			var type;

			switch ( extension ) {

				case 'bmp':

					type = 'image/bmp';
					break;

				case 'jpg':
				case 'jpeg':

					type = 'image/jpeg';
					break;

				case 'png':

					type = 'image/png';
					break;

				case 'tif':

					type = 'image/tiff';
					break;

				case 'tga':

					if ( this.manager.getHandler( '.tga' ) === null ) {

						console.warn( 'FBXLoader: TGA loader not found, skipping ', fileName );

					}

					type = 'image/tga';
					break;

				default:

					console.warn( 'FBXLoader: Image type "' + extension + '" is not supported.' );
					return;

			}

			if ( typeof content === 'string' ) { // ASCII format

				return 'data:' + type + ';base64,' + content;

			} else { // Binary Format

				var array = new Uint8Array( content );
				return window.URL.createObjectURL( new Blob( [ array ], { type: type } ) );

			}

		},

		// Parse nodes in FBXTree.Objects.Texture
		// These contain details such as UV scaling, cropping, rotation etc and are connected
		// to images in FBXTree.Objects.Video
		parseTextures: function ( images ) {

			var textureMap = new Map();

			if ( 'Texture' in fbxTree.Objects ) {

				var textureNodes = fbxTree.Objects.Texture;
				for ( var nodeID in textureNodes ) {

					var texture = this.parseTexture( textureNodes[ nodeID ], images );
					textureMap.set( parseInt( nodeID ), texture );

				}

			}

			return textureMap;

		},

		// Parse individual node in FBXTree.Objects.Texture
		parseTexture: function ( textureNode, images ) {

			var texture = this.loadTexture( textureNode, images );

			texture.ID = textureNode.id;

			texture.name = textureNode.attrName;

			var wrapModeU = textureNode.WrapModeU;
			var wrapModeV = textureNode.WrapModeV;

			var valueU = wrapModeU !== undefined ? wrapModeU.value : 0;
			var valueV = wrapModeV !== undefined ? wrapModeV.value : 0;

			// http://download.autodesk.com/us/fbx/SDKdocs/FBX_SDK_Help/files/fbxsdkref/class_k_fbx_texture.html#889640e63e2e681259ea81061b85143a
			// 0: repeat(default), 1: clamp

			texture.wrapS = valueU === 0 ? RepeatWrapping : ClampToEdgeWrapping;
			texture.wrapT = valueV === 0 ? RepeatWrapping : ClampToEdgeWrapping;

			if ( 'Scaling' in textureNode ) {

				var values = textureNode.Scaling.value;

				texture.repeat.x = values[ 0 ];
				texture.repeat.y = values[ 1 ];

			}

			return texture;

		},

		// load a texture specified as a blob or data URI, or via an external URL using TextureLoader
		loadTexture: function ( textureNode, images ) {

			var fileName;

			var currentPath = this.textureLoader.path;

			var children = connections.get( textureNode.id ).children;

			if ( children !== undefined && children.length > 0 && images[ children[ 0 ].ID ] !== undefined ) {

				fileName = images[ children[ 0 ].ID ];

				if ( fileName.indexOf( 'blob:' ) === 0 || fileName.indexOf( 'data:' ) === 0 ) {

					this.textureLoader.setPath( undefined );

				}

			}

			var texture;

			var extension = textureNode.FileName.slice( - 3 ).toLowerCase();

			if ( extension === 'tga' ) {

				var loader = this.manager.getHandler( '.tga' );

				if ( loader === null ) {

					console.warn( 'FBXLoader: TGA loader not found, creating placeholder texture for', textureNode.RelativeFilename );
					texture = new Texture();

				} else {

					texture = loader.load( fileName );

				}

			} else if ( extension === 'psd' ) {

				console.warn( 'FBXLoader: PSD textures are not supported, creating placeholder texture for', textureNode.RelativeFilename );
				texture = new Texture();

			} else {

				texture = this.textureLoader.load( fileName );

			}

			this.textureLoader.setPath( currentPath );

			return texture;

		},

		// Parse nodes in FBXTree.Objects.Material
		parseMaterials: function ( textureMap ) {

			var materialMap = new Map();

			if ( 'Material' in fbxTree.Objects ) {

				var materialNodes = fbxTree.Objects.Material;

				for ( var nodeID in materialNodes ) {

					var material = this.parseMaterial( materialNodes[ nodeID ], textureMap );

					if ( material !== null ) materialMap.set( parseInt( nodeID ), material );

				}

			}

			return materialMap;

		},

		// Parse single node in FBXTree.Objects.Material
		// Materials are connected to texture maps in FBXTree.Objects.Textures
		// FBX format currently only supports Lambert and Phong shading models
		parseMaterial: function ( materialNode, textureMap ) {

			var ID = materialNode.id;
			var name = materialNode.attrName;
			var type = materialNode.ShadingModel;

			// Case where FBX wraps shading model in property object.
			if ( typeof type === 'object' ) {

				type = type.value;

			}

			// Ignore unused materials which don't have any connections.
			if ( ! connections.has( ID ) ) return null;

			var parameters = this.parseParameters( materialNode, textureMap, ID );

			var material;

			switch ( type.toLowerCase() ) {

				case 'phong':
					material = new MeshPhongMaterial();
					break;
				case 'lambert':
					material = new MeshLambertMaterial();
					break;
				default:
					console.warn( 'THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', type );
					material = new MeshPhongMaterial();
					break;

			}

			material.setValues( parameters );
			material.name = name;

			return material;

		},

		// Parse FBX material and return parameters suitable for a three.js material
		// Also parse the texture map and return any textures associated with the material
		parseParameters: function ( materialNode, textureMap, ID ) {

			var parameters = {};

			if ( materialNode.BumpFactor ) {

				parameters.bumpScale = materialNode.BumpFactor.value;

			}

			if ( materialNode.Diffuse ) {

				parameters.color = new Color().fromArray( materialNode.Diffuse.value );

			} else if ( materialNode.DiffuseColor && ( materialNode.DiffuseColor.type === 'Color' || materialNode.DiffuseColor.type === 'ColorRGB' ) ) {

				// The blender exporter exports diffuse here instead of in materialNode.Diffuse
				parameters.color = new Color().fromArray( materialNode.DiffuseColor.value );

			}

			if ( materialNode.DisplacementFactor ) {

				parameters.displacementScale = materialNode.DisplacementFactor.value;

			}

			if ( materialNode.Emissive ) {

				parameters.emissive = new Color().fromArray( materialNode.Emissive.value );

			} else if ( materialNode.EmissiveColor && ( materialNode.EmissiveColor.type === 'Color' || materialNode.EmissiveColor.type === 'ColorRGB' ) ) {

				// The blender exporter exports emissive color here instead of in materialNode.Emissive
				parameters.emissive = new Color().fromArray( materialNode.EmissiveColor.value );

			}

			if ( materialNode.EmissiveFactor ) {

				parameters.emissiveIntensity = parseFloat( materialNode.EmissiveFactor.value );

			}

			if ( materialNode.Opacity ) {

				parameters.opacity = parseFloat( materialNode.Opacity.value );

			}

			if ( parameters.opacity < 1.0 ) {

				parameters.transparent = true;

			}

			if ( materialNode.ReflectionFactor ) {

				parameters.reflectivity = materialNode.ReflectionFactor.value;

			}

			if ( materialNode.Shininess ) {

				parameters.shininess = materialNode.Shininess.value;

			}

			if ( materialNode.Specular ) {

				parameters.specular = new Color().fromArray( materialNode.Specular.value );

			} else if ( materialNode.SpecularColor && materialNode.SpecularColor.type === 'Color' ) {

				// The blender exporter exports specular color here instead of in materialNode.Specular
				parameters.specular = new Color().fromArray( materialNode.SpecularColor.value );

			}

			var scope = this;
			connections.get( ID ).children.forEach( function ( child ) {

				var type = child.relationship;

				switch ( type ) {

					case 'Bump':
						parameters.bumpMap = scope.getTexture( textureMap, child.ID );
						break;

					case 'Maya|TEX_ao_map':
						parameters.aoMap = scope.getTexture( textureMap, child.ID );
						break;

					case 'DiffuseColor':
					case 'Maya|TEX_color_map':
						parameters.map = scope.getTexture( textureMap, child.ID );
						parameters.map.encoding = sRGBEncoding;
						break;

					case 'DisplacementColor':
						parameters.displacementMap = scope.getTexture( textureMap, child.ID );
						break;

					case 'EmissiveColor':
						parameters.emissiveMap = scope.getTexture( textureMap, child.ID );
						parameters.emissiveMap.encoding = sRGBEncoding;
						break;

					case 'NormalMap':
					case 'Maya|TEX_normal_map':
						parameters.normalMap = scope.getTexture( textureMap, child.ID );
						break;

					case 'ReflectionColor':
						parameters.envMap = scope.getTexture( textureMap, child.ID );
						parameters.envMap.mapping = EquirectangularReflectionMapping;
						parameters.envMap.encoding = sRGBEncoding;
						break;

					case 'SpecularColor':
						parameters.specularMap = scope.getTexture( textureMap, child.ID );
						parameters.specularMap.encoding = sRGBEncoding;
						break;

					case 'TransparentColor':
					case 'TransparencyFactor':
						parameters.alphaMap = scope.getTexture( textureMap, child.ID );
						parameters.transparent = true;
						break;

					case 'AmbientColor':
					case 'ShininessExponent': // AKA glossiness map
					case 'SpecularFactor': // AKA specularLevel
					case 'VectorDisplacementColor': // NOTE: Seems to be a copy of DisplacementColor
					default:
						console.warn( 'THREE.FBXLoader: %s map is not supported in three.js, skipping texture.', type );
						break;

				}

			} );

			return parameters;

		},

		// get a texture from the textureMap for use by a material.
		getTexture: function ( textureMap, id ) {

			// if the texture is a layered texture, just use the first layer and issue a warning
			if ( 'LayeredTexture' in fbxTree.Objects && id in fbxTree.Objects.LayeredTexture ) {

				console.warn( 'THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer.' );
				id = connections.get( id ).children[ 0 ].ID;

			}

			return textureMap.get( id );

		},

		// Parse nodes in FBXTree.Objects.Deformer
		// Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
		// Generates map of Skeleton-like objects for use later when generating and binding skeletons.
		parseDeformers: function () {

			var skeletons = {};
			var morphTargets = {};

			if ( 'Deformer' in fbxTree.Objects ) {

				var DeformerNodes = fbxTree.Objects.Deformer;

				for ( var nodeID in DeformerNodes ) {

					var deformerNode = DeformerNodes[ nodeID ];

					var relationships = connections.get( parseInt( nodeID ) );

					if ( deformerNode.attrType === 'Skin' ) {

						var skeleton = this.parseSkeleton( relationships, DeformerNodes );
						skeleton.ID = nodeID;

						if ( relationships.parents.length > 1 ) console.warn( 'THREE.FBXLoader: skeleton attached to more than one geometry is not supported.' );
						skeleton.geometryID = relationships.parents[ 0 ].ID;

						skeletons[ nodeID ] = skeleton;

					} else if ( deformerNode.attrType === 'BlendShape' ) {

						var morphTarget = {
							id: nodeID,
						};

						morphTarget.rawTargets = this.parseMorphTargets( relationships, DeformerNodes );
						morphTarget.id = nodeID;

						if ( relationships.parents.length > 1 ) console.warn( 'THREE.FBXLoader: morph target attached to more than one geometry is not supported.' );

						morphTargets[ nodeID ] = morphTarget;

					}

				}

			}

			return {

				skeletons: skeletons,
				morphTargets: morphTargets,

			};

		},

		// Parse single nodes in FBXTree.Objects.Deformer
		// The top level skeleton node has type 'Skin' and sub nodes have type 'Cluster'
		// Each skin node represents a skeleton and each cluster node represents a bone
		parseSkeleton: function ( relationships, deformerNodes ) {

			var rawBones = [];

			relationships.children.forEach( function ( child ) {

				var boneNode = deformerNodes[ child.ID ];

				if ( boneNode.attrType !== 'Cluster' ) return;

				var rawBone = {

					ID: child.ID,
					indices: [],
					weights: [],
					transformLink: new Matrix4().fromArray( boneNode.TransformLink.a ),
					// transform: new Matrix4().fromArray( boneNode.Transform.a ),
					// linkMode: boneNode.Mode,

				};

				if ( 'Indexes' in boneNode ) {

					rawBone.indices = boneNode.Indexes.a;
					rawBone.weights = boneNode.Weights.a;

				}

				rawBones.push( rawBone );

			} );

			return {

				rawBones: rawBones,
				bones: []

			};

		},

		// The top level morph deformer node has type "BlendShape" and sub nodes have type "BlendShapeChannel"
		parseMorphTargets: function ( relationships, deformerNodes ) {

			var rawMorphTargets = [];

			for ( var i = 0; i < relationships.children.length; i ++ ) {

				var child = relationships.children[ i ];

				var morphTargetNode = deformerNodes[ child.ID ];

				var rawMorphTarget = {

					name: morphTargetNode.attrName,
					initialWeight: morphTargetNode.DeformPercent,
					id: morphTargetNode.id,
					fullWeights: morphTargetNode.FullWeights.a

				};

				if ( morphTargetNode.attrType !== 'BlendShapeChannel' ) return;

				rawMorphTarget.geoID = connections.get( parseInt( child.ID ) ).children.filter( function ( child ) {

					return child.relationship === undefined;

				} )[ 0 ].ID;

				rawMorphTargets.push( rawMorphTarget );

			}

			return rawMorphTargets;

		},

		// create the main Group() to be returned by the loader
		parseScene: function ( deformers, geometryMap, materialMap ) {

			sceneGraph = new Group();

			var modelMap = this.parseModels( deformers.skeletons, geometryMap, materialMap );

			var modelNodes = fbxTree.Objects.Model;

			var scope = this;
			modelMap.forEach( function ( model ) {

				var modelNode = modelNodes[ model.ID ];
				scope.setLookAtProperties( model, modelNode );

				var parentConnections = connections.get( model.ID ).parents;

				parentConnections.forEach( function ( connection ) {

					var parent = modelMap.get( connection.ID );
					if ( parent !== undefined ) parent.add( model );

				} );

				if ( model.parent === null ) {

					sceneGraph.add( model );

				}


			} );

			this.bindSkeleton( deformers.skeletons, geometryMap, modelMap );

			this.createAmbientLight();

			this.setupMorphMaterials();

			sceneGraph.traverse( function ( node ) {

				if ( node.userData.transformData ) {

					if ( node.parent ) {

						node.userData.transformData.parentMatrix = node.parent.matrix;
						node.userData.transformData.parentMatrixWorld = node.parent.matrixWorld;

					}

					var transform = generateTransform( node.userData.transformData );

					node.applyMatrix4( transform );
					node.updateWorldMatrix();

				}

			} );

			var animations = new AnimationParser().parse();

			// if all the models where already combined in a single group, just return that
			if ( sceneGraph.children.length === 1 && sceneGraph.children[ 0 ].isGroup ) {

				sceneGraph.children[ 0 ].animations = animations;
				sceneGraph = sceneGraph.children[ 0 ];

			}

			sceneGraph.animations = animations;

		},

		// parse nodes in FBXTree.Objects.Model
		parseModels: function ( skeletons, geometryMap, materialMap ) {

			var modelMap = new Map();
			var modelNodes = fbxTree.Objects.Model;

			for ( var nodeID in modelNodes ) {

				var id = parseInt( nodeID );
				var node = modelNodes[ nodeID ];
				var relationships = connections.get( id );

				var model = this.buildSkeleton( relationships, skeletons, id, node.attrName );

				if ( ! model ) {

					switch ( node.attrType ) {

						case 'Camera':
							model = this.createCamera( relationships );
							break;
						case 'Light':
							model = this.createLight( relationships );
							break;
						case 'Mesh':
							model = this.createMesh( relationships, geometryMap, materialMap );
							break;
						case 'NurbsCurve':
							model = this.createCurve( relationships, geometryMap );
							break;
						case 'LimbNode':
						case 'Root':
							model = new Bone();
							break;
						case 'Null':
						default:
							model = new Group();
							break;

					}

					model.name = node.attrName ? PropertyBinding.sanitizeNodeName( node.attrName ) : '';

					model.ID = id;

				}

				this.getTransformData( model, node );
				modelMap.set( id, model );

			}

			return modelMap;

		},

		buildSkeleton: function ( relationships, skeletons, id, name ) {

			var bone = null;

			relationships.parents.forEach( function ( parent ) {

				for ( var ID in skeletons ) {

					var skeleton = skeletons[ ID ];

					skeleton.rawBones.forEach( function ( rawBone, i ) {

						if ( rawBone.ID === parent.ID ) {

							var subBone = bone;
							bone = new Bone();

							bone.matrixWorld.copy( rawBone.transformLink );

							// set name and id here - otherwise in cases where "subBone" is created it will not have a name / id

							bone.name = name ? PropertyBinding.sanitizeNodeName( name ) : '';
							bone.ID = id;

							skeleton.bones[ i ] = bone;

							// In cases where a bone is shared between multiple meshes
							// duplicate the bone here and and it as a child of the first bone
							if ( subBone !== null ) {

								bone.add( subBone );

							}

						}

					} );

				}

			} );

			return bone;

		},

		// create a PerspectiveCamera or OrthographicCamera
		createCamera: function ( relationships ) {

			var model;
			var cameraAttribute;

			relationships.children.forEach( function ( child ) {

				var attr = fbxTree.Objects.NodeAttribute[ child.ID ];

				if ( attr !== undefined ) {

					cameraAttribute = attr;

				}

			} );

			if ( cameraAttribute === undefined ) {

				model = new Object3D();

			} else {

				var type = 0;
				if ( cameraAttribute.CameraProjectionType !== undefined && cameraAttribute.CameraProjectionType.value === 1 ) {

					type = 1;

				}

				var nearClippingPlane = 1;
				if ( cameraAttribute.NearPlane !== undefined ) {

					nearClippingPlane = cameraAttribute.NearPlane.value / 1000;

				}

				var farClippingPlane = 1000;
				if ( cameraAttribute.FarPlane !== undefined ) {

					farClippingPlane = cameraAttribute.FarPlane.value / 1000;

				}


				var width = window.innerWidth;
				var height = window.innerHeight;

				if ( cameraAttribute.AspectWidth !== undefined && cameraAttribute.AspectHeight !== undefined ) {

					width = cameraAttribute.AspectWidth.value;
					height = cameraAttribute.AspectHeight.value;

				}

				var aspect = width / height;

				var fov = 45;
				if ( cameraAttribute.FieldOfView !== undefined ) {

					fov = cameraAttribute.FieldOfView.value;

				}

				var focalLength = cameraAttribute.FocalLength ? cameraAttribute.FocalLength.value : null;

				switch ( type ) {

					case 0: // Perspective
						model = new PerspectiveCamera( fov, aspect, nearClippingPlane, farClippingPlane );
						if ( focalLength !== null ) model.setFocalLength( focalLength );
						break;

					case 1: // Orthographic
						model = new OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, nearClippingPlane, farClippingPlane );
						break;

					default:
						console.warn( 'THREE.FBXLoader: Unknown camera type ' + type + '.' );
						model = new Object3D();
						break;

				}

			}

			return model;

		},

		// Create a DirectionalLight, PointLight or SpotLight
		createLight: function ( relationships ) {

			var model;
			var lightAttribute;

			relationships.children.forEach( function ( child ) {

				var attr = fbxTree.Objects.NodeAttribute[ child.ID ];

				if ( attr !== undefined ) {

					lightAttribute = attr;

				}

			} );

			if ( lightAttribute === undefined ) {

				model = new Object3D();

			} else {

				var type;

				// LightType can be undefined for Point lights
				if ( lightAttribute.LightType === undefined ) {

					type = 0;

				} else {

					type = lightAttribute.LightType.value;

				}

				var color = 0xffffff;

				if ( lightAttribute.Color !== undefined ) {

					color = new Color().fromArray( lightAttribute.Color.value );

				}

				var intensity = ( lightAttribute.Intensity === undefined ) ? 1 : lightAttribute.Intensity.value / 100;

				// light disabled
				if ( lightAttribute.CastLightOnObject !== undefined && lightAttribute.CastLightOnObject.value === 0 ) {

					intensity = 0;

				}

				var distance = 0;
				if ( lightAttribute.FarAttenuationEnd !== undefined ) {

					if ( lightAttribute.EnableFarAttenuation !== undefined && lightAttribute.EnableFarAttenuation.value === 0 ) {

						distance = 0;

					} else {

						distance = lightAttribute.FarAttenuationEnd.value;

					}

				}

				// TODO: could this be calculated linearly from FarAttenuationStart to FarAttenuationEnd?
				var decay = 1;

				switch ( type ) {

					case 0: // Point
						model = new PointLight( color, intensity, distance, decay );
						break;

					case 1: // Directional
						model = new DirectionalLight( color, intensity );
						break;

					case 2: // Spot
						var angle = Math.PI / 3;

						if ( lightAttribute.InnerAngle !== undefined ) {

							angle = MathUtils.degToRad( lightAttribute.InnerAngle.value );

						}

						var penumbra = 0;
						if ( lightAttribute.OuterAngle !== undefined ) {

							// TODO: this is not correct - FBX calculates outer and inner angle in degrees
							// with OuterAngle > InnerAngle && OuterAngle <= Math.PI
							// while three.js uses a penumbra between (0, 1) to attenuate the inner angle
							penumbra = MathUtils.degToRad( lightAttribute.OuterAngle.value );
							penumbra = Math.max( penumbra, 1 );

						}

						model = new SpotLight( color, intensity, distance, angle, penumbra, decay );
						break;

					default:
						console.warn( 'THREE.FBXLoader: Unknown light type ' + lightAttribute.LightType.value + ', defaulting to a PointLight.' );
						model = new PointLight( color, intensity );
						break;

				}

				if ( lightAttribute.CastShadows !== undefined && lightAttribute.CastShadows.value === 1 ) {

					model.castShadow = true;

				}

			}

			return model;

		},

		createMesh: function ( relationships, geometryMap, materialMap ) {

			var model;
			var geometry = null;
			var material = null;
			var materials = [];

			// get geometry and materials(s) from connections
			relationships.children.forEach( function ( child ) {

				if ( geometryMap.has( child.ID ) ) {

					geometry = geometryMap.get( child.ID );

				}

				if ( materialMap.has( child.ID ) ) {

					materials.push( materialMap.get( child.ID ) );

				}

			} );

			if ( materials.length > 1 ) {

				material = materials;

			} else if ( materials.length > 0 ) {

				material = materials[ 0 ];

			} else {

				material = new MeshPhongMaterial( { color: 0xcccccc } );
				materials.push( material );

			}

			if ( 'color' in geometry.attributes ) {

				materials.forEach( function ( material ) {

					material.vertexColors = true;

				} );

			}

			if ( geometry.FBX_Deformer ) {

				materials.forEach( function ( material ) {

					material.skinning = true;

				} );

				model = new SkinnedMesh( geometry, material );
				model.normalizeSkinWeights();

			} else {

				model = new Mesh( geometry, material );

			}

			return model;

		},

		createCurve: function ( relationships, geometryMap ) {

			var geometry = relationships.children.reduce( function ( geo, child ) {

				if ( geometryMap.has( child.ID ) ) geo = geometryMap.get( child.ID );

				return geo;

			}, null );

			// FBX does not list materials for Nurbs lines, so we'll just put our own in here.
			var material = new LineBasicMaterial( { color: 0x3300ff, linewidth: 1 } );
			return new Line( geometry, material );

		},

		// parse the model node for transform data
		getTransformData: function ( model, modelNode ) {

			var transformData = {};

			if ( 'InheritType' in modelNode ) transformData.inheritType = parseInt( modelNode.InheritType.value );

			if ( 'RotationOrder' in modelNode ) transformData.eulerOrder = getEulerOrder( modelNode.RotationOrder.value );
			else transformData.eulerOrder = 'ZYX';

			if ( 'Lcl_Translation' in modelNode ) transformData.translation = modelNode.Lcl_Translation.value;

			if ( 'PreRotation' in modelNode ) transformData.preRotation = modelNode.PreRotation.value;
			if ( 'Lcl_Rotation' in modelNode ) transformData.rotation = modelNode.Lcl_Rotation.value;
			if ( 'PostRotation' in modelNode ) transformData.postRotation = modelNode.PostRotation.value;

			if ( 'Lcl_Scaling' in modelNode ) transformData.scale = modelNode.Lcl_Scaling.value;

			if ( 'ScalingOffset' in modelNode ) transformData.scalingOffset = modelNode.ScalingOffset.value;
			if ( 'ScalingPivot' in modelNode ) transformData.scalingPivot = modelNode.ScalingPivot.value;

			if ( 'RotationOffset' in modelNode ) transformData.rotationOffset = modelNode.RotationOffset.value;
			if ( 'RotationPivot' in modelNode ) transformData.rotationPivot = modelNode.RotationPivot.value;

			model.userData.transformData = transformData;

		},

		setLookAtProperties: function ( model, modelNode ) {

			if ( 'LookAtProperty' in modelNode ) {

				var children = connections.get( model.ID ).children;

				children.forEach( function ( child ) {

					if ( child.relationship === 'LookAtProperty' ) {

						var lookAtTarget = fbxTree.Objects.Model[ child.ID ];

						if ( 'Lcl_Translation' in lookAtTarget ) {

							var pos = lookAtTarget.Lcl_Translation.value;

							// DirectionalLight, SpotLight
							if ( model.target !== undefined ) {

								model.target.position.fromArray( pos );
								sceneGraph.add( model.target );

							} else { // Cameras and other Object3Ds

								model.lookAt( new Vector3().fromArray( pos ) );

							}

						}

					}

				} );

			}

		},

		bindSkeleton: function ( skeletons, geometryMap, modelMap ) {

			var bindMatrices = this.parsePoseNodes();

			for ( var ID in skeletons ) {

				var skeleton = skeletons[ ID ];

				var parents = connections.get( parseInt( skeleton.ID ) ).parents;

				parents.forEach( function ( parent ) {

					if ( geometryMap.has( parent.ID ) ) {

						var geoID = parent.ID;
						var geoRelationships = connections.get( geoID );

						geoRelationships.parents.forEach( function ( geoConnParent ) {

							if ( modelMap.has( geoConnParent.ID ) ) {

								var model = modelMap.get( geoConnParent.ID );

								model.bind( new Skeleton( skeleton.bones ), bindMatrices[ geoConnParent.ID ] );

							}

						} );

					}

				} );

			}

		},

		parsePoseNodes: function () {

			var bindMatrices = {};

			if ( 'Pose' in fbxTree.Objects ) {

				var BindPoseNode = fbxTree.Objects.Pose;

				for ( var nodeID in BindPoseNode ) {

					if ( BindPoseNode[ nodeID ].attrType === 'BindPose' ) {

						var poseNodes = BindPoseNode[ nodeID ].PoseNode;

						if ( Array.isArray( poseNodes ) ) {

							poseNodes.forEach( function ( poseNode ) {

								bindMatrices[ poseNode.Node ] = new Matrix4().fromArray( poseNode.Matrix.a );

							} );

						} else {

							bindMatrices[ poseNodes.Node ] = new Matrix4().fromArray( poseNodes.Matrix.a );

						}

					}

				}

			}

			return bindMatrices;

		},

		// Parse ambient color in FBXTree.GlobalSettings - if it's not set to black (default), create an ambient light
		createAmbientLight: function () {

			if ( 'GlobalSettings' in fbxTree && 'AmbientColor' in fbxTree.GlobalSettings ) {

				var ambientColor = fbxTree.GlobalSettings.AmbientColor.value;
				var r = ambientColor[ 0 ];
				var g = ambientColor[ 1 ];
				var b = ambientColor[ 2 ];

				if ( r !== 0 || g !== 0 || b !== 0 ) {

					var color = new Color( r, g, b );
					sceneGraph.add( new AmbientLight( color, 1 ) );

				}

			}

		},

		setupMorphMaterials: function () {

			var scope = this;
			sceneGraph.traverse( function ( child ) {

				if ( child.isMesh ) {

					if ( child.geometry.morphAttributes.position && child.geometry.morphAttributes.position.length ) {

						if ( Array.isArray( child.material ) ) {

							child.material.forEach( function ( material, i ) {

								scope.setupMorphMaterial( child, material, i );

							} );

						} else {

							scope.setupMorphMaterial( child, child.material );

						}

					}

				}

			} );

		},

		setupMorphMaterial: function ( child, material, index ) {

			var uuid = child.uuid;
			var matUuid = material.uuid;

			// if a geometry has morph targets, it cannot share the material with other geometries
			var sharedMat = false;

			sceneGraph.traverse( function ( node ) {

				if ( node.isMesh ) {

					if ( Array.isArray( node.material ) ) {

						node.material.forEach( function ( mat ) {

							if ( mat.uuid === matUuid && node.uuid !== uuid ) sharedMat = true;

						} );

					} else if ( node.material.uuid === matUuid && node.uuid !== uuid ) sharedMat = true;

				}

			} );

			if ( sharedMat === true ) {

				var clonedMat = material.clone();
				clonedMat.morphTargets = true;

				if ( index === undefined ) child.material = clonedMat;
				else child.material[ index ] = clonedMat;

			} else material.morphTargets = true;

		}

	};

	// parse Geometry data from FBXTree and return map of BufferGeometries
	function GeometryParser() {}

	GeometryParser.prototype = {

		constructor: GeometryParser,

		// Parse nodes in FBXTree.Objects.Geometry
		parse: function ( deformers ) {

			var geometryMap = new Map();

			if ( 'Geometry' in fbxTree.Objects ) {

				var geoNodes = fbxTree.Objects.Geometry;

				for ( var nodeID in geoNodes ) {

					var relationships = connections.get( parseInt( nodeID ) );
					var geo = this.parseGeometry( relationships, geoNodes[ nodeID ], deformers );

					geometryMap.set( parseInt( nodeID ), geo );

				}

			}

			return geometryMap;

		},

		// Parse single node in FBXTree.Objects.Geometry
		parseGeometry: function ( relationships, geoNode, deformers ) {

			switch ( geoNode.attrType ) {

				case 'Mesh':
					return this.parseMeshGeometry( relationships, geoNode, deformers );

				case 'NurbsCurve':
					return this.parseNurbsGeometry( geoNode );

			}

		},


		// Parse single node mesh geometry in FBXTree.Objects.Geometry
		parseMeshGeometry: function ( relationships, geoNode, deformers ) {

			var skeletons = deformers.skeletons;
			var morphTargets = [];

			var modelNodes = relationships.parents.map( function ( parent ) {

				return fbxTree.Objects.Model[ parent.ID ];

			} );

			// don't create geometry if it is not associated with any models
			if ( modelNodes.length === 0 ) return;

			var skeleton = relationships.children.reduce( function ( skeleton, child ) {

				if ( skeletons[ child.ID ] !== undefined ) skeleton = skeletons[ child.ID ];

				return skeleton;

			}, null );

			relationships.children.forEach( function ( child ) {

				if ( deformers.morphTargets[ child.ID ] !== undefined ) {

					morphTargets.push( deformers.morphTargets[ child.ID ] );

				}

			} );

			// Assume one model and get the preRotation from that
			// if there is more than one model associated with the geometry this may cause problems
			var modelNode = modelNodes[ 0 ];

			var transformData = {};

			if ( 'RotationOrder' in modelNode ) transformData.eulerOrder = getEulerOrder( modelNode.RotationOrder.value );
			if ( 'InheritType' in modelNode ) transformData.inheritType = parseInt( modelNode.InheritType.value );

			if ( 'GeometricTranslation' in modelNode ) transformData.translation = modelNode.GeometricTranslation.value;
			if ( 'GeometricRotation' in modelNode ) transformData.rotation = modelNode.GeometricRotation.value;
			if ( 'GeometricScaling' in modelNode ) transformData.scale = modelNode.GeometricScaling.value;

			var transform = generateTransform( transformData );

			return this.genGeometry( geoNode, skeleton, morphTargets, transform );

		},

		// Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
		genGeometry: function ( geoNode, skeleton, morphTargets, preTransform ) {

			var geo = new BufferGeometry();
			if ( geoNode.attrName ) geo.name = geoNode.attrName;

			var geoInfo = this.parseGeoNode( geoNode, skeleton );
			var buffers = this.genBuffers( geoInfo );

			var positionAttribute = new Float32BufferAttribute( buffers.vertex, 3 );

			positionAttribute.applyMatrix4( preTransform );

			geo.setAttribute( 'position', positionAttribute );

			if ( buffers.colors.length > 0 ) {

				geo.setAttribute( 'color', new Float32BufferAttribute( buffers.colors, 3 ) );

			}

			if ( skeleton ) {

				geo.setAttribute( 'skinIndex', new Uint16BufferAttribute( buffers.weightsIndices, 4 ) );

				geo.setAttribute( 'skinWeight', new Float32BufferAttribute( buffers.vertexWeights, 4 ) );

				// used later to bind the skeleton to the model
				geo.FBX_Deformer = skeleton;

			}

			if ( buffers.normal.length > 0 ) {

				var normalMatrix = new Matrix3().getNormalMatrix( preTransform );

				var normalAttribute = new Float32BufferAttribute( buffers.normal, 3 );
				normalAttribute.applyNormalMatrix( normalMatrix );

				geo.setAttribute( 'normal', normalAttribute );

			}

			buffers.uvs.forEach( function ( uvBuffer, i ) {

				// subsequent uv buffers are called 'uv1', 'uv2', ...
				var name = 'uv' + ( i + 1 ).toString();

				// the first uv buffer is just called 'uv'
				if ( i === 0 ) {

					name = 'uv';

				}

				geo.setAttribute( name, new Float32BufferAttribute( buffers.uvs[ i ], 2 ) );

			} );

			if ( geoInfo.material && geoInfo.material.mappingType !== 'AllSame' ) {

				// Convert the material indices of each vertex into rendering groups on the geometry.
				var prevMaterialIndex = buffers.materialIndex[ 0 ];
				var startIndex = 0;

				buffers.materialIndex.forEach( function ( currentIndex, i ) {

					if ( currentIndex !== prevMaterialIndex ) {

						geo.addGroup( startIndex, i - startIndex, prevMaterialIndex );

						prevMaterialIndex = currentIndex;
						startIndex = i;

					}

				} );

				// the loop above doesn't add the last group, do that here.
				if ( geo.groups.length > 0 ) {

					var lastGroup = geo.groups[ geo.groups.length - 1 ];
					var lastIndex = lastGroup.start + lastGroup.count;

					if ( lastIndex !== buffers.materialIndex.length ) {

						geo.addGroup( lastIndex, buffers.materialIndex.length - lastIndex, prevMaterialIndex );

					}

				}

				// case where there are multiple materials but the whole geometry is only
				// using one of them
				if ( geo.groups.length === 0 ) {

					geo.addGroup( 0, buffers.materialIndex.length, buffers.materialIndex[ 0 ] );

				}

			}

			this.addMorphTargets( geo, geoNode, morphTargets, preTransform );

			return geo;

		},

		parseGeoNode: function ( geoNode, skeleton ) {

			var geoInfo = {};

			geoInfo.vertexPositions = ( geoNode.Vertices !== undefined ) ? geoNode.Vertices.a : [];
			geoInfo.vertexIndices = ( geoNode.PolygonVertexIndex !== undefined ) ? geoNode.PolygonVertexIndex.a : [];

			if ( geoNode.LayerElementColor ) {

				geoInfo.color = this.parseVertexColors( geoNode.LayerElementColor[ 0 ] );

			}

			if ( geoNode.LayerElementMaterial ) {

				geoInfo.material = this.parseMaterialIndices( geoNode.LayerElementMaterial[ 0 ] );

			}

			if ( geoNode.LayerElementNormal ) {

				geoInfo.normal = this.parseNormals( geoNode.LayerElementNormal[ 0 ] );

			}

			if ( geoNode.LayerElementUV ) {

				geoInfo.uv = [];

				var i = 0;
				while ( geoNode.LayerElementUV[ i ] ) {

					if ( geoNode.LayerElementUV[ i ].UV ) {

						geoInfo.uv.push( this.parseUVs( geoNode.LayerElementUV[ i ] ) );

					}

					i ++;

				}

			}

			geoInfo.weightTable = {};

			if ( skeleton !== null ) {

				geoInfo.skeleton = skeleton;

				skeleton.rawBones.forEach( function ( rawBone, i ) {

					// loop over the bone's vertex indices and weights
					rawBone.indices.forEach( function ( index, j ) {

						if ( geoInfo.weightTable[ index ] === undefined ) geoInfo.weightTable[ index ] = [];

						geoInfo.weightTable[ index ].push( {

							id: i,
							weight: rawBone.weights[ j ],

						} );

					} );

				} );

			}

			return geoInfo;

		},

		genBuffers: function ( geoInfo ) {

			var buffers = {
				vertex: [],
				normal: [],
				colors: [],
				uvs: [],
				materialIndex: [],
				vertexWeights: [],
				weightsIndices: [],
			};

			var polygonIndex = 0;
			var faceLength = 0;
			var displayedWeightsWarning = false;

			// these will hold data for a single face
			var facePositionIndexes = [];
			var faceNormals = [];
			var faceColors = [];
			var faceUVs = [];
			var faceWeights = [];
			var faceWeightIndices = [];

			var scope = this;
			geoInfo.vertexIndices.forEach( function ( vertexIndex, polygonVertexIndex ) {

				var endOfFace = false;

				// Face index and vertex index arrays are combined in a single array
				// A cube with quad faces looks like this:
				// PolygonVertexIndex: *24 {
				//  a: 0, 1, 3, -3, 2, 3, 5, -5, 4, 5, 7, -7, 6, 7, 1, -1, 1, 7, 5, -4, 6, 0, 2, -5
				//  }
				// Negative numbers mark the end of a face - first face here is 0, 1, 3, -3
				// to find index of last vertex bit shift the index: ^ - 1
				if ( vertexIndex < 0 ) {

					vertexIndex = vertexIndex ^ - 1; // equivalent to ( x * -1 ) - 1
					endOfFace = true;

				}

				var weightIndices = [];
				var weights = [];

				facePositionIndexes.push( vertexIndex * 3, vertexIndex * 3 + 1, vertexIndex * 3 + 2 );

				if ( geoInfo.color ) {

					var data = getData( polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.color );

					faceColors.push( data[ 0 ], data[ 1 ], data[ 2 ] );

				}

				if ( geoInfo.skeleton ) {

					if ( geoInfo.weightTable[ vertexIndex ] !== undefined ) {

						geoInfo.weightTable[ vertexIndex ].forEach( function ( wt ) {

							weights.push( wt.weight );
							weightIndices.push( wt.id );

						} );


					}

					if ( weights.length > 4 ) {

						if ( ! displayedWeightsWarning ) {

							console.warn( 'THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights.' );
							displayedWeightsWarning = true;

						}

						var wIndex = [ 0, 0, 0, 0 ];
						var Weight = [ 0, 0, 0, 0 ];

						weights.forEach( function ( weight, weightIndex ) {

							var currentWeight = weight;
							var currentIndex = weightIndices[ weightIndex ];

							Weight.forEach( function ( comparedWeight, comparedWeightIndex, comparedWeightArray ) {

								if ( currentWeight > comparedWeight ) {

									comparedWeightArray[ comparedWeightIndex ] = currentWeight;
									currentWeight = comparedWeight;

									var tmp = wIndex[ comparedWeightIndex ];
									wIndex[ comparedWeightIndex ] = currentIndex;
									currentIndex = tmp;

								}

							} );

						} );

						weightIndices = wIndex;
						weights = Weight;

					}

					// if the weight array is shorter than 4 pad with 0s
					while ( weights.length < 4 ) {

						weights.push( 0 );
						weightIndices.push( 0 );

					}

					for ( var i = 0; i < 4; ++ i ) {

						faceWeights.push( weights[ i ] );
						faceWeightIndices.push( weightIndices[ i ] );

					}

				}

				if ( geoInfo.normal ) {

					var data = getData( polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.normal );

					faceNormals.push( data[ 0 ], data[ 1 ], data[ 2 ] );

				}

				if ( geoInfo.material && geoInfo.material.mappingType !== 'AllSame' ) {

					var materialIndex = getData( polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.material )[ 0 ];

				}

				if ( geoInfo.uv ) {

					geoInfo.uv.forEach( function ( uv, i ) {

						var data = getData( polygonVertexIndex, polygonIndex, vertexIndex, uv );

						if ( faceUVs[ i ] === undefined ) {

							faceUVs[ i ] = [];

						}

						faceUVs[ i ].push( data[ 0 ] );
						faceUVs[ i ].push( data[ 1 ] );

					} );

				}

				faceLength ++;

				if ( endOfFace ) {

					scope.genFace( buffers, geoInfo, facePositionIndexes, materialIndex, faceNormals, faceColors, faceUVs, faceWeights, faceWeightIndices, faceLength );

					polygonIndex ++;
					faceLength = 0;

					// reset arrays for the next face
					facePositionIndexes = [];
					faceNormals = [];
					faceColors = [];
					faceUVs = [];
					faceWeights = [];
					faceWeightIndices = [];

				}

			} );

			return buffers;

		},

		// Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
		genFace: function ( buffers, geoInfo, facePositionIndexes, materialIndex, faceNormals, faceColors, faceUVs, faceWeights, faceWeightIndices, faceLength ) {

			for ( var i = 2; i < faceLength; i ++ ) {

				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ 0 ] ] );
				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ 1 ] ] );
				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ 2 ] ] );

				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ ( i - 1 ) * 3 ] ] );
				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ ( i - 1 ) * 3 + 1 ] ] );
				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ ( i - 1 ) * 3 + 2 ] ] );

				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ i * 3 ] ] );
				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ i * 3 + 1 ] ] );
				buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ i * 3 + 2 ] ] );

				if ( geoInfo.skeleton ) {

					buffers.vertexWeights.push( faceWeights[ 0 ] );
					buffers.vertexWeights.push( faceWeights[ 1 ] );
					buffers.vertexWeights.push( faceWeights[ 2 ] );
					buffers.vertexWeights.push( faceWeights[ 3 ] );

					buffers.vertexWeights.push( faceWeights[ ( i - 1 ) * 4 ] );
					buffers.vertexWeights.push( faceWeights[ ( i - 1 ) * 4 + 1 ] );
					buffers.vertexWeights.push( faceWeights[ ( i - 1 ) * 4 + 2 ] );
					buffers.vertexWeights.push( faceWeights[ ( i - 1 ) * 4 + 3 ] );

					buffers.vertexWeights.push( faceWeights[ i * 4 ] );
					buffers.vertexWeights.push( faceWeights[ i * 4 + 1 ] );
					buffers.vertexWeights.push( faceWeights[ i * 4 + 2 ] );
					buffers.vertexWeights.push( faceWeights[ i * 4 + 3 ] );

					buffers.weightsIndices.push( faceWeightIndices[ 0 ] );
					buffers.weightsIndices.push( faceWeightIndices[ 1 ] );
					buffers.weightsIndices.push( faceWeightIndices[ 2 ] );
					buffers.weightsIndices.push( faceWeightIndices[ 3 ] );

					buffers.weightsIndices.push( faceWeightIndices[ ( i - 1 ) * 4 ] );
					buffers.weightsIndices.push( faceWeightIndices[ ( i - 1 ) * 4 + 1 ] );
					buffers.weightsIndices.push( faceWeightIndices[ ( i - 1 ) * 4 + 2 ] );
					buffers.weightsIndices.push( faceWeightIndices[ ( i - 1 ) * 4 + 3 ] );

					buffers.weightsIndices.push( faceWeightIndices[ i * 4 ] );
					buffers.weightsIndices.push( faceWeightIndices[ i * 4 + 1 ] );
					buffers.weightsIndices.push( faceWeightIndices[ i * 4 + 2 ] );
					buffers.weightsIndices.push( faceWeightIndices[ i * 4 + 3 ] );

				}

				if ( geoInfo.color ) {

					buffers.colors.push( faceColors[ 0 ] );
					buffers.colors.push( faceColors[ 1 ] );
					buffers.colors.push( faceColors[ 2 ] );

					buffers.colors.push( faceColors[ ( i - 1 ) * 3 ] );
					buffers.colors.push( faceColors[ ( i - 1 ) * 3 + 1 ] );
					buffers.colors.push( faceColors[ ( i - 1 ) * 3 + 2 ] );

					buffers.colors.push( faceColors[ i * 3 ] );
					buffers.colors.push( faceColors[ i * 3 + 1 ] );
					buffers.colors.push( faceColors[ i * 3 + 2 ] );

				}

				if ( geoInfo.material && geoInfo.material.mappingType !== 'AllSame' ) {

					buffers.materialIndex.push( materialIndex );
					buffers.materialIndex.push( materialIndex );
					buffers.materialIndex.push( materialIndex );

				}

				if ( geoInfo.normal ) {

					buffers.normal.push( faceNormals[ 0 ] );
					buffers.normal.push( faceNormals[ 1 ] );
					buffers.normal.push( faceNormals[ 2 ] );

					buffers.normal.push( faceNormals[ ( i - 1 ) * 3 ] );
					buffers.normal.push( faceNormals[ ( i - 1 ) * 3 + 1 ] );
					buffers.normal.push( faceNormals[ ( i - 1 ) * 3 + 2 ] );

					buffers.normal.push( faceNormals[ i * 3 ] );
					buffers.normal.push( faceNormals[ i * 3 + 1 ] );
					buffers.normal.push( faceNormals[ i * 3 + 2 ] );

				}

				if ( geoInfo.uv ) {

					geoInfo.uv.forEach( function ( uv, j ) {

						if ( buffers.uvs[ j ] === undefined ) buffers.uvs[ j ] = [];

						buffers.uvs[ j ].push( faceUVs[ j ][ 0 ] );
						buffers.uvs[ j ].push( faceUVs[ j ][ 1 ] );

						buffers.uvs[ j ].push( faceUVs[ j ][ ( i - 1 ) * 2 ] );
						buffers.uvs[ j ].push( faceUVs[ j ][ ( i - 1 ) * 2 + 1 ] );

						buffers.uvs[ j ].push( faceUVs[ j ][ i * 2 ] );
						buffers.uvs[ j ].push( faceUVs[ j ][ i * 2 + 1 ] );

					} );

				}

			}

		},

		addMorphTargets: function ( parentGeo, parentGeoNode, morphTargets, preTransform ) {

			if ( morphTargets.length === 0 ) return;

			parentGeo.morphTargetsRelative = true;

			parentGeo.morphAttributes.position = [];
			// parentGeo.morphAttributes.normal = []; // not implemented

			var scope = this;
			morphTargets.forEach( function ( morphTarget ) {

				morphTarget.rawTargets.forEach( function ( rawTarget ) {

					var morphGeoNode = fbxTree.Objects.Geometry[ rawTarget.geoID ];

					if ( morphGeoNode !== undefined ) {

						scope.genMorphGeometry( parentGeo, parentGeoNode, morphGeoNode, preTransform, rawTarget.name );

					}

				} );

			} );

		},

		// a morph geometry node is similar to a standard  node, and the node is also contained
		// in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
		// and a special attribute Index defining which vertices of the original geometry are affected
		// Normal and position attributes only have data for the vertices that are affected by the morph
		genMorphGeometry: function ( parentGeo, parentGeoNode, morphGeoNode, preTransform, name ) {

			var vertexIndices = ( parentGeoNode.PolygonVertexIndex !== undefined ) ? parentGeoNode.PolygonVertexIndex.a : [];

			var morphPositionsSparse = ( morphGeoNode.Vertices !== undefined ) ? morphGeoNode.Vertices.a : [];
			var indices = ( morphGeoNode.Indexes !== undefined ) ? morphGeoNode.Indexes.a : [];

			var length = parentGeo.attributes.position.count * 3;
			var morphPositions = new Float32Array( length );

			for ( var i = 0; i < indices.length; i ++ ) {

				var morphIndex = indices[ i ] * 3;

				morphPositions[ morphIndex ] = morphPositionsSparse[ i * 3 ];
				morphPositions[ morphIndex + 1 ] = morphPositionsSparse[ i * 3 + 1 ];
				morphPositions[ morphIndex + 2 ] = morphPositionsSparse[ i * 3 + 2 ];

			}

			// TODO: add morph normal support
			var morphGeoInfo = {
				vertexIndices: vertexIndices,
				vertexPositions: morphPositions,

			};

			var morphBuffers = this.genBuffers( morphGeoInfo );

			var positionAttribute = new Float32BufferAttribute( morphBuffers.vertex, 3 );
			positionAttribute.name = name || morphGeoNode.attrName;

			positionAttribute.applyMatrix4( preTransform );

			parentGeo.morphAttributes.position.push( positionAttribute );

		},

		// Parse normal from FBXTree.Objects.Geometry.LayerElementNormal if it exists
		parseNormals: function ( NormalNode ) {

			var mappingType = NormalNode.MappingInformationType;
			var referenceType = NormalNode.ReferenceInformationType;
			var buffer = NormalNode.Normals.a;
			var indexBuffer = [];
			if ( referenceType === 'IndexToDirect' ) {

				if ( 'NormalIndex' in NormalNode ) {

					indexBuffer = NormalNode.NormalIndex.a;

				} else if ( 'NormalsIndex' in NormalNode ) {

					indexBuffer = NormalNode.NormalsIndex.a;

				}

			}

			return {
				dataSize: 3,
				buffer: buffer,
				indices: indexBuffer,
				mappingType: mappingType,
				referenceType: referenceType
			};

		},

		// Parse UVs from FBXTree.Objects.Geometry.LayerElementUV if it exists
		parseUVs: function ( UVNode ) {

			var mappingType = UVNode.MappingInformationType;
			var referenceType = UVNode.ReferenceInformationType;
			var buffer = UVNode.UV.a;
			var indexBuffer = [];
			if ( referenceType === 'IndexToDirect' ) {

				indexBuffer = UVNode.UVIndex.a;

			}

			return {
				dataSize: 2,
				buffer: buffer,
				indices: indexBuffer,
				mappingType: mappingType,
				referenceType: referenceType
			};

		},

		// Parse Vertex Colors from FBXTree.Objects.Geometry.LayerElementColor if it exists
		parseVertexColors: function ( ColorNode ) {

			var mappingType = ColorNode.MappingInformationType;
			var referenceType = ColorNode.ReferenceInformationType;
			var buffer = ColorNode.Colors.a;
			var indexBuffer = [];
			if ( referenceType === 'IndexToDirect' ) {

				indexBuffer = ColorNode.ColorIndex.a;

			}

			return {
				dataSize: 4,
				buffer: buffer,
				indices: indexBuffer,
				mappingType: mappingType,
				referenceType: referenceType
			};

		},

		// Parse mapping and material data in FBXTree.Objects.Geometry.LayerElementMaterial if it exists
		parseMaterialIndices: function ( MaterialNode ) {

			var mappingType = MaterialNode.MappingInformationType;
			var referenceType = MaterialNode.ReferenceInformationType;

			if ( mappingType === 'NoMappingInformation' ) {

				return {
					dataSize: 1,
					buffer: [ 0 ],
					indices: [ 0 ],
					mappingType: 'AllSame',
					referenceType: referenceType
				};

			}

			var materialIndexBuffer = MaterialNode.Materials.a;

			// Since materials are stored as indices, there's a bit of a mismatch between FBX and what
			// we expect.So we create an intermediate buffer that points to the index in the buffer,
			// for conforming with the other functions we've written for other data.
			var materialIndices = [];

			for ( var i = 0; i < materialIndexBuffer.length; ++ i ) {

				materialIndices.push( i );

			}

			return {
				dataSize: 1,
				buffer: materialIndexBuffer,
				indices: materialIndices,
				mappingType: mappingType,
				referenceType: referenceType
			};

		},

		// Generate a NurbGeometry from a node in FBXTree.Objects.Geometry
		parseNurbsGeometry: function ( geoNode ) {

			if ( NURBSCurve === undefined ) {

				console.error( 'THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry.' );
				return new BufferGeometry();

			}

			var order = parseInt( geoNode.Order );

			if ( isNaN( order ) ) {

				console.error( 'THREE.FBXLoader: Invalid Order %s given for geometry ID: %s', geoNode.Order, geoNode.id );
				return new BufferGeometry();

			}

			var degree = order - 1;

			var knots = geoNode.KnotVector.a;
			var controlPoints = [];
			var pointsValues = geoNode.Points.a;

			for ( var i = 0, l = pointsValues.length; i < l; i += 4 ) {

				controlPoints.push( new Vector4().fromArray( pointsValues, i ) );

			}

			var startKnot, endKnot;

			if ( geoNode.Form === 'Closed' ) {

				controlPoints.push( controlPoints[ 0 ] );

			} else if ( geoNode.Form === 'Periodic' ) {

				startKnot = degree;
				endKnot = knots.length - 1 - startKnot;

				for ( var i = 0; i < degree; ++ i ) {

					controlPoints.push( controlPoints[ i ] );

				}

			}

			var curve = new NURBSCurve( degree, knots, controlPoints, startKnot, endKnot );
			var vertices = curve.getPoints( controlPoints.length * 7 );

			var positions = new Float32Array( vertices.length * 3 );

			vertices.forEach( function ( vertex, i ) {

				vertex.toArray( positions, i * 3 );

			} );

			var geometry = new BufferGeometry();
			geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );

			return geometry;

		},

	};

	// parse animation data from FBXTree
	function AnimationParser() {}

	AnimationParser.prototype = {

		constructor: AnimationParser,

		// take raw animation clips and turn them into three.js animation clips
		parse: function () {

			var animationClips = [];

			var rawClips = this.parseClips();

			if ( rawClips !== undefined ) {

				for ( var key in rawClips ) {

					var rawClip = rawClips[ key ];

					var clip = this.addClip( rawClip );

					animationClips.push( clip );

				}

			}

			return animationClips;

		},

		parseClips: function () {

			// since the actual transformation data is stored in FBXTree.Objects.AnimationCurve,
			// if this is undefined we can safely assume there are no animations
			if ( fbxTree.Objects.AnimationCurve === undefined ) return undefined;

			var curveNodesMap = this.parseAnimationCurveNodes();

			this.parseAnimationCurves( curveNodesMap );

			var layersMap = this.parseAnimationLayers( curveNodesMap );
			var rawClips = this.parseAnimStacks( layersMap );

			return rawClips;

		},

		// parse nodes in FBXTree.Objects.AnimationCurveNode
		// each AnimationCurveNode holds data for an animation transform for a model (e.g. left arm rotation )
		// and is referenced by an AnimationLayer
		parseAnimationCurveNodes: function () {

			var rawCurveNodes = fbxTree.Objects.AnimationCurveNode;

			var curveNodesMap = new Map();

			for ( var nodeID in rawCurveNodes ) {

				var rawCurveNode = rawCurveNodes[ nodeID ];

				if ( rawCurveNode.attrName.match( /S|R|T|DeformPercent/ ) !== null ) {

					var curveNode = {

						id: rawCurveNode.id,
						attr: rawCurveNode.attrName,
						curves: {},

					};

					curveNodesMap.set( curveNode.id, curveNode );

				}

			}

			return curveNodesMap;

		},

		// parse nodes in FBXTree.Objects.AnimationCurve and connect them up to
		// previously parsed AnimationCurveNodes. Each AnimationCurve holds data for a single animated
		// axis ( e.g. times and values of x rotation)
		parseAnimationCurves: function ( curveNodesMap ) {

			var rawCurves = fbxTree.Objects.AnimationCurve;

			// TODO: Many values are identical up to roundoff error, but won't be optimised
			// e.g. position times: [0, 0.4, 0. 8]
			// position values: [7.23538335023477e-7, 93.67518615722656, -0.9982695579528809, 7.23538335023477e-7, 93.67518615722656, -0.9982695579528809, 7.235384487103147e-7, 93.67520904541016, -0.9982695579528809]
			// clearly, this should be optimised to
			// times: [0], positions [7.23538335023477e-7, 93.67518615722656, -0.9982695579528809]
			// this shows up in nearly every FBX file, and generally time array is length > 100

			for ( var nodeID in rawCurves ) {

				var animationCurve = {

					id: rawCurves[ nodeID ].id,
					times: rawCurves[ nodeID ].KeyTime.a.map( convertFBXTimeToSeconds ),
					values: rawCurves[ nodeID ].KeyValueFloat.a,

				};

				var relationships = connections.get( animationCurve.id );

				if ( relationships !== undefined ) {

					var animationCurveID = relationships.parents[ 0 ].ID;
					var animationCurveRelationship = relationships.parents[ 0 ].relationship;

					if ( animationCurveRelationship.match( /X/ ) ) {

						curveNodesMap.get( animationCurveID ).curves[ 'x' ] = animationCurve;

					} else if ( animationCurveRelationship.match( /Y/ ) ) {

						curveNodesMap.get( animationCurveID ).curves[ 'y' ] = animationCurve;

					} else if ( animationCurveRelationship.match( /Z/ ) ) {

						curveNodesMap.get( animationCurveID ).curves[ 'z' ] = animationCurve;

					} else if ( animationCurveRelationship.match( /d|DeformPercent/ ) && curveNodesMap.has( animationCurveID ) ) {

						curveNodesMap.get( animationCurveID ).curves[ 'morph' ] = animationCurve;

					}

				}

			}

		},

		// parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
		// to various AnimationCurveNodes and is referenced by an AnimationStack node
		// note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
		parseAnimationLayers: function ( curveNodesMap ) {

			var rawLayers = fbxTree.Objects.AnimationLayer;

			var layersMap = new Map();

			for ( var nodeID in rawLayers ) {

				var layerCurveNodes = [];

				var connection = connections.get( parseInt( nodeID ) );

				if ( connection !== undefined ) {

					// all the animationCurveNodes used in the layer
					var children = connection.children;

					children.forEach( function ( child, i ) {

						if ( curveNodesMap.has( child.ID ) ) {

							var curveNode = curveNodesMap.get( child.ID );

							// check that the curves are defined for at least one axis, otherwise ignore the curveNode
							if ( curveNode.curves.x !== undefined || curveNode.curves.y !== undefined || curveNode.curves.z !== undefined ) {

								if ( layerCurveNodes[ i ] === undefined ) {

									var modelID = connections.get( child.ID ).parents.filter( function ( parent ) {

										return parent.relationship !== undefined;

									} )[ 0 ].ID;

									if ( modelID !== undefined ) {

										var rawModel = fbxTree.Objects.Model[ modelID.toString() ];

										if ( rawModel === undefined ) {

											console.warn( 'THREE.FBXLoader: Encountered a unused curve.', child );
											return;

										}

										var node = {

											modelName: rawModel.attrName ? PropertyBinding.sanitizeNodeName( rawModel.attrName ) : '',
											ID: rawModel.id,
											initialPosition: [ 0, 0, 0 ],
											initialRotation: [ 0, 0, 0 ],
											initialScale: [ 1, 1, 1 ],

										};

										sceneGraph.traverse( function ( child ) {

											if ( child.ID === rawModel.id ) {

												node.transform = child.matrix;

												if ( child.userData.transformData ) node.eulerOrder = child.userData.transformData.eulerOrder;

											}

										} );

										if ( ! node.transform ) node.transform = new Matrix4();

										// if the animated model is pre rotated, we'll have to apply the pre rotations to every
										// animation value as well
										if ( 'PreRotation' in rawModel ) node.preRotation = rawModel.PreRotation.value;
										if ( 'PostRotation' in rawModel ) node.postRotation = rawModel.PostRotation.value;

										layerCurveNodes[ i ] = node;

									}

								}

								if ( layerCurveNodes[ i ] ) layerCurveNodes[ i ][ curveNode.attr ] = curveNode;

							} else if ( curveNode.curves.morph !== undefined ) {

								if ( layerCurveNodes[ i ] === undefined ) {

									var deformerID = connections.get( child.ID ).parents.filter( function ( parent ) {

										return parent.relationship !== undefined;

									} )[ 0 ].ID;

									var morpherID = connections.get( deformerID ).parents[ 0 ].ID;
									var geoID = connections.get( morpherID ).parents[ 0 ].ID;

									// assuming geometry is not used in more than one model
									var modelID = connections.get( geoID ).parents[ 0 ].ID;

									var rawModel = fbxTree.Objects.Model[ modelID ];

									var node = {

										modelName: rawModel.attrName ? PropertyBinding.sanitizeNodeName( rawModel.attrName ) : '',
										morphName: fbxTree.Objects.Deformer[ deformerID ].attrName,

									};

									layerCurveNodes[ i ] = node;

								}

								layerCurveNodes[ i ][ curveNode.attr ] = curveNode;

							}

						}

					} );

					layersMap.set( parseInt( nodeID ), layerCurveNodes );

				}

			}

			return layersMap;

		},

		// parse nodes in FBXTree.Objects.AnimationStack. These are the top level node in the animation
		// hierarchy. Each Stack node will be used to create a AnimationClip
		parseAnimStacks: function ( layersMap ) {

			var rawStacks = fbxTree.Objects.AnimationStack;

			// connect the stacks (clips) up to the layers
			var rawClips = {};

			for ( var nodeID in rawStacks ) {

				var children = connections.get( parseInt( nodeID ) ).children;

				if ( children.length > 1 ) {

					// it seems like stacks will always be associated with a single layer. But just in case there are files
					// where there are multiple layers per stack, we'll display a warning
					console.warn( 'THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.' );

				}

				var layer = layersMap.get( children[ 0 ].ID );

				rawClips[ nodeID ] = {

					name: rawStacks[ nodeID ].attrName,
					layer: layer,

				};

			}

			return rawClips;

		},

		addClip: function ( rawClip ) {

			var tracks = [];

			var scope = this;
			rawClip.layer.forEach( function ( rawTracks ) {

				tracks = tracks.concat( scope.generateTracks( rawTracks ) );

			} );

			return new AnimationClip( rawClip.name, - 1, tracks );

		},

		generateTracks: function ( rawTracks ) {

			var tracks = [];

			var initialPosition = new Vector3();
			var initialRotation = new Quaternion();
			var initialScale = new Vector3();

			if ( rawTracks.transform ) rawTracks.transform.decompose( initialPosition, initialRotation, initialScale );

			initialPosition = initialPosition.toArray();
			initialRotation = new Euler().setFromQuaternion( initialRotation, rawTracks.eulerOrder ).toArray();
			initialScale = initialScale.toArray();

			if ( rawTracks.T !== undefined && Object.keys( rawTracks.T.curves ).length > 0 ) {

				var positionTrack = this.generateVectorTrack( rawTracks.modelName, rawTracks.T.curves, initialPosition, 'position' );
				if ( positionTrack !== undefined ) tracks.push( positionTrack );

			}

			if ( rawTracks.R !== undefined && Object.keys( rawTracks.R.curves ).length > 0 ) {

				var rotationTrack = this.generateRotationTrack( rawTracks.modelName, rawTracks.R.curves, initialRotation, rawTracks.preRotation, rawTracks.postRotation, rawTracks.eulerOrder );
				if ( rotationTrack !== undefined ) tracks.push( rotationTrack );

			}

			if ( rawTracks.S !== undefined && Object.keys( rawTracks.S.curves ).length > 0 ) {

				var scaleTrack = this.generateVectorTrack( rawTracks.modelName, rawTracks.S.curves, initialScale, 'scale' );
				if ( scaleTrack !== undefined ) tracks.push( scaleTrack );

			}

			if ( rawTracks.DeformPercent !== undefined ) {

				var morphTrack = this.generateMorphTrack( rawTracks );
				if ( morphTrack !== undefined ) tracks.push( morphTrack );

			}

			return tracks;

		},

		generateVectorTrack: function ( modelName, curves, initialValue, type ) {

			var times = this.getTimesForAllAxes( curves );
			var values = this.getKeyframeTrackValues( times, curves, initialValue );

			return new VectorKeyframeTrack( modelName + '.' + type, times, values );

		},

		generateRotationTrack: function ( modelName, curves, initialValue, preRotation, postRotation, eulerOrder ) {

			if ( curves.x !== undefined ) {

				this.interpolateRotations( curves.x );
				curves.x.values = curves.x.values.map( MathUtils.degToRad );

			}

			if ( curves.y !== undefined ) {

				this.interpolateRotations( curves.y );
				curves.y.values = curves.y.values.map( MathUtils.degToRad );

			}

			if ( curves.z !== undefined ) {

				this.interpolateRotations( curves.z );
				curves.z.values = curves.z.values.map( MathUtils.degToRad );

			}

			var times = this.getTimesForAllAxes( curves );
			var values = this.getKeyframeTrackValues( times, curves, initialValue );

			if ( preRotation !== undefined ) {

				preRotation = preRotation.map( MathUtils.degToRad );
				preRotation.push( eulerOrder );

				preRotation = new Euler().fromArray( preRotation );
				preRotation = new Quaternion().setFromEuler( preRotation );

			}

			if ( postRotation !== undefined ) {

				postRotation = postRotation.map( MathUtils.degToRad );
				postRotation.push( eulerOrder );

				postRotation = new Euler().fromArray( postRotation );
				postRotation = new Quaternion().setFromEuler( postRotation ).invert();

			}

			var quaternion = new Quaternion();
			var euler = new Euler();

			var quaternionValues = [];

			for ( var i = 0; i < values.length; i += 3 ) {

				euler.set( values[ i ], values[ i + 1 ], values[ i + 2 ], eulerOrder );

				quaternion.setFromEuler( euler );

				if ( preRotation !== undefined ) quaternion.premultiply( preRotation );
				if ( postRotation !== undefined ) quaternion.multiply( postRotation );

				quaternion.toArray( quaternionValues, ( i / 3 ) * 4 );

			}

			return new QuaternionKeyframeTrack( modelName + '.quaternion', times, quaternionValues );

		},

		generateMorphTrack: function ( rawTracks ) {

			var curves = rawTracks.DeformPercent.curves.morph;
			var values = curves.values.map( function ( val ) {

				return val / 100;

			} );

			var morphNum = sceneGraph.getObjectByName( rawTracks.modelName ).morphTargetDictionary[ rawTracks.morphName ];

			return new NumberKeyframeTrack( rawTracks.modelName + '.morphTargetInfluences[' + morphNum + ']', curves.times, values );

		},

		// For all animated objects, times are defined separately for each axis
		// Here we'll combine the times into one sorted array without duplicates
		getTimesForAllAxes: function ( curves ) {

			var times = [];

			// first join together the times for each axis, if defined
			if ( curves.x !== undefined ) times = times.concat( curves.x.times );
			if ( curves.y !== undefined ) times = times.concat( curves.y.times );
			if ( curves.z !== undefined ) times = times.concat( curves.z.times );

			// then sort them
			times = times.sort( function ( a, b ) {

				return a - b;

			} );

			// and remove duplicates
			if ( times.length > 1 ) {

				var targetIndex = 1;
				var lastValue = times[ 0 ];
				for ( var i = 1; i < times.length; i ++ ) {

					var currentValue = times[ i ];
					if ( currentValue !== lastValue ) {

						times[ targetIndex ] = currentValue;
						lastValue = currentValue;
						targetIndex ++;

					}

				}

				times = times.slice( 0, targetIndex );

			}

			return times;

		},

		getKeyframeTrackValues: function ( times, curves, initialValue ) {

			var prevValue = initialValue;

			var values = [];

			var xIndex = - 1;
			var yIndex = - 1;
			var zIndex = - 1;

			times.forEach( function ( time ) {

				if ( curves.x ) xIndex = curves.x.times.indexOf( time );
				if ( curves.y ) yIndex = curves.y.times.indexOf( time );
				if ( curves.z ) zIndex = curves.z.times.indexOf( time );

				// if there is an x value defined for this frame, use that
				if ( xIndex !== - 1 ) {

					var xValue = curves.x.values[ xIndex ];
					values.push( xValue );
					prevValue[ 0 ] = xValue;

				} else {

					// otherwise use the x value from the previous frame
					values.push( prevValue[ 0 ] );

				}

				if ( yIndex !== - 1 ) {

					var yValue = curves.y.values[ yIndex ];
					values.push( yValue );
					prevValue[ 1 ] = yValue;

				} else {

					values.push( prevValue[ 1 ] );

				}

				if ( zIndex !== - 1 ) {

					var zValue = curves.z.values[ zIndex ];
					values.push( zValue );
					prevValue[ 2 ] = zValue;

				} else {

					values.push( prevValue[ 2 ] );

				}

			} );

			return values;

		},

		// Rotations are defined as Euler angles which can have values  of any size
		// These will be converted to quaternions which don't support values greater than
		// PI, so we'll interpolate large rotations
		interpolateRotations: function ( curve ) {

			for ( var i = 1; i < curve.values.length; i ++ ) {

				var initialValue = curve.values[ i - 1 ];
				var valuesSpan = curve.values[ i ] - initialValue;

				var absoluteSpan = Math.abs( valuesSpan );

				if ( absoluteSpan >= 180 ) {

					var numSubIntervals = absoluteSpan / 180;

					var step = valuesSpan / numSubIntervals;
					var nextValue = initialValue + step;

					var initialTime = curve.times[ i - 1 ];
					var timeSpan = curve.times[ i ] - initialTime;
					var interval = timeSpan / numSubIntervals;
					var nextTime = initialTime + interval;

					var interpolatedTimes = [];
					var interpolatedValues = [];

					while ( nextTime < curve.times[ i ] ) {

						interpolatedTimes.push( nextTime );
						nextTime += interval;

						interpolatedValues.push( nextValue );
						nextValue += step;

					}

					curve.times = inject( curve.times, i, interpolatedTimes );
					curve.values = inject( curve.values, i, interpolatedValues );

				}

			}

		},

	};

	// parse an FBX file in ASCII format
	function TextParser() {}

	TextParser.prototype = {

		constructor: TextParser,

		getPrevNode: function () {

			return this.nodeStack[ this.currentIndent - 2 ];

		},

		getCurrentNode: function () {

			return this.nodeStack[ this.currentIndent - 1 ];

		},

		getCurrentProp: function () {

			return this.currentProp;

		},

		pushStack: function ( node ) {

			this.nodeStack.push( node );
			this.currentIndent += 1;

		},

		popStack: function () {

			this.nodeStack.pop();
			this.currentIndent -= 1;

		},

		setCurrentProp: function ( val, name ) {

			this.currentProp = val;
			this.currentPropName = name;

		},

		parse: function ( text ) {

			this.currentIndent = 0;

			this.allNodes = new FBXTree();
			this.nodeStack = [];
			this.currentProp = [];
			this.currentPropName = '';

			var scope = this;

			var split = text.split( /[\r\n]+/ );

			split.forEach( function ( line, i ) {

				var matchComment = line.match( /^[\s\t]*;/ );
				var matchEmpty = line.match( /^[\s\t]*$/ );

				if ( matchComment || matchEmpty ) return;

				var matchBeginning = line.match( '^\\t{' + scope.currentIndent + '}(\\w+):(.*){', '' );
				var matchProperty = line.match( '^\\t{' + ( scope.currentIndent ) + '}(\\w+):[\\s\\t\\r\\n](.*)' );
				var matchEnd = line.match( '^\\t{' + ( scope.currentIndent - 1 ) + '}}' );

				if ( matchBeginning ) {

					scope.parseNodeBegin( line, matchBeginning );

				} else if ( matchProperty ) {

					scope.parseNodeProperty( line, matchProperty, split[ ++ i ] );

				} else if ( matchEnd ) {

					scope.popStack();

				} else if ( line.match( /^[^\s\t}]/ ) ) {

					// large arrays are split over multiple lines terminated with a ',' character
					// if this is encountered the line needs to be joined to the previous line
					scope.parseNodePropertyContinued( line );

				}

			} );

			return this.allNodes;

		},

		parseNodeBegin: function ( line, property ) {

			var nodeName = property[ 1 ].trim().replace( /^"/, '' ).replace( /"$/, '' );

			var nodeAttrs = property[ 2 ].split( ',' ).map( function ( attr ) {

				return attr.trim().replace( /^"/, '' ).replace( /"$/, '' );

			} );

			var node = { name: nodeName };
			var attrs = this.parseNodeAttr( nodeAttrs );

			var currentNode = this.getCurrentNode();

			// a top node
			if ( this.currentIndent === 0 ) {

				this.allNodes.add( nodeName, node );

			} else { // a subnode

				// if the subnode already exists, append it
				if ( nodeName in currentNode ) {

					// special case Pose needs PoseNodes as an array
					if ( nodeName === 'PoseNode' ) {

						currentNode.PoseNode.push( node );

					} else if ( currentNode[ nodeName ].id !== undefined ) {

						currentNode[ nodeName ] = {};
						currentNode[ nodeName ][ currentNode[ nodeName ].id ] = currentNode[ nodeName ];

					}

					if ( attrs.id !== '' ) currentNode[ nodeName ][ attrs.id ] = node;

				} else if ( typeof attrs.id === 'number' ) {

					currentNode[ nodeName ] = {};
					currentNode[ nodeName ][ attrs.id ] = node;

				} else if ( nodeName !== 'Properties70' ) {

					if ( nodeName === 'PoseNode' )	currentNode[ nodeName ] = [ node ];
					else currentNode[ nodeName ] = node;

				}

			}

			if ( typeof attrs.id === 'number' ) node.id = attrs.id;
			if ( attrs.name !== '' ) node.attrName = attrs.name;
			if ( attrs.type !== '' ) node.attrType = attrs.type;

			this.pushStack( node );

		},

		parseNodeAttr: function ( attrs ) {

			var id = attrs[ 0 ];

			if ( attrs[ 0 ] !== '' ) {

				id = parseInt( attrs[ 0 ] );

				if ( isNaN( id ) ) {

					id = attrs[ 0 ];

				}

			}

			var name = '', type = '';

			if ( attrs.length > 1 ) {

				name = attrs[ 1 ].replace( /^(\w+)::/, '' );
				type = attrs[ 2 ];

			}

			return { id: id, name: name, type: type };

		},

		parseNodeProperty: function ( line, property, contentLine ) {

			var propName = property[ 1 ].replace( /^"/, '' ).replace( /"$/, '' ).trim();
			var propValue = property[ 2 ].replace( /^"/, '' ).replace( /"$/, '' ).trim();

			// for special case: base64 image data follows "Content: ," line
			//	Content: ,
			//	 "/9j/4RDaRXhpZgAATU0A..."
			if ( propName === 'Content' && propValue === ',' ) {

				propValue = contentLine.replace( /"/g, '' ).replace( /,$/, '' ).trim();

			}

			var currentNode = this.getCurrentNode();
			var parentName = currentNode.name;

			if ( parentName === 'Properties70' ) {

				this.parseNodeSpecialProperty( line, propName, propValue );
				return;

			}

			// Connections
			if ( propName === 'C' ) {

				var connProps = propValue.split( ',' ).slice( 1 );
				var from = parseInt( connProps[ 0 ] );
				var to = parseInt( connProps[ 1 ] );

				var rest = propValue.split( ',' ).slice( 3 );

				rest = rest.map( function ( elem ) {

					return elem.trim().replace( /^"/, '' );

				} );

				propName = 'connections';
				propValue = [ from, to ];
				append( propValue, rest );

				if ( currentNode[ propName ] === undefined ) {

					currentNode[ propName ] = [];

				}

			}

			// Node
			if ( propName === 'Node' ) currentNode.id = propValue;

			// connections
			if ( propName in currentNode && Array.isArray( currentNode[ propName ] ) ) {

				currentNode[ propName ].push( propValue );

			} else {

				if ( propName !== 'a' ) currentNode[ propName ] = propValue;
				else currentNode.a = propValue;

			}

			this.setCurrentProp( currentNode, propName );

			// convert string to array, unless it ends in ',' in which case more will be added to it
			if ( propName === 'a' && propValue.slice( - 1 ) !== ',' ) {

				currentNode.a = parseNumberArray( propValue );

			}

		},

		parseNodePropertyContinued: function ( line ) {

			var currentNode = this.getCurrentNode();

			currentNode.a += line;

			// if the line doesn't end in ',' we have reached the end of the property value
			// so convert the string to an array
			if ( line.slice( - 1 ) !== ',' ) {

				currentNode.a = parseNumberArray( currentNode.a );

			}

		},

		// parse "Property70"
		parseNodeSpecialProperty: function ( line, propName, propValue ) {

			// split this
			// P: "Lcl Scaling", "Lcl Scaling", "", "A",1,1,1
			// into array like below
			// ["Lcl Scaling", "Lcl Scaling", "", "A", "1,1,1" ]
			var props = propValue.split( '",' ).map( function ( prop ) {

				return prop.trim().replace( /^\"/, '' ).replace( /\s/, '_' );

			} );

			var innerPropName = props[ 0 ];
			var innerPropType1 = props[ 1 ];
			var innerPropType2 = props[ 2 ];
			var innerPropFlag = props[ 3 ];
			var innerPropValue = props[ 4 ];

			// cast values where needed, otherwise leave as strings
			switch ( innerPropType1 ) {

				case 'int':
				case 'enum':
				case 'bool':
				case 'ULongLong':
				case 'double':
				case 'Number':
				case 'FieldOfView':
					innerPropValue = parseFloat( innerPropValue );
					break;

				case 'Color':
				case 'ColorRGB':
				case 'Vector3D':
				case 'Lcl_Translation':
				case 'Lcl_Rotation':
				case 'Lcl_Scaling':
					innerPropValue = parseNumberArray( innerPropValue );
					break;

			}

			// CAUTION: these props must append to parent's parent
			this.getPrevNode()[ innerPropName ] = {

				'type': innerPropType1,
				'type2': innerPropType2,
				'flag': innerPropFlag,
				'value': innerPropValue

			};

			this.setCurrentProp( this.getPrevNode(), innerPropName );

		},

	};

	// Parse an FBX file in Binary format
	function BinaryParser() {}

	BinaryParser.prototype = {

		constructor: BinaryParser,

		parse: function ( buffer ) {

			var reader = new BinaryReader( buffer );
			reader.skip( 23 ); // skip magic 23 bytes

			var version = reader.getUint32();

			if ( version < 6400 ) {

				throw new Error( 'THREE.FBXLoader: FBX version not supported, FileVersion: ' + version );

			}

			var allNodes = new FBXTree();

			while ( ! this.endOfContent( reader ) ) {

				var node = this.parseNode( reader, version );
				if ( node !== null ) allNodes.add( node.name, node );

			}

			return allNodes;

		},

		// Check if reader has reached the end of content.
		endOfContent: function ( reader ) {

			// footer size: 160bytes + 16-byte alignment padding
			// - 16bytes: magic
			// - padding til 16-byte alignment (at least 1byte?)
			//	(seems like some exporters embed fixed 15 or 16bytes?)
			// - 4bytes: magic
			// - 4bytes: version
			// - 120bytes: zero
			// - 16bytes: magic
			if ( reader.size() % 16 === 0 ) {

				return ( ( reader.getOffset() + 160 + 16 ) & ~ 0xf ) >= reader.size();

			} else {

				return reader.getOffset() + 160 + 16 >= reader.size();

			}

		},

		// recursively parse nodes until the end of the file is reached
		parseNode: function ( reader, version ) {

			var node = {};

			// The first three data sizes depends on version.
			var endOffset = ( version >= 7500 ) ? reader.getUint64() : reader.getUint32();
			var numProperties = ( version >= 7500 ) ? reader.getUint64() : reader.getUint32();

			( version >= 7500 ) ? reader.getUint64() : reader.getUint32(); // the returned propertyListLen is not used

			var nameLen = reader.getUint8();
			var name = reader.getString( nameLen );

			// Regards this node as NULL-record if endOffset is zero
			if ( endOffset === 0 ) return null;

			var propertyList = [];

			for ( var i = 0; i < numProperties; i ++ ) {

				propertyList.push( this.parseProperty( reader ) );

			}

			// Regards the first three elements in propertyList as id, attrName, and attrType
			var id = propertyList.length > 0 ? propertyList[ 0 ] : '';
			var attrName = propertyList.length > 1 ? propertyList[ 1 ] : '';
			var attrType = propertyList.length > 2 ? propertyList[ 2 ] : '';

			// check if this node represents just a single property
			// like (name, 0) set or (name2, [0, 1, 2]) set of {name: 0, name2: [0, 1, 2]}
			node.singleProperty = ( numProperties === 1 && reader.getOffset() === endOffset ) ? true : false;

			while ( endOffset > reader.getOffset() ) {

				var subNode = this.parseNode( reader, version );

				if ( subNode !== null ) this.parseSubNode( name, node, subNode );

			}

			node.propertyList = propertyList; // raw property list used by parent

			if ( typeof id === 'number' ) node.id = id;
			if ( attrName !== '' ) node.attrName = attrName;
			if ( attrType !== '' ) node.attrType = attrType;
			if ( name !== '' ) node.name = name;

			return node;

		},

		parseSubNode: function ( name, node, subNode ) {

			// special case: child node is single property
			if ( subNode.singleProperty === true ) {

				var value = subNode.propertyList[ 0 ];

				if ( Array.isArray( value ) ) {

					node[ subNode.name ] = subNode;

					subNode.a = value;

				} else {

					node[ subNode.name ] = value;

				}

			} else if ( name === 'Connections' && subNode.name === 'C' ) {

				var array = [];

				subNode.propertyList.forEach( function ( property, i ) {

					// first Connection is FBX type (OO, OP, etc.). We'll discard these
					if ( i !== 0 ) array.push( property );

				} );

				if ( node.connections === undefined ) {

					node.connections = [];

				}

				node.connections.push( array );

			} else if ( subNode.name === 'Properties70' ) {

				var keys = Object.keys( subNode );

				keys.forEach( function ( key ) {

					node[ key ] = subNode[ key ];

				} );

			} else if ( name === 'Properties70' && subNode.name === 'P' ) {

				var innerPropName = subNode.propertyList[ 0 ];
				var innerPropType1 = subNode.propertyList[ 1 ];
				var innerPropType2 = subNode.propertyList[ 2 ];
				var innerPropFlag = subNode.propertyList[ 3 ];
				var innerPropValue;

				if ( innerPropName.indexOf( 'Lcl ' ) === 0 ) innerPropName = innerPropName.replace( 'Lcl ', 'Lcl_' );
				if ( innerPropType1.indexOf( 'Lcl ' ) === 0 ) innerPropType1 = innerPropType1.replace( 'Lcl ', 'Lcl_' );

				if ( innerPropType1 === 'Color' || innerPropType1 === 'ColorRGB' || innerPropType1 === 'Vector' || innerPropType1 === 'Vector3D' || innerPropType1.indexOf( 'Lcl_' ) === 0 ) {

					innerPropValue = [
						subNode.propertyList[ 4 ],
						subNode.propertyList[ 5 ],
						subNode.propertyList[ 6 ]
					];

				} else {

					innerPropValue = subNode.propertyList[ 4 ];

				}

				// this will be copied to parent, see above
				node[ innerPropName ] = {

					'type': innerPropType1,
					'type2': innerPropType2,
					'flag': innerPropFlag,
					'value': innerPropValue

				};

			} else if ( node[ subNode.name ] === undefined ) {

				if ( typeof subNode.id === 'number' ) {

					node[ subNode.name ] = {};
					node[ subNode.name ][ subNode.id ] = subNode;

				} else {

					node[ subNode.name ] = subNode;

				}

			} else {

				if ( subNode.name === 'PoseNode' ) {

					if ( ! Array.isArray( node[ subNode.name ] ) ) {

						node[ subNode.name ] = [ node[ subNode.name ] ];

					}

					node[ subNode.name ].push( subNode );

				} else if ( node[ subNode.name ][ subNode.id ] === undefined ) {

					node[ subNode.name ][ subNode.id ] = subNode;

				}

			}

		},

		parseProperty: function ( reader ) {

			var type = reader.getString( 1 );

			switch ( type ) {

				case 'C':
					return reader.getBoolean();

				case 'D':
					return reader.getFloat64();

				case 'F':
					return reader.getFloat32();

				case 'I':
					return reader.getInt32();

				case 'L':
					return reader.getInt64();

				case 'R':
					var length = reader.getUint32();
					return reader.getArrayBuffer( length );

				case 'S':
					var length = reader.getUint32();
					return reader.getString( length );

				case 'Y':
					return reader.getInt16();

				case 'b':
				case 'c':
				case 'd':
				case 'f':
				case 'i':
				case 'l':

					var arrayLength = reader.getUint32();
					var encoding = reader.getUint32(); // 0: non-compressed, 1: compressed
					var compressedLength = reader.getUint32();

					if ( encoding === 0 ) {

						switch ( type ) {

							case 'b':
							case 'c':
								return reader.getBooleanArray( arrayLength );

							case 'd':
								return reader.getFloat64Array( arrayLength );

							case 'f':
								return reader.getFloat32Array( arrayLength );

							case 'i':
								return reader.getInt32Array( arrayLength );

							case 'l':
								return reader.getInt64Array( arrayLength );

						}

					}

					if ( typeof fflate === 'undefined' ) {

						console.error( 'THREE.FBXLoader: External library fflate.min.js required.' );

					}

					var data = Jr( new Uint8Array( reader.getArrayBuffer( compressedLength ) ) ); // eslint-disable-line no-undef
					var reader2 = new BinaryReader( data.buffer );

					switch ( type ) {

						case 'b':
						case 'c':
							return reader2.getBooleanArray( arrayLength );

						case 'd':
							return reader2.getFloat64Array( arrayLength );

						case 'f':
							return reader2.getFloat32Array( arrayLength );

						case 'i':
							return reader2.getInt32Array( arrayLength );

						case 'l':
							return reader2.getInt64Array( arrayLength );

					}

				default:
					throw new Error( 'THREE.FBXLoader: Unknown property type ' + type );

			}

		}

	};

	function BinaryReader( buffer, littleEndian ) {

		this.dv = new DataView( buffer );
		this.offset = 0;
		this.littleEndian = ( littleEndian !== undefined ) ? littleEndian : true;

	}

	BinaryReader.prototype = {

		constructor: BinaryReader,

		getOffset: function () {

			return this.offset;

		},

		size: function () {

			return this.dv.buffer.byteLength;

		},

		skip: function ( length ) {

			this.offset += length;

		},

		// seems like true/false representation depends on exporter.
		// true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
		// then sees LSB.
		getBoolean: function () {

			return ( this.getUint8() & 1 ) === 1;

		},

		getBooleanArray: function ( size ) {

			var a = [];

			for ( var i = 0; i < size; i ++ ) {

				a.push( this.getBoolean() );

			}

			return a;

		},

		getUint8: function () {

			var value = this.dv.getUint8( this.offset );
			this.offset += 1;
			return value;

		},

		getInt16: function () {

			var value = this.dv.getInt16( this.offset, this.littleEndian );
			this.offset += 2;
			return value;

		},

		getInt32: function () {

			var value = this.dv.getInt32( this.offset, this.littleEndian );
			this.offset += 4;
			return value;

		},

		getInt32Array: function ( size ) {

			var a = [];

			for ( var i = 0; i < size; i ++ ) {

				a.push( this.getInt32() );

			}

			return a;

		},

		getUint32: function () {

			var value = this.dv.getUint32( this.offset, this.littleEndian );
			this.offset += 4;
			return value;

		},

		// JavaScript doesn't support 64-bit integer so calculate this here
		// 1 << 32 will return 1 so using multiply operation instead here.
		// There's a possibility that this method returns wrong value if the value
		// is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
		// TODO: safely handle 64-bit integer
		getInt64: function () {

			var low, high;

			if ( this.littleEndian ) {

				low = this.getUint32();
				high = this.getUint32();

			} else {

				high = this.getUint32();
				low = this.getUint32();

			}

			// calculate negative value
			if ( high & 0x80000000 ) {

				high = ~ high & 0xFFFFFFFF;
				low = ~ low & 0xFFFFFFFF;

				if ( low === 0xFFFFFFFF ) high = ( high + 1 ) & 0xFFFFFFFF;

				low = ( low + 1 ) & 0xFFFFFFFF;

				return - ( high * 0x100000000 + low );

			}

			return high * 0x100000000 + low;

		},

		getInt64Array: function ( size ) {

			var a = [];

			for ( var i = 0; i < size; i ++ ) {

				a.push( this.getInt64() );

			}

			return a;

		},

		// Note: see getInt64() comment
		getUint64: function () {

			var low, high;

			if ( this.littleEndian ) {

				low = this.getUint32();
				high = this.getUint32();

			} else {

				high = this.getUint32();
				low = this.getUint32();

			}

			return high * 0x100000000 + low;

		},

		getFloat32: function () {

			var value = this.dv.getFloat32( this.offset, this.littleEndian );
			this.offset += 4;
			return value;

		},

		getFloat32Array: function ( size ) {

			var a = [];

			for ( var i = 0; i < size; i ++ ) {

				a.push( this.getFloat32() );

			}

			return a;

		},

		getFloat64: function () {

			var value = this.dv.getFloat64( this.offset, this.littleEndian );
			this.offset += 8;
			return value;

		},

		getFloat64Array: function ( size ) {

			var a = [];

			for ( var i = 0; i < size; i ++ ) {

				a.push( this.getFloat64() );

			}

			return a;

		},

		getArrayBuffer: function ( size ) {

			var value = this.dv.buffer.slice( this.offset, this.offset + size );
			this.offset += size;
			return value;

		},

		getString: function ( size ) {

			// note: safari 9 doesn't support Uint8Array.indexOf; create intermediate array instead
			var a = [];

			for ( var i = 0; i < size; i ++ ) {

				a[ i ] = this.getUint8();

			}

			var nullByte = a.indexOf( 0 );
			if ( nullByte >= 0 ) a = a.slice( 0, nullByte );

			return LoaderUtils.decodeText( new Uint8Array( a ) );

		}

	};

	// FBXTree holds a representation of the FBX data, returned by the TextParser ( FBX ASCII format)
	// and BinaryParser( FBX Binary format)
	function FBXTree() {}

	FBXTree.prototype = {

		constructor: FBXTree,

		add: function ( key, val ) {

			this[ key ] = val;

		},

	};

	// ************** UTILITY FUNCTIONS **************

	function isFbxFormatBinary( buffer ) {

		var CORRECT = 'Kaydara FBX Binary  \0';

		return buffer.byteLength >= CORRECT.length && CORRECT === convertArrayBufferToString( buffer, 0, CORRECT.length );

	}

	function isFbxFormatASCII( text ) {

		var CORRECT = [ 'K', 'a', 'y', 'd', 'a', 'r', 'a', '\\', 'F', 'B', 'X', '\\', 'B', 'i', 'n', 'a', 'r', 'y', '\\', '\\' ];

		var cursor = 0;

		function read( offset ) {

			var result = text[ offset - 1 ];
			text = text.slice( cursor + offset );
			cursor ++;
			return result;

		}

		for ( var i = 0; i < CORRECT.length; ++ i ) {

			var num = read( 1 );
			if ( num === CORRECT[ i ] ) {

				return false;

			}

		}

		return true;

	}

	function getFbxVersion( text ) {

		var versionRegExp = /FBXVersion: (\d+)/;
		var match = text.match( versionRegExp );

		if ( match ) {

			var version = parseInt( match[ 1 ] );
			return version;

		}

		throw new Error( 'THREE.FBXLoader: Cannot find the version number for the file given.' );

	}

	// Converts FBX ticks into real time seconds.
	function convertFBXTimeToSeconds( time ) {

		return time / 46186158000;

	}

	var dataArray = [];

	// extracts the data from the correct position in the FBX array based on indexing type
	function getData( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

		var index;

		switch ( infoObject.mappingType ) {

			case 'ByPolygonVertex' :
				index = polygonVertexIndex;
				break;
			case 'ByPolygon' :
				index = polygonIndex;
				break;
			case 'ByVertice' :
				index = vertexIndex;
				break;
			case 'AllSame' :
				index = infoObject.indices[ 0 ];
				break;
			default :
				console.warn( 'THREE.FBXLoader: unknown attribute mapping type ' + infoObject.mappingType );

		}

		if ( infoObject.referenceType === 'IndexToDirect' ) index = infoObject.indices[ index ];

		var from = index * infoObject.dataSize;
		var to = from + infoObject.dataSize;

		return slice( dataArray, infoObject.buffer, from, to );

	}

	var tempEuler = new Euler();
	var tempVec = new Vector3();

	// generate transformation from FBX transform data
	// ref: https://help.autodesk.com/view/FBX/2017/ENU/?guid=__files_GUID_10CDD63C_79C1_4F2D_BB28_AD2BE65A02ED_htm
	// ref: http://docs.autodesk.com/FBX/2014/ENU/FBX-SDK-Documentation/index.html?url=cpp_ref/_transformations_2main_8cxx-example.html,topicNumber=cpp_ref__transformations_2main_8cxx_example_htmlfc10a1e1-b18d-4e72-9dc0-70d0f1959f5e
	function generateTransform( transformData ) {

		var lTranslationM = new Matrix4();
		var lPreRotationM = new Matrix4();
		var lRotationM = new Matrix4();
		var lPostRotationM = new Matrix4();

		var lScalingM = new Matrix4();
		var lScalingPivotM = new Matrix4();
		var lScalingOffsetM = new Matrix4();
		var lRotationOffsetM = new Matrix4();
		var lRotationPivotM = new Matrix4();

		var lParentGX = new Matrix4();
		var lParentLX = new Matrix4();
		var lGlobalT = new Matrix4();

		var inheritType = ( transformData.inheritType ) ? transformData.inheritType : 0;

		if ( transformData.translation ) lTranslationM.setPosition( tempVec.fromArray( transformData.translation ) );

		if ( transformData.preRotation ) {

			var array = transformData.preRotation.map( MathUtils.degToRad );
			array.push( transformData.eulerOrder );
			lPreRotationM.makeRotationFromEuler( tempEuler.fromArray( array ) );

		}

		if ( transformData.rotation ) {

			var array = transformData.rotation.map( MathUtils.degToRad );
			array.push( transformData.eulerOrder );
			lRotationM.makeRotationFromEuler( tempEuler.fromArray( array ) );

		}

		if ( transformData.postRotation ) {

			var array = transformData.postRotation.map( MathUtils.degToRad );
			array.push( transformData.eulerOrder );
			lPostRotationM.makeRotationFromEuler( tempEuler.fromArray( array ) );
			lPostRotationM.invert();

		}

		if ( transformData.scale ) lScalingM.scale( tempVec.fromArray( transformData.scale ) );

		// Pivots and offsets
		if ( transformData.scalingOffset ) lScalingOffsetM.setPosition( tempVec.fromArray( transformData.scalingOffset ) );
		if ( transformData.scalingPivot ) lScalingPivotM.setPosition( tempVec.fromArray( transformData.scalingPivot ) );
		if ( transformData.rotationOffset ) lRotationOffsetM.setPosition( tempVec.fromArray( transformData.rotationOffset ) );
		if ( transformData.rotationPivot ) lRotationPivotM.setPosition( tempVec.fromArray( transformData.rotationPivot ) );

		// parent transform
		if ( transformData.parentMatrixWorld ) {

			lParentLX.copy( transformData.parentMatrix );
			lParentGX.copy( transformData.parentMatrixWorld );

		}

		var lLRM = new Matrix4().copy( lPreRotationM ).multiply( lRotationM ).multiply( lPostRotationM );
		// Global Rotation
		var lParentGRM = new Matrix4();
		lParentGRM.extractRotation( lParentGX );

		// Global Shear*Scaling
		var lParentTM = new Matrix4();
		lParentTM.copyPosition( lParentGX );

		var lParentGSM = new Matrix4();
		var lParentGRSM = new Matrix4().copy( lParentTM ).invert().multiply( lParentGX );
		lParentGSM.copy( lParentGRM ).invert().multiply( lParentGRSM );
		var lLSM = lScalingM;

		var lGlobalRS = new Matrix4();

		if ( inheritType === 0 ) {

			lGlobalRS.copy( lParentGRM ).multiply( lLRM ).multiply( lParentGSM ).multiply( lLSM );

		} else if ( inheritType === 1 ) {

			lGlobalRS.copy( lParentGRM ).multiply( lParentGSM ).multiply( lLRM ).multiply( lLSM );

		} else {

			var lParentLSM = new Matrix4().scale( new Vector3().setFromMatrixScale( lParentLX ) );
			var lParentLSM_inv = new Matrix4().copy( lParentLSM ).invert();
			var lParentGSM_noLocal = new Matrix4().copy( lParentGSM ).multiply( lParentLSM_inv );

			lGlobalRS.copy( lParentGRM ).multiply( lLRM ).multiply( lParentGSM_noLocal ).multiply( lLSM );

		}

		var lRotationPivotM_inv = new Matrix4();
		lRotationPivotM_inv.copy( lRotationPivotM ).invert();
		var lScalingPivotM_inv = new Matrix4();
		lScalingPivotM_inv.copy( lScalingPivotM ).invert();
		// Calculate the local transform matrix
		var lTransform = new Matrix4();
		lTransform.copy( lTranslationM ).multiply( lRotationOffsetM ).multiply( lRotationPivotM ).multiply( lPreRotationM ).multiply( lRotationM ).multiply( lPostRotationM ).multiply( lRotationPivotM_inv ).multiply( lScalingOffsetM ).multiply( lScalingPivotM ).multiply( lScalingM ).multiply( lScalingPivotM_inv );

		var lLocalTWithAllPivotAndOffsetInfo = new Matrix4().copyPosition( lTransform );

		var lGlobalTranslation = new Matrix4().copy( lParentGX ).multiply( lLocalTWithAllPivotAndOffsetInfo );
		lGlobalT.copyPosition( lGlobalTranslation );

		lTransform = new Matrix4().copy( lGlobalT ).multiply( lGlobalRS );

		// from global to local
		lTransform.premultiply( lParentGX.invert() );

		return lTransform;

	}

	// Returns the three.js intrinsic Euler order corresponding to FBX extrinsic Euler order
	// ref: http://help.autodesk.com/view/FBX/2017/ENU/?guid=__cpp_ref_class_fbx_euler_html
	function getEulerOrder( order ) {

		order = order || 0;

		var enums = [
			'ZYX', // -> XYZ extrinsic
			'YZX', // -> XZY extrinsic
			'XZY', // -> YZX extrinsic
			'ZXY', // -> YXZ extrinsic
			'YXZ', // -> ZXY extrinsic
			'XYZ', // -> ZYX extrinsic
			//'SphericXYZ', // not possible to support
		];

		if ( order === 6 ) {

			console.warn( 'THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect.' );
			return enums[ 0 ];

		}

		return enums[ order ];

	}

	// Parses comma separated list of numbers and returns them an array.
	// Used internally by the TextParser
	function parseNumberArray( value ) {

		var array = value.split( ',' ).map( function ( val ) {

			return parseFloat( val );

		} );

		return array;

	}

	function convertArrayBufferToString( buffer, from, to ) {

		if ( from === undefined ) from = 0;
		if ( to === undefined ) to = buffer.byteLength;

		return LoaderUtils.decodeText( new Uint8Array( buffer, from, to ) );

	}

	function append( a, b ) {

		for ( var i = 0, j = a.length, l = b.length; i < l; i ++, j ++ ) {

			a[ j ] = b[ i ];

		}

	}

	function slice( a, b, from, to ) {

		for ( var i = from, j = 0; i < to; i ++, j ++ ) {

			a[ j ] = b[ i ];

		}

		return a;

	}

	// inject array a2 into array a1 at index
	function inject( a1, index, a2 ) {

		return a1.slice( 0, index ).concat( a2 ).concat( a1.slice( index ) );

	}

	return FBXLoader;

} )();

class XRHandOculusMeshModel {

	constructor( handModel, controller, path, handedness, options ) {

		this.controller = controller;
		this.handModel = handModel;

		this.bones = [];
		const loader = new FBXLoader();
		const low = options && options.model === 'lowpoly' ? '_low' : '';

		loader.setPath( path );
		loader.load( `OculusHand_${handedness === 'right' ? 'R' : 'L'}${low}.fbx`, object => {

			this.handModel.add( object );
			// Hack because of the scale of the skinnedmesh
			object.scale.setScalar( 0.01 );

			const mesh = object.getObjectByProperty( 'type', 'SkinnedMesh' );
			mesh.frustumCulled = false;
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			const bonesMapping = [
				'b_%_wrist', // XRHand.WRIST,

				'b_%_thumb1', // XRHand.THUMB_METACARPAL,
				'b_%_thumb2', // XRHand.THUMB_PHALANX_PROXIMAL,
				'b_%_thumb3', // XRHand.THUMB_PHALANX_DISTAL,
				'b_%_thumb_null', // XRHand.THUMB_PHALANX_TIP,

				null, //'b_%_index1', // XRHand.INDEX_METACARPAL,
				'b_%_index1', // XRHand.INDEX_PHALANX_PROXIMAL,
				'b_%_index2', // XRHand.INDEX_PHALANX_INTERMEDIATE,
				'b_%_index3', // XRHand.INDEX_PHALANX_DISTAL,
				'b_%_index_null', // XRHand.INDEX_PHALANX_TIP,

				null, //'b_%_middle1', // XRHand.MIDDLE_METACARPAL,
				'b_%_middle1', // XRHand.MIDDLE_PHALANX_PROXIMAL,
				'b_%_middle2', // XRHand.MIDDLE_PHALANX_INTERMEDIATE,
				'b_%_middle3', // XRHand.MIDDLE_PHALANX_DISTAL,
				'b_%_middlenull', // XRHand.MIDDLE_PHALANX_TIP,

				null, //'b_%_ring1', // XRHand.RING_METACARPAL,
				'b_%_ring1', // XRHand.RING_PHALANX_PROXIMAL,
				'b_%_ring2', // XRHand.RING_PHALANX_INTERMEDIATE,
				'b_%_ring3', // XRHand.RING_PHALANX_DISTAL,
				'b_%_ring_inull', // XRHand.RING_PHALANX_TIP,

				'b_%_pinky0', // XRHand.LITTLE_METACARPAL,
				'b_%_pinky1', // XRHand.LITTLE_PHALANX_PROXIMAL,
				'b_%_pinky2', // XRHand.LITTLE_PHALANX_INTERMEDIATE,
				'b_%_pinky3', // XRHand.LITTLE_PHALANX_DISTAL,
				'b_%_pinkynull', // XRHand.LITTLE_PHALANX_TIP
			];

			const joints = [
				'wrist',
				'thumb-metacarpal',
				'thumb-phalanx-proximal',
				'thumb-phalanx-distal',
				'thumb-tip',
				'index-finger-metacarpal',
				'index-finger-phalanx-proximal',
				'index-finger-phalanx-intermediate',
				'index-finger-phalanx-distal',
				'index-finger-tip',
				'middle-finger-metacarpal',
				'middle-finger-phalanx-proximal',
				'middle-finger-phalanx-intermediate',
				'middle-finger-phalanx-distal',
				'middle-finger-tip',
				'ring-finger-metacarpal',
				'ring-finger-phalanx-proximal',
				'ring-finger-phalanx-intermediate',
				'ring-finger-phalanx-distal',
				'ring-finger-tip',
				'pinky-finger-metacarpal',
				'pinky-finger-phalanx-proximal',
				'pinky-finger-phalanx-intermediate',
				'pinky-finger-phalanx-distal',
				'pinky-finger-tip',
			];

			let i = 0;

			bonesMapping.forEach( boneName => {

				if ( boneName ) {

					const bone = object.getObjectByName( boneName.replace( /%/g, handedness === 'right' ? 'r' : 'l' ) );

					if ( bone !== undefined) {

						bone.jointName = joints [ i ];

					}

					this.bones.push( bone );

				} else {

					this.bones.push( null );

				}

				i ++;

			} );

		} );

	}

	updateMesh() {

		// XR Joints
		const XRJoints = this.controller.joints;
		for ( let i = 0; i < this.bones.length; i ++ ) {

			const bone = this.bones[ i ];

			if ( bone ) {

				const XRJoint = XRJoints[ bone.jointName ];

				if ( XRJoint.visible ) {

					const position = XRJoint.position;

					if ( bone ) {

						bone.position.copy( position.clone().multiplyScalar( 100 ) );
						bone.quaternion.copy( XRJoint.quaternion );
						// bone.scale.setScalar( XRJoint.jointRadius || defaultRadius );

					}

				}

			}

		}

	}

}

function XRHandModel( controller ) {

	Object3D.call( this );

	this.controller = controller;
	this.motionController = null;
	this.envMap = null;

	this.mesh = null;

}

XRHandModel.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: XRHandModel,

	updateMatrixWorld: function ( force ) {

		Object3D.prototype.updateMatrixWorld.call( this, force );

		if ( this.motionController ) {

			this.motionController.updateMesh();

		}

	},
} );


const XRHandModelFactory = ( function () {

	function XRHandModelFactory() {

		this.path = '';

	}

	XRHandModelFactory.prototype = {

		constructor: XRHandModelFactory,

		setPath: function ( path ) {

			this.path = path;
			return this;

		},

		createHandModel: function ( controller, profile, options ) {

			const handModel = new XRHandModel( controller );

			controller.addEventListener( 'connected', ( event ) => {

				const xrInputSource = event.data;

				if ( xrInputSource.hand && ! handModel.motionController ) {

					handModel.visible = true;
					handModel.xrInputSource = xrInputSource;

					// @todo Detect profile if not provided
					if ( profile === undefined || profile === 'spheres' ) {

						handModel.motionController = new XRHandPrimitiveModel( handModel, controller, this.path, xrInputSource.handedness, { primitive: 'sphere' } );

					} else if ( profile === 'boxes' ) {

						handModel.motionController = new XRHandPrimitiveModel( handModel, controller, this.path, xrInputSource.handedness, { primitive: 'box' } );

					} else if ( profile === 'oculus' ) {

						handModel.motionController = new XRHandOculusMeshModel( handModel, controller, this.path, xrInputSource.handedness, options );

					}

				}

			} );

			controller.addEventListener( 'disconnected', () => {

				// handModel.motionController = null;
				// handModel.remove( scene );
				// scene = null;

			} );

			return handModel;

		}

	};

	return XRHandModelFactory;

} )();

export { XRHandModelFactory };
