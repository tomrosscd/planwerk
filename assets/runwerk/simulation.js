import {SPEED_CURVE} from './story.js';
export const VERSION = 'runwerk-v7';
export const STEP = 1 / 60;
export const CHUNKS = [ [0,1,0,-1], [1,0,-1,0], [-1,0,1,0], [0,0,1,-1], [1,-1,1,0], [-1,1,-1,0], [0,1,-1,0], [0,-1,1,0], [1,0,0,-1], [-1,0,0,1] ];
export const SKINS = ['workshop','launch','scope','payroll','diligence','meeting'];
export const TYPES = {workshop:'block',launch:'block',scope:'hurdle',payroll:'hurdle',diligence:'arch',meeting:'arch'};
export function random(seed) { let n=seed>>>0; return () => { n += 0x6D2B79F5; let t=n; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
// Discrete 60Hz speed integration, integer millimetres. Shared by the API.
function baseDistance(n) {
 let mm=0;
 for(let i=0;i<SPEED_CURVE.length;i++){const current=SPEED_CURVE[i],start=current.at*60;if(n<=start)break;const next=SPEED_CURVE[i+1],span=next?(next.at-current.at)*60:Infinity,count=Math.min(n-start,span);mm+=current.speed*1000/60*count;if(next)mm+=(next.speed-current.speed)*1000/60*count*(count-1)/(2*span);}
 return Math.floor(mm*1.25);
}
// Exponential phase transitions into sustained acceleration, without a speed ceiling.
export const EXPONENTIAL_TARGET_SPEED=180;
const TAIL_ACCELERATION=.3;
const LOG_RATE=.04/60;
let lower=0,upper=432000;while(lower<upper){const mid=Math.floor((lower+upper)/2);if(baseDistance(mid)<8000000)lower=mid+1;else upper=mid;}
export const RAMP_START_TICK=lower;
const rampDistance=baseDistance(RAMP_START_TICK),rampSpeed=(baseDistance(RAMP_START_TICK+1)-rampDistance)*60/1000;
const rampCount=Math.ceil(Math.log(EXPONENTIAL_TARGET_SPEED/rampSpeed)/LOG_RATE);
export function distanceForTicks(n){if(n<=RAMP_START_TICK)return baseDistance(n);const count=Math.min(n-RAMP_START_TICK,rampCount),tail=Math.max(0,n-RAMP_START_TICK-rampCount);return Math.floor(rampDistance+rampSpeed*1000/60*Math.expm1(LOG_RATE*count)/Math.expm1(LOG_RATE)+(tail*EXPONENTIAL_TARGET_SPEED+TAIL_ACCELERATION/60*tail*(tail-1)/2)*1000/60);}
export function speedForTicks(n){return n<RAMP_START_TICK?(baseDistance(n+1)-baseDistance(n))*60/1000:n-RAMP_START_TICK<rampCount?rampSpeed*Math.exp(LOG_RATE*(n-RAMP_START_TICK)):EXPONENTIAL_TARGET_SPEED+TAIL_ACCELERATION*(n-RAMP_START_TICK-rampCount)/60;}
function speedAtDistance(m){const capDistance=distanceForTicks(RAMP_START_TICK+rampCount)/1000;return m<rampDistance/1000?82.5:m<capDistance?Math.min(EXPONENTIAL_TARGET_SPEED,rampSpeed+(m-rampDistance/1000)*60*Math.expm1(LOG_RATE)):Math.sqrt(EXPONENTIAL_TARGET_SPEED**2+2*TAIL_ACCELERATION*(m-capDistance));}
export function previewForTicks(n){return Math.max(190,speedForTicks(n)*2.1);}
export function pickupBound(n) { const d=distanceForTicks(n)/1000; return Math.max(0,Math.floor((d-130)/38)+1); }
export function pattern(seed,count=100) {
 const rng=random(seed), rows=[];let safe=1,index=0,z=140;
 while(rows.length<count) { const chunk=CHUNKS[Math.floor(rng()*CHUNKS.length)]; for(let delta of chunk){if(rows.length>=count)break;if(index>=10&&delta===0)delta=rng()<.5?-1:1;if(z>=1800){safe=safe===1?(rng()<.5?0:2):1;}else safe=Math.max(0,Math.min(2,safe+delta)); const hazards=[]; for(let lane=0;lane<3;lane++){if(lane===safe)continue; if(index<4 && hazards.length)continue; if(index>=4 && rng()<Math.max(0,.16-index*.012))continue;const skin=SKINS[Math.floor(rng()*6)];hazards.push({lane,skin,type:TYPES[skin]});} rows.push({index,z,safe,hazards,pickupLane:safe,investor:index%(z>=8000?64:index<35?20:index<80?32:48)===3,user:index%3===1,ledger:index>10&&index%7===4,finalfile: index%9===6});z+=z>=8000?Math.max(65,speedAtDistance(z+180)*Math.max(.42,.7-(z-8000)/80000)):Math.min(48,38+index*.12);index++;} }
 return rows;
}
export function createWorld(seed=1,character='tom') {return {seed,character,ticks:0,distanceMm:0,lane:1,x:1,from:1,target:1,moveTicks:0,buffer:0,action:null,actionTicks:0,pickups:0,cash:0,users:0,investors:0,shield:false,grace:0,dead:false,last:null,objects:[],nextRow:0,rows:pattern(seed,64),jumps:0,shieldHits:0,avoided:0,feedback:[],events:[]};}
export function command(w,action){if(w.dead)return; if(action==='left'||action==='right'){const d=action==='left'?-1:1;if(w.moveTicks){w.buffer=d;return;}const target=Math.max(0,Math.min(2,w.lane+d));if(target===w.lane)return;w.from=w.x;w.target=target;w.lane=target;w.moveTicks=9;}else if((action==='jump'||action==='slide')&&!w.action){w.action=action;w.actionTicks=39;}}
export function step(w){if(w.dead)return;w.events=[];w.feedback=w.feedback.filter(f=>w.ticks-f.tick<55);const before=w.distanceMm/1000;w.ticks++;w.distanceMm=distanceForTicks(w.ticks);const after=w.distanceMm/1000;
 if(w.moveTicks){w.moveTicks--;w.x=w.from+(w.target-w.from)*(1-w.moveTicks/9);if(!w.moveTicks&&w.buffer){const b=w.buffer;w.buffer=0;command(w,b<0?'left':'right');}}
 if(w.actionTicks>0){w.actionTicks--;if(!w.actionTicks)w.action=null;}if(w.grace>0)w.grace--;
 while(w.nextRow< w.rows.length && w.rows[w.nextRow].z<after+previewForTicks(w.ticks)){const row=w.rows[w.nextRow++];for(const h of row.hazards)w.objects.push({...h,z:row.z,done:false,finalfile:row.finalfile});w.objects.push({type:row.investor?'investor':row.user?'user':'money',lane:row.pickupLane,z:row.z-10,ledger:row.ledger,done:false});}
 if(w.nextRow>=w.rows.length-4){w.rows=pattern(w.seed,w.rows.length+64);}
 for(const o of w.objects){if(o.done)continue;const start=o.z-.9,end=o.z+.9;
 // Swept longitudinal interval plus continuous lane coordinate. Accessories never affect collision.
 if(after>=start&&before<=end&&Math.abs(w.x-o.lane)<.36){if(o.type==='money'||o.type==='user'||o.type==='investor'){o.done=true;w.feedback.push({tick:w.ticks,lane:o.lane,text:o.type==='money'?'+$1M. Revenue still pending.':o.type==='user'?'+1 user. Finally.':'VC backing. Questions later.',color:o.type==='user'?'#b6e9ff':'#fff0ad'});if(o.type==='investor'){w.shield=true;w.investors++;w.events.push('investor');}else{w.pickups++;if(o.type==='user'){w.users++;w.events.push('user');}else{w.cash++;w.events.push(o.ledger?'alex':'money');}}}else{
 const protectedAction=(o.type==='hurdle'&&w.action==='jump'&&w.actionTicks>=6&&w.actionTicks<=34)||(o.type==='arch'&&w.action==='slide');
 if(!protectedAction&&!w.grace){o.done=true;if(w.shield){w.shield=false;w.grace=72;w.shieldHits++;w.feedback.push({tick:w.ticks,lane:w.x,text:'Investor confidence impaired',color:'#ffdcad'});w.events.push('shieldHit');}else{w.dead=true;o.hit=true;w.last=o.skin;w.events.push('collision');break;}}
 }} if(after>end&&!o.done){o.done=true;if(['block','hurdle','arch'].includes(o.type)){w.avoided++;w.events.push('avoided');}if(o.type==='hurdle'&&Math.abs(w.x-o.lane)<.36&&w.action==='jump'){w.jumps++;w.events.push('hurdle');}}
 }
 w.objects=w.objects.filter(o=>o.z>after-6);}
export function score(w){return Math.floor(w.distanceMm/1000)+w.pickups*10;}
