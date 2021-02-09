import { am as Group, _ as SphereGeometry, a0 as BoxGeometry, a7 as MeshStandardMaterial, l as Mesh, aP as Vector4, g as Vector3, aQ as Curve, i as Loader, a4 as LoaderUtils, a5 as FileLoader, r as TextureLoader, ac as RepeatWrapping, ax as ClampToEdgeWrapping, T as Texture, J as MeshPhongMaterial, aR as MeshLambertMaterial, a as Color, v as sRGBEncoding, aS as EquirectangularReflectionMapping, M as Matrix4, aq as Bone, ag as PropertyBinding, $ as Object3D, O as OrthographicCamera, P as PerspectiveCamera, a1 as PointLight, an as MathUtils, K as SpotLight, a3 as DirectionalLight, ah as SkinnedMesh, af as LineBasicMaterial, aj as Line, ar as Skeleton, w as AmbientLight, p as BufferGeometry, aT as Float32BufferAttribute, aU as Uint16BufferAttribute, aV as Matrix3, q as BufferAttribute, ap as AnimationClip, Q as Quaternion, aW as Euler, aE as VectorKeyframeTrack, aF as QuaternionKeyframeTrack, aG as NumberKeyframeTrack } from '../../../../common/three.module-1fff554e.js';

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
var t={},n=Uint8Array,r=Uint16Array,i=Uint32Array,e=new n([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),o=new n([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),a=new n([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),f=function(t,n){for(var e=new r(31),o=0;o<31;++o)e[o]=n+=1<<t[o-1];var a=new i(e[30]);for(o=1;o<30;++o)for(var f=e[o];f<e[o+1];++f)a[f]=f-e[o]<<5|o;return [e,a]},s=f(e,2),u=s[0],h=s[1];u[28]=258,h[258]=28;for(var c=f(o,0),l=c[0],p=c[1],v=new r(32768),d=0;d<32768;++d){var g=(43690&d)>>>1|(21845&d)<<1;g=(61680&(g=(52428&g)>>>2|(13107&g)<<2))>>>4|(3855&g)<<4,v[d]=((65280&g)>>>8|(255&g)<<8)>>>1;}var y=function(t,n,i){for(var e=t.length,o=0,a=new r(n);o<e;++o)++a[t[o]-1];var f,s=new r(n);for(o=0;o<n;++o)s[o]=s[o-1]+a[o-1]<<1;if(i){f=new r(1<<n);var u=15-n;for(o=0;o<e;++o)if(t[o])for(var h=o<<4|t[o],c=n-t[o],l=s[t[o]-1]++<<c,p=l|(1<<c)-1;l<=p;++l)f[v[l]>>>u]=h;}else for(f=new r(e),o=0;o<e;++o)f[o]=v[s[t[o]-1]++]>>>15-t[o];return f},w=new n(288);for(d=0;d<144;++d)w[d]=8;for(d=144;d<256;++d)w[d]=9;for(d=256;d<280;++d)w[d]=7;for(d=280;d<288;++d)w[d]=8;var m=new n(32);for(d=0;d<32;++d)m[d]=5;var b=y(w,9,0),x=y(w,9,1),z=y(m,5,0),S=y(m,5,1),k=function(t){for(var n=t[0],r=1;r<t.length;++r)t[r]>n&&(n=t[r]);return n},M=function(t,n,r){var i=n/8>>0;return (t[i]|t[i+1]<<8)>>>(7&n)&r},C=function(t,n){var r=n/8>>0;return (t[r]|t[r+1]<<8|t[r+2]<<16)>>>(7&n)},U=function(t){return (t/8>>0)+(7&t&&1)},A=function(t,e,o){(null==e||e<0)&&(e=0),(null==o||o>t.length)&&(o=t.length);var a=new(t instanceof r?r:t instanceof i?i:n)(o-e);return a.set(t.subarray(e,o)),a},O=function(t,r,i){var f=t.length,s=!r||i,h=!i||i.i;i||(i={}),r||(r=new n(3*f));var c=function(t){var i=r.length;if(t>i){var e=new n(Math.max(2*i,t));e.set(r),r=e;}},p=i.f||0,v=i.p||0,d=i.b||0,g=i.l,w=i.d,m=i.m,b=i.n,z=8*f;do{if(!g){i.f=p=M(t,v,1);var O=M(t,v+1,3);if(v+=3,!O){var T=t[(H=U(v)+4)-4]|t[H-3]<<8,D=H+T;if(D>f){if(h)throw "unexpected EOF";break}s&&c(d+T),r.set(t.subarray(H,D),d),i.b=d+=T,i.p=v=8*D;continue}if(1==O)g=x,w=S,m=9,b=5;else {if(2!=O)throw "invalid block type";var F=M(t,v,31)+257,E=M(t,v+10,15)+4,I=F+M(t,v+5,31)+1;v+=14;for(var Z=new n(I),j=new n(19),G=0;G<E;++G)j[a[G]]=M(t,v+3*G,7);v+=3*E;var L=k(j),R=(1<<L)-1;if(!h&&v+I*(L+7)>z)break;var B=y(j,L,1);for(G=0;G<I;){var H,P=B[M(t,v,R)];if(v+=15&P,(H=P>>>4)<16)Z[G++]=H;else {var W=0,Y=0;for(16==H?(Y=3+M(t,v,3),v+=2,W=Z[G-1]):17==H?(Y=3+M(t,v,7),v+=3):18==H&&(Y=11+M(t,v,127),v+=7);Y--;)Z[G++]=W;}}var q=Z.subarray(0,F),J=Z.subarray(F);m=k(q),b=k(J),g=y(q,m,1),w=y(J,b,1);}if(v>z)throw "unexpected EOF"}s&&c(d+131072);for(var K=(1<<m)-1,N=(1<<b)-1,Q=m+b+18;h||v+Q<z;){var V=(W=g[C(t,v)&K])>>>4;if((v+=15&W)>z)throw "unexpected EOF";if(!W)throw "invalid length/literal";if(V<256)r[d++]=V;else {if(256==V){g=null;break}var X=V-254;if(V>264){var $=e[G=V-257];X=M(t,v,(1<<$)-1)+u[G],v+=$;}var _=w[C(t,v)&N],tt=_>>>4;if(!_)throw "invalid distance";v+=15&_;J=l[tt];if(tt>3){$=o[tt];J+=C(t,v)&(1<<$)-1,v+=$;}if(v>z)throw "unexpected EOF";s&&c(d+131072);for(var nt=d+X;d<nt;d+=4)r[d]=r[d-J],r[d+1]=r[d+1-J],r[d+2]=r[d+2-J],r[d+3]=r[d+3-J];d=nt;}}i.l=g,i.p=v,i.b=d,g&&(p=1,i.m=m,i.d=w,i.n=b);}while(!p);return d==r.length?r:A(r,0,d)},T=function(t,n,r){r<<=7&n;var i=n/8>>0;t[i]|=r,t[i+1]|=r>>>8;},D=function(t,n,r){r<<=7&n;var i=n/8>>0;t[i]|=r,t[i+1]|=r>>>8,t[i+2]|=r>>>16;},F=function(t,i){for(var e=[],o=0;o<t.length;++o)t[o]&&e.push({s:o,f:t[o]});var a=e.length,f=e.slice();if(!a)return [new n(0),0];if(1==a){var s=new n(e[0].s+1);return s[e[0].s]=1,[s,1]}e.sort((function(t,n){return t.f-n.f})),e.push({s:-1,f:25001});var u=e[0],h=e[1],c=0,l=1,p=2;for(e[0]={s:-1,f:u.f+h.f,l:u,r:h};l!=a-1;)u=e[e[c].f<e[p].f?c++:p++],h=e[c!=l&&e[c].f<e[p].f?c++:p++],e[l++]={s:-1,f:u.f+h.f,l:u,r:h};var v=f[0].s;for(o=1;o<a;++o)f[o].s>v&&(v=f[o].s);var d=new r(v+1),g=E(e[l-1],d,0);if(g>i){o=0;var y=0,w=g-i,m=1<<w;for(f.sort((function(t,n){return d[n.s]-d[t.s]||t.f-n.f}));o<a;++o){var b=f[o].s;if(!(d[b]>i))break;y+=m-(1<<g-d[b]),d[b]=i;}for(y>>>=w;y>0;){var x=f[o].s;d[x]<i?y-=1<<i-d[x]++-1:++o;}for(;o>=0&&y;--o){var z=f[o].s;d[z]==i&&(--d[z],++y);}g=i;}return [new n(d),g]},E=function(t,n,r){return -1==t.s?Math.max(E(t.l,n,r+1),E(t.r,n,r+1)):n[t.s]=r},I=function(t){for(var n=t.length;n&&!t[--n];);for(var i=new r(++n),e=0,o=t[0],a=1,f=function(t){i[e++]=t;},s=1;s<=n;++s)if(t[s]==o&&s!=n)++a;else {if(!o&&a>2){for(;a>138;a-=138)f(32754);a>2&&(f(a>10?a-11<<5|28690:a-3<<5|12305),a=0);}else if(a>3){for(f(o),--a;a>6;a-=6)f(8304);a>2&&(f(a-3<<5|8208),a=0);}for(;a--;)f(o);a=1,o=t[s];}return [i.subarray(0,e),n]},Z=function(t,n){for(var r=0,i=0;i<n.length;++i)r+=t[i]*n[i];return r},j=function(t,n,r){var i=r.length,e=U(n+2);t[e]=255&i,t[e+1]=i>>>8,t[e+2]=255^t[e],t[e+3]=255^t[e+1];for(var o=0;o<i;++o)t[e+o+4]=r[o];return 8*(e+4+i)},G=function(t,n,i,f,s,u,h,c,l,p,v){T(n,v++,i),++s[256];for(var d=F(s,15),g=d[0],x=d[1],S=F(u,15),k=S[0],M=S[1],C=I(g),U=C[0],A=C[1],O=I(k),E=O[0],G=O[1],L=new r(19),R=0;R<U.length;++R)L[31&U[R]]++;for(R=0;R<E.length;++R)L[31&E[R]]++;for(var B=F(L,7),H=B[0],P=B[1],W=19;W>4&&!H[a[W-1]];--W);var Y,q,J,K,N=p+5<<3,Q=Z(s,w)+Z(u,m)+h,V=Z(s,g)+Z(u,k)+h+14+3*W+Z(L,H)+(2*L[16]+3*L[17]+7*L[18]);if(N<=Q&&N<=V)return j(n,v,t.subarray(l,l+p));if(T(n,v,1+(V<Q)),v+=2,V<Q){Y=y(g,x,0),q=g,J=y(k,M,0),K=k;var X=y(H,P,0);T(n,v,A-257),T(n,v+5,G-1),T(n,v+10,W-4),v+=14;for(R=0;R<W;++R)T(n,v+3*R,H[a[R]]);v+=3*W;for(var $=[U,E],_=0;_<2;++_){var tt=$[_];for(R=0;R<tt.length;++R){var nt=31&tt[R];T(n,v,X[nt]),v+=H[nt],nt>15&&(T(n,v,tt[R]>>>5&127),v+=tt[R]>>>12);}}}else Y=b,q=w,J=z,K=m;for(R=0;R<c;++R)if(f[R]>255){nt=f[R]>>>18&31;D(n,v,Y[nt+257]),v+=q[nt+257],nt>7&&(T(n,v,f[R]>>>23&31),v+=e[nt]);var rt=31&f[R];D(n,v,J[rt]),v+=K[rt],rt>3&&(D(n,v,f[R]>>>5&8191),v+=o[rt]);}else D(n,v,Y[f[R]]),v+=q[f[R]];return D(n,v,Y[256]),v+q[256]},L=new i([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),R=new n(0),B=function(t,a,f,s,u,c){var l=t.length,v=new n(s+l+5*(1+Math.ceil(l/7e3))+u),d=v.subarray(s,v.length-u),g=0;if(!a||l<8)for(var y=0;y<=l;y+=65535){var w=y+65535;w<l?g=j(d,g,t.subarray(y,w)):(d[y]=c,g=j(d,g,t.subarray(y,l)));}else {for(var m=L[a-1],b=m>>>13,x=8191&m,z=(1<<f)-1,S=new r(32768),k=new r(z+1),M=Math.ceil(f/3),C=2*M,O=function(n){return (t[n]^t[n+1]<<M^t[n+2]<<C)&z},T=new i(25e3),D=new r(288),F=new r(32),E=0,I=0,Z=(y=0,0),B=0,H=0;y<l;++y){var P=O(y),W=32767&y,Y=k[P];if(S[W]=Y,k[P]=W,B<=y){var q=l-y;if((E>7e3||Z>24576)&&q>423){g=G(t,d,0,T,D,F,I,Z,H,y-H,g),Z=E=I=0,H=y;for(var J=0;J<286;++J)D[J]=0;for(J=0;J<30;++J)F[J]=0;}var K=2,N=0,Q=x,V=W-Y&32767;if(q>2&&P==O(y-V))for(var X=Math.min(b,q)-1,$=Math.min(32767,y),_=Math.min(258,q);V<=$&&--Q&&W!=Y;){if(t[y+K]==t[y+K-V]){for(var tt=0;tt<_&&t[y+tt]==t[y+tt-V];++tt);if(tt>K){if(K=tt,N=V,tt>X)break;var nt=Math.min(V,tt-2),rt=0;for(J=0;J<nt;++J){var it=y-V+J+32768&32767,et=it-S[it]+32768&32767;et>rt&&(rt=et,Y=it);}}}V+=(W=Y)-(Y=S[W])+32768&32767;}if(N){T[Z++]=268435456|h[K]<<18|p[N];var ot=31&h[K],at=31&p[N];I+=e[ot]+o[at],++D[257+ot],++F[at],B=y+K,++E;}else T[Z++]=t[y],++D[t[y]];}}g=G(t,d,c,T,D,F,I,Z,H,y-H,g),!c&&7&g&&(g=j(d,g+1,R));}return A(v,0,s+U(g)+u)},H=function(){for(var t=new i(256),n=0;n<256;++n){for(var r=n,e=9;--e;)r=(1&r&&3988292384)^r>>>1;t[n]=r;}return t}(),P=function(){var t=4294967295;return {p:function(n){for(var r=t,i=0;i<n.length;++i)r=H[255&r^n[i]]^r>>>8;t=r;},d:function(){return 4294967295^t}}},W=function(){var t=1,n=0;return {p:function(r){for(var i=t,e=n,o=r.length,a=0;a!=o;){for(var f=Math.min(a+5552,o);a<f;++a)e+=i+=r[a];i%=65521,e%=65521;}t=i,n=e;},d:function(){return (t>>>8<<16|(255&n)<<8|n>>>8)+2*((255&t)<<23)}}},Y=function(t,n,r,i,e){return B(t,null==n.level?6:n.level,null==n.mem?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(t.length)))):12+n.mem,r,i,!e)},q=function(t,n){var r={};for(var i in t)r[i]=t[i];for(var i in n)r[i]=n[i];return r},J=function(t,n,r){for(var i=t(),e=t.toString(),o=e.slice(e.indexOf("[")+1,e.lastIndexOf("]")).replace(/ /g,"").split(","),a=0;a<i.length;++a){var f=i[a],s=o[a];if("function"==typeof f){n+=";"+s+"=";var u=f.toString();if(f.prototype)if(-1!=u.indexOf("[native code]")){var h=u.indexOf(" ",8)+1;n+=u.slice(h,u.indexOf("(",h));}else for(var c in n+=u,f.prototype)n+=";"+s+".prototype."+c+"="+f.prototype[c].toString();else n+=u;}else r[s]=f;}return [n,r]},K=[],N=function(e,o,a,f){var s;if(!K[a]){for(var u="",h={},c=e.length-1,l=0;l<c;++l)u=(s=J(e[l],u,h))[0],h=s[1];K[a]=J(e[c],u,h);}var p=q({},K[a][1]);return function(n,r,i,e,o){var a=t[r]||(t[r]=URL.createObjectURL(new Blob([n],{type:"text/javascript"}))),f=new Worker(a);return f.onerror=function(t){o(t.error,null);},f.onmessage=function(t){o(null,t.data);},f.postMessage(i,e),f}(K[a][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+o.toString()+"}",a,p,function(t){var e=[];for(var o in t)(t[o]instanceof n||t[o]instanceof r||t[o]instanceof i)&&e.push((t[o]=new t[o].constructor(t[o])).buffer);return e}(p),f)},Q=function(){return [n,r,i,e,o,a,u,l,x,S,v,y,k,M,C,U,A,O,inflateSync,nt,rt]},V=function(){return [n,r,i,e,o,a,h,p,b,w,z,m,v,L,R,y,T,D,F,E,I,Z,j,G,U,A,B,Y,deflateSync,nt]},X=function(){return [ht,pt,ut,P,H]},$=function(){return [ct,lt]},_=function(){return [vt,ut,W]},tt=function(){return [dt]},nt=function(t){return postMessage(t,[t.buffer])},rt=function(t){return t&&t.size&&new n(t.size)},it=function(t,r,i,e,o,a){var f=N(i,e,o,(function(t,n){f.terminate(),a(t,n);}));return r.consume||(t=new n(t)),f.postMessage([t,r],[t.buffer]),function(){f.terminate();}},et=function(t){return t.ondata=function(t,n){return postMessage([t,n],[t.buffer])},function(n){return t.push(n.data[0],n.data[1])}},ot=function(t,n,r,i,e){var o,a=N(t,i,e,(function(t,r){t?(a.terminate(),n.ondata.call(n,t)):(r[1]&&a.terminate(),n.ondata.call(n,t,r[0],r[1]));}));a.postMessage(r),n.push=function(t,r){if(o)throw "stream finished";if(!n.ondata)throw "no stream handler";a.postMessage([t,o=r],[t.buffer]);},n.terminate=function(){a.terminate();};},at=function(t,n){return t[n]|t[n+1]<<8},ft=function(t,n){return (t[n]|t[n+1]<<8|t[n+2]<<16)+2*(t[n+3]<<23)},st=function(t,n){return ft(t,n)|4294967296*ft(t,n)},ut=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8;},ht=function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&ut(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var i=0;i<=r.length;++i)t[i+10]=r.charCodeAt(i);}},ct=function(t){if(31!=t[0]||139!=t[1]||8!=t[2])throw "invalid gzip data";var n=t[3],r=10;4&n&&(r+=t[10]|2+(t[11]<<8));for(var i=(n>>3&1)+(n>>4&1);i>0;i-=!t[r++]);return r+(2&n)},lt=function(t){var n=t.length;return (t[n-4]|t[n-3]<<8|t[n-2]<<16)+2*(t[n-1]<<23)},pt=function(t){return 10+(t.filename&&t.filename.length+1||0)},vt=function(t,n){var r=n.level,i=0==r?0:r<6?1:9==r?3:2;t[0]=120,t[1]=i<<6|(i?32-2*i:1);},dt=function(t){if(8!=(15&t[0])||t[0]>>>4>7||(t[0]<<8|t[1])%31)throw "invalid zlib data";if(32&t[1])throw "invalid zlib data: preset dictionaries not supported"};function gt(t,n){return n||"function"!=typeof t||(n=t,t={}),this.ondata=n,t}var yt=function(){function t(t,n){n||"function"!=typeof t||(n=t,t={}),this.ondata=n,this.o=t||{};}return t.prototype.p=function(t,n){this.ondata(Y(t,this.o,0,0,!n),n);},t.prototype.push=function(t,n){if(this.d)throw "stream finished";if(!this.ondata)throw "no stream handler";this.d=n,this.p(t,n||!1);},t}();var wt=function(){return function(t,n){ot([V,function(){return [et,yt]}],this,gt.call(this,t,n),(function(t){var n=new yt(t.data);onmessage=et(n);}),6);}}();function deflate(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw "no callback";return it(t,n,[V],(function(t){return nt(deflateSync(t.data[0],t.data[1]))}),0,r)}function deflateSync(t,n){return void 0===n&&(n={}),Y(t,n,0,0)}var mt=function(){function t(t){this.s={},this.p=new n(0),this.ondata=t;}return t.prototype.e=function(t){if(this.d)throw "stream finished";if(!this.ondata)throw "no stream handler";var r=this.p.length,i=new n(r+t.length);i.set(this.p),i.set(t,r),this.p=i;},t.prototype.c=function(t){this.d=this.s.i=t||!1;var n=this.s.b,r=O(this.p,this.o,this.s);this.ondata(A(r,n,this.s.b),this.d),this.o=A(r,this.s.b-32768),this.s.b=this.o.length,this.p=A(this.p,this.s.p/8>>0),this.s.p&=7;},t.prototype.push=function(t,n){this.e(t),this.c(n);},t}();var bt=function(){return function(t){this.ondata=t,ot([Q,function(){return [et,mt]}],this,0,(function(){var t=new mt;onmessage=et(t);}),7);}}();function inflate(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw "no callback";return it(t,n,[Q],(function(t){return nt(inflateSync(t.data[0],rt(t.data[1])))}),1,r)}function inflateSync(t,n){return O(t,n)}var xt=function(){function t(t,n){this.c=P(),this.l=0,this.v=1,yt.call(this,t,n);}return t.prototype.push=function(t,n){yt.prototype.push.call(this,t,n);},t.prototype.p=function(t,n){this.c.p(t),this.l+=t.length;var r=Y(t,this.o,this.v&&pt(this.o),n&&8,!n);this.v&&(ht(r,this.o),this.v=0),n&&(ut(r,r.length-8,this.c.d()),ut(r,r.length-4,this.l)),this.ondata(r,n);},t}();var zt=function(){return function(t,n){ot([V,X,function(){return [et,yt,xt]}],this,gt.call(this,t,n),(function(t){var n=new xt(t.data);onmessage=et(n);}),8);}}();function gzip(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw "no callback";return it(t,n,[V,X,function(){return [gzipSync]}],(function(t){return nt(gzipSync(t.data[0],t.data[1]))}),2,r)}function gzipSync(t,n){void 0===n&&(n={});var r=P(),i=t.length;r.p(t);var e=Y(t,n,pt(n),8),o=e.length;return ht(e,n),ut(e,o-8,r.d()),ut(e,o-4,i),e}var St=function(){function t(t){this.v=1,mt.call(this,t);}return t.prototype.push=function(t,n){if(mt.prototype.e.call(this,t),this.v){var r=ct(this.p);if(r>=this.p.length&&!n)return;this.p=this.p.subarray(r),this.v=0;}if(n){if(this.p.length<8)throw "invalid gzip stream";this.p=this.p.subarray(0,-8);}mt.prototype.c.call(this,n);},t}();var kt=function(){return function(t){this.ondata=t,ot([Q,$,function(){return [et,mt,St]}],this,0,(function(){var t=new St;onmessage=et(t);}),9);}}();function gunzip(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw "no callback";return it(t,n,[Q,$,function(){return [gunzipSync]}],(function(t){return nt(gunzipSync(t.data[0]))}),3,r)}function gunzipSync(t,r){return O(t.subarray(ct(t),-8),r||new n(lt(t)))}var Mt=function(){function t(t,n){this.c=W(),this.v=1,yt.call(this,t,n);}return t.prototype.push=function(t,n){yt.prototype.push.call(this,t,n);},t.prototype.p=function(t,n){this.c.p(t);var r=Y(t,this.o,this.v&&2,n&&4,!n);this.v&&(vt(r,this.o),this.v=0),n&&ut(r,r.length-4,this.c.d()),this.ondata(r,n);},t}();var Ct=function(){return function(t,n){ot([V,_,function(){return [et,yt,Mt]}],this,gt.call(this,t,n),(function(t){var n=new Mt(t.data);onmessage=et(n);}),10);}}();function zlib(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw "no callback";return it(t,n,[V,_,function(){return [zlibSync]}],(function(t){return nt(zlibSync(t.data[0],t.data[1]))}),4,r)}function zlibSync(t,n){void 0===n&&(n={});var r=W();r.p(t);var i=Y(t,n,2,4);return vt(i,n),ut(i,i.length-4,r.d()),i}var Ut=function(){function t(t){this.v=1,mt.call(this,t);}return t.prototype.push=function(t,n){if(mt.prototype.e.call(this,t),this.v){if(this.p.length<2&&!n)return;this.p=this.p.subarray(2),this.v=0;}if(n){if(this.p.length<4)throw "invalid zlib stream";this.p=this.p.subarray(0,-4);}mt.prototype.c.call(this,n);},t}();var At=function(){return function(t){this.ondata=t,ot([Q,tt,function(){return [et,mt,Ut]}],this,0,(function(){var t=new Ut;onmessage=et(t);}),11);}}();function unzlib(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw "no callback";return it(t,n,[Q,tt,function(){return [unzlibSync]}],(function(t){return nt(unzlibSync(t.data[0],rt(t.data[1])))}),5,r)}function unzlibSync(t,n){return O((dt(t),t.subarray(2,-4)),n)}var Ot=function(){function t(t){this.G=St,this.I=mt,this.Z=Ut,this.ondata=t;}return t.prototype.push=function(t,r){if(!this.ondata)throw "no stream handler";if(this.s)this.s.push(t,r);else {if(this.p&&this.p.length){var i=new n(this.p.length+t.length);i.set(this.p),i.set(t,this.p.length);}else this.p=t;if(this.p.length>2){var e=this,o=function(){e.ondata.apply(e,arguments);};this.s=31==this.p[0]&&139==this.p[1]&&8==this.p[2]?new this.G(o):8!=(15&this.p[0])||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(o):new this.Z(o),this.s.push(this.p,r),this.p=null;}}},t}();var Tt=function(){function t(t){this.G=kt,this.I=bt,this.Z=At,this.ondata=t;}return t.prototype.push=function(t,n){Ot.prototype.push.call(this,t,n);},t}();function decompress(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw "no callback";return 31==t[0]&&139==t[1]&&8==t[2]?gunzip(t,n,r):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?inflate(t,n,r):unzlib(t,n,r)}function decompressSync(t,n){return 31==t[0]&&139==t[1]&&8==t[2]?gunzipSync(t,n):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?inflateSync(t,n):unzlibSync(t,n)}var Dt=function(t,r,i,e){for(var o in t){var a=t[o],f=r+o;a instanceof n?i[f]=[a,e]:Array.isArray(a)?i[f]=[a[0],q(e,a[1])]:Dt(a,f+"/",i,e);}},Ft="undefined"!=typeof TextEncoder&&new TextEncoder,Et="undefined"!=typeof TextDecoder&&new TextDecoder,It=0;try{Et.decode(R,{stream:!0}),It=1;}catch(t){}var Zt=function(t){for(var n="",r=0;;){var i=t[r++],e=(i>127)+(i>223)+(i>239);if(r+e>t.length)return [n,t.slice(r-1)];e?3==e?(i=((15&i)<<18|(63&t[r++])<<12|(63&t[r++])<<6|63&t[r++])-65536,n+=String.fromCharCode(55296|i>>10,56320|1023&i)):n+=1&e?String.fromCharCode((31&i)<<6|63&t[r++]):String.fromCharCode((15&i)<<12|(63&t[r++])<<6|63&t[r++]):n+=String.fromCharCode(i);}},jt=function(){function t(t){this.ondata=t,It?this.t=new TextDecoder:this.p=R;}return t.prototype.push=function(t,r){if(!this.ondata)throw "no callback";if(r||(r=!1),this.t)return this.ondata(this.t.decode(t,{stream:!r}),r);var i=new n(this.p.length+t.length);i.set(this.p),i.set(t,this.p.length);var e=Zt(i),o=e[0],a=e[1];if(r&&a.length)throw "invalid utf-8 data";this.p=a,this.ondata(o,r);},t}();var Gt=function(){function t(t){this.ondata=t;}return t.prototype.push=function(t,n){if(!this.ondata)throw "no callback";this.ondata(strToU8(t),n||!1);},t}();function strToU8(t,r){if(r){for(var i=new n(t.length),e=0;e<t.length;++e)i[e]=t.charCodeAt(e);return i}if(Ft)return Ft.encode(t);var o=t.length,a=new n(t.length+(t.length>>1)),f=0,s=function(t){a[f++]=t;};for(e=0;e<o;++e){if(f+5>a.length){var u=new n(f+8+(o-e<<1));u.set(a),a=u;}var h=t.charCodeAt(e);h<128||r?s(h):h<2048?(s(192|h>>>6),s(128|63&h)):h>55295&&h<57344?(s(240|(h=65536+(1047552&h)|1023&t.charCodeAt(++e))>>>18),s(128|h>>>12&63),s(128|h>>>6&63),s(128|63&h)):(s(224|h>>>12),s(128|h>>>6&63),s(128|63&h));}return A(a,0,f)}function strFromU8(t,n){if(n){for(var r="",i=0;i<t.length;i+=16384)r+=String.fromCharCode.apply(null,t.subarray(i,i+16384));return r}if(Et)return Et.decode(t);var e=Zt(t),o=e[0];if(e[1].length)throw "invalid utf-8 data";return o}var Lt=function(t){return 1==t?3:t<6?2:9==t?1:0},Rt=function(t,n){return n+30+at(t,n+26)+at(t,n+28)},Bt=function(t,n,r){var i=at(t,n+28),e=strFromU8(t.subarray(n+46,n+46+i),!(2048&at(t,n+8))),o=n+46+i,a=ft(t,n+20),f=r&&4294967295==a?Ht(t,o):[a,ft(t,n+24),ft(t,n+42)],s=f[0],u=f[1],h=f[2];return [at(t,n+10),s,u,e,o+at(t,n+30)+at(t,n+32),h]},Ht=function(t,n){for(;1!=at(t,n);n+=4+at(t,n+2));return [st(t,n+12),st(t,n+4),st(t,n+20)]},Pt=function(t,n,r,i,e,o,a){var f=i.length;ut(t,n,null!=a?33639248:67324752),n+=4,null!=a&&(t[n++]=20,t[n++]=r.os),t[n]=20,n+=2,t[n++]=r.flag<<1|(null==o&&8),t[n++]=e&&8,t[n++]=255&r.compression,t[n++]=r.compression>>8;var s=new Date(null==r.mtime?Date.now():r.mtime),u=s.getFullYear()-1980;if(u<0||u>119)throw "date not in range 1980-2099";return ut(t,n,2*(u<<24)|s.getMonth()+1<<21|s.getDate()<<16|s.getHours()<<11|s.getMinutes()<<5|s.getSeconds()>>>1),n+=4,null!=o&&(ut(t,n,r.crc),ut(t,n+4,o),ut(t,n+8,r.size)),ut(t,n+12,f),n+=16,null!=a&&(ut(t,n+6,r.attrs),ut(t,n+10,a),n+=14),t.set(i,n),n+f},Wt=function(t,n,r,i,e){ut(t,n,101010256),ut(t,n+8,r),ut(t,n+10,r),ut(t,n+12,i),ut(t,n+16,e);},Yt=function(){function t(t){this.filename=t,this.c=P(),this.size=0,this.compression=0;}return t.prototype.process=function(t,n){this.ondata(null,t,n);},t.prototype.push=function(t,n){if(!this.ondata)throw "no callback - add to ZIP archive before pushing";this.c.p(t),this.size+=t.length,n&&(this.crc=this.c.d()),this.process(t,n||!1);},t}();var qt=function(){function t(t,n){var r=this;void 0===n&&(n={}),Yt.call(this,t),this.d=new yt(n,(function(t,n){r.ondata(null,t,n);})),this.compression=8,this.flag=Lt(n.level);}return t.prototype.process=function(t,n){try{this.d.push(t,n);}catch(t){this.ondata(t,null,n);}},t.prototype.push=function(t,n){Yt.prototype.push.call(this,t,n);},t}();var Jt=function(){function t(t,n){var r=this;void 0===n&&(n={}),Yt.call(this,t),this.d=new wt(n,(function(t,n,i){r.ondata(t,n,i);})),this.compression=8,this.flag=Lt(n.level),this.terminate=this.d.terminate;}return t.prototype.process=function(t,n){this.d.push(t,n);},t.prototype.push=function(t,n){Yt.prototype.push.call(this,t,n);},t}();var Kt=function(){function t(t){this.ondata=t,this.u=[],this.d=1;}return t.prototype.add=function(t){var r=this;if(2&this.d)throw "stream finished";var i=strToU8(t.filename),e=i.length,o=e!=t.filename.length,a=e+30;if(e>65535)throw "filename too long";var f=new n(a);Pt(f,0,t,i,o);var s=[f],u=function(){for(var t=0,n=s;t<n.length;t++){var i=n[t];r.ondata(null,i,!1);}s=[];},h=this.d;this.d=0;var c=this.u.length,l=q(t,{f:i,u:o,t:function(){t.terminate&&t.terminate();},r:function(){if(u(),h){var t=r.u[c+1];t?t.r():r.d=1;}h=1;}}),p=0;t.ondata=function(i,e,o){i?(r.ondata(i,e,o),r.terminate()):(p+=e.length,s.push(e),o?(s.push(function(t,r){var i=new n(16);return ut(i,0,134695760),ut(i,4,t.crc),ut(i,8,r),ut(i,12,t.size),i}(t,p)),l.c=p,l.b=a+p+16,l.crc=t.crc,l.size=t.size,h&&l.r(),h=1):h&&u());},this.u.push(l);},t.prototype.end=function(){var t=this;if(2&this.d){if(1&this.d)throw "stream finishing";throw "stream finished"}this.d?this.e():this.u.push({r:function(){1&t.d&&(t.u.splice(-1,1),t.e());},t:function(){}}),this.d=3;},t.prototype.e=function(){for(var t=0,r=0,i=0,e=0,o=this.u;e<o.length;e++){i+=46+(u=o[e]).f.length;}for(var a=new n(i+22),f=0,s=this.u;f<s.length;f++){var u=s[f];Pt(a,t,u,u.f,u.u,u.c,r),t+=46+u.f.length,r+=u.b;}Wt(a,t,this.u.length,i,r),this.ondata(null,a,!0),this.d=2;},t.prototype.terminate=function(){for(var t=0,n=this.u;t<n.length;t++){n[t].t();}this.d=2;},t}();function zip(t,r,i){if(i||(i=r,r={}),"function"!=typeof i)throw "no callback";var e={};Dt(t,"",e,r);var o=Object.keys(e),a=o.length,f=0,s=0,u=a,h=new Array(a),c=[],l=function(){for(var t=0;t<c.length;++t)c[t]();},p=function(){var t=new n(s+22),r=f,e=s-f;s=0;for(var o=0;o<u;++o){var a=h[o];try{var c=a.c.length;Pt(t,s,a,a.f,a.u,c);var l=s+30+a.f.length;t.set(a.c,l),Pt(t,f,a,a.f,a.u,c,s),f+=46+a.f.length,s=l+c;}catch(t){return i(t,null)}}Wt(t,f,h.length,e,r),i(null,t);};a||p();for(var v=function(t){var n=o[t],r=e[n],u=r[0],v=r[1],d=P(),g=u.length;d.p(u);var y=strToU8(n),w=y.length,m=0==v.level?0:8,b=function(r,e){if(r)l(),i(r,null);else {var o=e.length;h[t]=q(v,{size:g,crc:d.d(),c:e,f:y,u:w!=n.length,compression:m}),f+=30+w+o,s+=76+2*w+o,--a||p();}};if(w>65535&&b("filename too long",null),m)if(g<16e4)try{b(null,deflateSync(u,v));}catch(t){b(t,null);}else c.push(deflate(u,v,b));else b(null,u);},d=0;d<u;++d)v(d);return l}function zipSync(t,r){void 0===r&&(r={});var i={},e=[];Dt(t,"",i,r);var o=0,a=0;for(var f in i){var s=i[f],u=s[0],h=s[1],c=0==h.level?0:8,l=(b=strToU8(f)).length;if(l>65535)throw "filename too long";var p=c?deflateSync(u,h):u,v=p.length,d=P();d.p(u),e.push(q(h,{size:u.length,crc:d.d(),c:p,f:b,u:l!=f.length,o:o,compression:c})),o+=30+l+v,a+=76+2*l+v;}for(var g=new n(a+22),y=o,w=a-o,m=0;m<e.length;++m){var b=e[m];Pt(g,b.o,b,b.f,b.u,b.c.length),g.set(b.c,b.o+30+b.f.length),Pt(g,o,b,b.f,b.u,b.c.length,b.o),o+=46+b.f.length;}return Wt(g,o,e.length,w,y),g}var Nt=function(){function t(){}return t.prototype.push=function(t,n){this.ondata(null,t,n);},t.compression=0,t}();var Qt=function(){function t(){var t=this;this.i=new mt((function(n,r){t.ondata(null,n,r);}));}return t.prototype.push=function(t,n){try{this.i.push(t,n);}catch(r){this.ondata(r,t,n);}},t.compression=8,t}();var Vt=function(){function t(){var t=this;this.i=new bt((function(n,r,i){t.ondata(n,r,i);})),this.terminate=this.i.terminate;}return t.prototype.push=function(t,n){this.i.push(A(t,0),n);},t.compression=8,t}();var Xt=function(){function t(t){this.onfile=t,this.k=[],this.o={0:Nt},this.p=R;}return t.prototype.push=function(t,r){var i=this,e=-1==this.c&&this.d;if(this.c&&!e){var o=Math.min(this.c,t.length),a=t.subarray(0,o);this.c-=o,this.d?this.d.push(a,!this.c):this.k[0].push([a,!this.c]),t=t.subarray(o);}if(e||!this.c){var f=0,s=0,u=void 0,h=void 0,c=t.length,l=this.p.length,p=c+l;if(c)l?((h=new Uint8Array(p)).set(this.p),h.set(t,this.p.length)):h=t;else {if(!l)return;h=this.p;}this.p=R;for(var v=function(){if(67324752==ft(h,s)){f=1,e&&e.push(R,!0),d.d=null,d.c=0;var t=at(h,s+6),r=at(h,s+8),o=2048&t,a=8&t,c=at(h,s+26),l=at(h,s+28);if(p>s+30+c+l){var v=[];d.k.unshift(v),f=2,u=s;var g=ft(h,s+18),y=strFromU8(h.subarray(s+30,s+=30+c),!o);if(a&&(g=-1),4294967295==g&&(g=Ht(h,s)[0]),!d.o[r])return d.onfile("unknown compression type "+r,y,null),"break";d.c=g;var w={start:function(){if(!w.ondata)throw "no callback";if(g){var t=new i.o[r];t.ondata=function(t,n,r){w.ondata(t,n,r);};for(var e=0,o=v;e<o.length;e++){var a=o[e],f=a[0],s=a[1];t.push(f,s);}i.k[0]==v&&(i.d=t);}else w.ondata(null,new n(0),!0);},terminate:function(){i.k[0]==v&&i.d.terminate&&i.d.terminate();}};d.onfile(null,y,w),s+=l;}return "break"}},d=this;s<p;++s){if("break"===v())break}if(e&&e.push(2==f?h.subarray(0,u-12-(134695760==ft(h,u-12)&&4)):h.subarray(0,s),!!f),2&f)return this.push(h.subarray(s),r);if(1&f&&(this.p=h),r&&(f||this.c))throw "invalid zip file"}},t.prototype.register=function(t){this.o[t.compression]=t;},t}();function unzip(t,r){if("function"!=typeof r)throw "no callback";for(var i=[],e=function(){for(var t=0;t<i.length;++t)i[t]();},o={},a=t.length-22;101010256!=ft(t,a);--a)if(!a||t.length-a>65558)return void r("invalid zip file",null);var f=at(t,a+8);f||r(null,{});var s=f,u=ft(t,a+16),h=4294967295==u;if(h){if(a=ft(t,a-12),101075792!=ft(t,a))return void r("invalid zip file",null);s=f=ft(t,a+32),u=ft(t,a+48);}for(var c=function(a){var s=Bt(t,u,h),c=s[0],l=s[1],p=s[2],v=s[3],d=s[4],g=s[5],y=Rt(t,g);u=d;var w=function(t,n){t?(e(),r(t,null)):(o[v]=n,--f||r(null,o));};if(c)if(8==c){var m=t.subarray(y,y+l);if(l<32e4)try{w(null,inflateSync(m,new n(p)));}catch(t){w(t,null);}else i.push(inflate(m,{size:p},w));}else w("unknown compression type "+c,null);else w(null,A(t,y,y+l));},l=0;l<s;++l)c();return e}function unzipSync(t){for(var r={},i=t.length-22;101010256!=ft(t,i);--i)if(!i||t.length-i>65558)throw "invalid zip file";var e=at(t,i+8);if(!e)return {};var o=ft(t,i+16),a=4294967295==o;if(a){if(i=ft(t,i-12),101075792!=ft(t,i))throw "invalid zip file";e=ft(t,i+32),o=ft(t,i+48);}for(var f=0;f<e;++f){var s=Bt(t,o,a),u=s[0],h=s[1],c=s[2],l=s[3],p=s[4],v=s[5],d=Rt(t,v);if(o=p,u){if(8!=u)throw "unknown compression type "+u;r[l]=inflateSync(t.subarray(d,d+h),new n(c));}else r[l]=A(t,d,d+h);}return r}

var fflate = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Deflate: yt,
	AsyncDeflate: wt,
	deflate: deflate,
	deflateSync: deflateSync,
	Inflate: mt,
	AsyncInflate: bt,
	inflate: inflate,
	inflateSync: inflateSync,
	Gzip: xt,
	AsyncGzip: zt,
	gzip: gzip,
	gzipSync: gzipSync,
	Gunzip: St,
	AsyncGunzip: kt,
	gunzip: gunzip,
	gunzipSync: gunzipSync,
	Zlib: Mt,
	AsyncZlib: Ct,
	zlib: zlib,
	zlibSync: zlibSync,
	Unzlib: Ut,
	AsyncUnzlib: At,
	unzlib: unzlib,
	unzlibSync: unzlibSync,
	compress: gzip,
	AsyncCompress: zt,
	compressSync: gzipSync,
	Compress: xt,
	Decompress: Ot,
	AsyncDecompress: Tt,
	decompress: decompress,
	decompressSync: decompressSync,
	DecodeUTF8: jt,
	EncodeUTF8: Gt,
	strToU8: strToU8,
	strFromU8: strFromU8,
	ZipPassThrough: Yt,
	ZipDeflate: qt,
	AsyncZipDeflate: Jt,
	Zip: Kt,
	zip: zip,
	zipSync: zipSync,
	UnzipPassThrough: Nt,
	UnzipInflate: Qt,
	AsyncUnzipInflate: Vt,
	Unzip: Xt,
	unzip: unzip,
	unzipSync: unzipSync
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

					var data = unzlibSync( new Uint8Array( reader.getArrayBuffer( compressedLength ) ) ); // eslint-disable-line no-undef
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
