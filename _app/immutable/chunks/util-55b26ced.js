const P=(t,n)=>Math.random()*(n-t)+t,u=t=>{const n=t*Math.sqrt(Math.random()),a=Math.random()*2*Math.PI,o=n*Math.cos(a),s=n*Math.sin(a);return[o,s]},I=t=>{const n=Math.random(),a=Math.random(),o=n*2*Math.PI,s=Math.acos(2*a-1),c=Math.cbrt(Math.random()+t),r=Math.sin(o),M=Math.cos(o),h=Math.sin(s),e=Math.cos(s),i=c*h*M,d=c*h*r,m=c*e;return[i,d,m]};export{P as a,u as b,I as r};