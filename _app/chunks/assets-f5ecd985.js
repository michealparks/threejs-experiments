import{ai as e,aj as a,ak as t,al as s}from"./vendor-9aeeaeec.js";import{b as n}from"./paths-45dac81d.js";const r=new s,o=new e,c=new a,l=new t;o.setPath(`${n}/textures/`),c.setPath(`${n}/mp3/`),l.setPath(`${n}/glb/`);const d=new Set,i=new Set,u=new Set,p=new Map,w=async(e,a)=>{const t=await fetch(`${n}/${a}/${e}`);p.set(e,await t.text())},f=e=>{switch(e.split(".").pop()){case"glb":return(async e=>{p.set(e,await l.loadAsync(e))})(e);case"png":case"jpg":return(async e=>{p.set(e,await o.loadAsync(e))})(e);case"mp3":return(async e=>{p.set(e,await c.loadAsync(e))})(e);case"json":return(async e=>{const a=await fetch(`${n}/json/${e}`);p.set(e,await a.json())})(e);case"sprite":return(async e=>{const[a,t]=await Promise.all([fetch(`${n}/textures/${e.replace("sprite","json")}`).then((e=>e.json())),o.loadAsync(e.replace("sprite","png"))]);p.set(e,{frames:a.frames,meta:a.meta,texture:t})})(e);case"obj":return w(e,"obj");case"glsl":return w(e,"glsl")}},h=(...e)=>(m(e),g),m=e=>{for(const a of e)p.has(a)||d.add(a);return g},g={cache:p,manager:r,textureLoader:o,audioLoader:c,gltfLoader:l,get:e=>p.get(e),queue:h,queueMany:m,on:(e,a)=>{switch(e){case"load":return i.add(a)}},load:(...e)=>{e.length>0&&h(...e);for(const a of d)u.add(f(a));return Promise.all(u).then((()=>{for(const e of i)e();d.clear(),u.clear()}))},loadOne:f};export{g as a};
