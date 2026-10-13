import {API_URL,VERSION} from './config.js';
export function read(key,fallback){try{const s=localStorage.getItem(`${VERSION}-${key}`);return s===null?fallback:JSON.parse(s);}catch{return fallback;}}
export function save(key,value){try{localStorage.setItem(`${VERSION}-${key}`,JSON.stringify(value));return true;}catch{return false;}}
async function request(path,options={},timeout=4000){if(!API_URL)throw Error('Leaderboard unavailable. Your run still counts here.');const c=new AbortController(),timer=setTimeout(()=>c.abort(),timeout);try{const r=await fetch(API_URL+path,{...options,signal:c.signal,headers:{'Content-Type':'application/json',...options.headers}});const data=await r.json();if(!r.ok)throw Error(data.message||'Submission failed. Try again.');return data;}finally{clearTimeout(timer);}}
export function begin(character){return request('/v1/runs',{method:'POST',body:JSON.stringify({version:VERSION,character})},2000);}
export function submit(session,name,w){return request('/v1/scores',{method:'POST',headers:{Authorization:`Bearer ${session.runToken}`},body:JSON.stringify({runId:session.runId,name,distanceMm:w.distanceMm,pickups:w.pickups,activeTicks:w.ticks})});}
export function board(){return request(`/v1/leaderboard?version=${VERSION}`);}
