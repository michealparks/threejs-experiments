import{ai as e,aj as t,ak as a,al as s}from"./vendor-610434e6.js";const n=new s,r=new e,c=new t,o=new a,l="/threejs-experiments/static";r.setPath(`${l}/textures/`),c.setPath(`${l}/audio/`),o.setPath(`${l}/glb/`);const i=new Map,u=async(e,t)=>{const a=await fetch(`${l}/${t}/${e}`),s=await a.text();return i.set(e,s),s},p=e=>i.get(e),w=e=>{switch(e.split(".").pop()){case"glb":return(async e=>{const t=await o.loadAsync(e);return i.set(e,t),t})(e);case"png":case"jpg":return(async e=>{const t=await r.loadAsync(e);return i.set(e,t),t})(e);case"mp3":return(async e=>{const t=await c.loadAsync(e);return i.set(e,t),t})(e);case"json":return(async e=>{const t=await fetch(`${l}/json/${e}`),a=await t.json();return i.set(e,a),a})(e);case"sprite":return(async e=>{const[t,a]=await Promise.all([fetch(`${l}/textures/${e.replace("sprite","json")}`).then((e=>e.json())),r.loadAsync(e.replace("sprite","png"))]),s={frames:t.frames,meta:t.meta,texture:a};return i.set(e,s),s})(e);case"obj":return u(e,"obj");case"glsl":return u(e,"glsl")}},j={cache:i,manager:n,get:p,load:e=>{var t;return null!=(t=p(e))?t:w(e)},loadOne:w};export{j as a};
