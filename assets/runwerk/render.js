import {chapterAt,billboardAt} from './story.js';
import {person,round,ellipse} from './sprites.js';
import {HAZARDS} from './content.js';
function text(c,copy,x,y,size,color='#153e39'){c.fillStyle=color;c.font=`800 ${size}px system-ui, sans-serif`;c.textAlign='center';c.fillText(copy,x,y);}
export function drawItem(c,o,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);c.lineJoin='round';const r=(x,y,w,h,col,radius=3)=>round(c,x,y,w,h,radius,col);
 ellipse(c,0,1,19,4,'#10232550');
 if(o.type==='money'){r(-11,-23,22,18,['marina','unicorn'].includes(o.theme?.scene)?'#e2af42':'#35b785');r(-10,-23,20,5,'#a7ffce');r(-5,-28,10,5,'#a7ffce',2);r(-11,-13,22,2,'#166c57',0);text(c,'$',0,-10,12,'#f0ffe0');if(o.theme?.scene==='court'){r(6,-29,10,4,'#ac7950',1);r(10,-26,2,8,'#ac7950',1);}if(o.theme?.scene==='panama'){r(-12,-25,7,4,'#eed9a5',2);r(-10,-27,3,5,'#e3c791',1);}if(o.theme?.scene==='studio')r(8,-24,4,7,'#292b49',2);}
 else if(o.type==='user'){for(const [x,y,col]of [[-9,-22,'#6fb7ec'],[9,-20,'#5093d7'],[0,-29,'#b4e2ff']]){ellipse(c,x,y,4,4,'#f4caa1');r(x-5,y+4,10,13,col);r(x-4,y+17,3,6,'#264462',1);r(x+1,y+17,3,6,'#264462',1);if(o.theme?.scene==='studio'){r(x-5,y-1,2,6,'#303444',1);r(x+3,y-1,2,6,'#303444',1);}if(o.theme?.scene==='stage')r(x-4,y+9,8,3,'#e594a6',1);}}
 else if(o.type==='investor'){r(-8,-23,16,24,o.theme?.scene==='island'?'#f5eddb':o.theme?.scene==='marina'?'#344d6d':'#f2c16c',5);ellipse(c,0,-29,7,8,'#f1c29c');r(-7,-33,14,5,'#55493e');r(-6,-30,12,3,'#203140',1);r(-3,-20,6,11,'#fff7d9',1);r(-1,-19,2,9,'#d97b52',1);r(-6,0,4,5,'#263747',1);r(2,0,4,5,'#263747',1);if(o.theme?.scene==='unicorn'){c.fillStyle='#fff0b2';c.beginPath();c.moveTo(-2,-37);c.lineTo(1,-46);c.lineTo(4,-37);c.fill();}if(o.theme?.scene==='studio'){r(-12,-28,3,9,'#323244');r(9,-28,3,9,'#323244');}if(o.theme?.scene==='stage')r(-7,-15,4,4,'#e34962',1);}
 else if(o.type==='arch'){r(-23,-52,6,52,'#c49556');r(17,-52,6,52,'#c49556');r(-23,-53,46,19,'#ffdc94',5);text(c,HAZARDS[o.skin]?.label||'MEETING',0,-42,6);}
 else if(o.type==='hurdle'){r(-23,-28,46,28,'#e1f4e9',3);r(-23,-28,46,9,'#3a9478',3);for(let i=0;i<12;i++)r(-20+(i%4)*10,-16+Math.floor(i/4)*5,8,3,i%4?'#a6d4c4':'#76b6a1',.5);text(c,o.skin==='payroll'?'PAYROLL':'SHEETS',0,-22,6,'#fff');}
 else if(o.skin==='workshop'){r(-20,-48,40,48,'#fdf4df',4);r(-16,-42,32,9,'#e99876',2);text(c,'PRESS',0,-36,7,'#6b4435');for(let i=0;i<5;i++)r(-15,-27+i*4,26-(i%2)*8,2,'#aabbb4',1);r(5,-7,10,3,'#da956e',1);}
 else{r(-22,-45,44,45,'#dc8768',5);r(-20,-44,40,10,'#f7c9a8',3);r(-2,-32,4,30,'#a25943',1);r(-21,-8,42,4,'#a25943',1);r(-12,-30,24,14,'#ffe4b6',3);text(c,'LAUNCH',0,-20,7,'#603e31');}
 if(o.theme&&['money','user','investor'].includes(o.type)){const label=o.type==='money'?o.theme.cash:o.type==='user'?o.theme.users:o.theme.investor;text(c,label,0,-43,6,'#f3fff1');}
 c.restore();}
export function render(canvas,w,character='tom',reduced=false){if(canvas.width!==720){canvas.width=720;canvas.height=1080;}const c=canvas.getContext('2d');c.setTransform(2,0,0,2,0,0);c.imageSmoothingEnabled=true;
 const d=w?w.distanceMm/1000:0,chapter=chapterAt(w?.ticks||0),scene=chapter.scene,cayman=scene==='island'||scene==='panama';const sky=c.createLinearGradient(0,0,0,540);sky.addColorStop(0,chapter.sky);sky.addColorStop(.28,chapter.light);sky.addColorStop(1,chapter.ground);c.fillStyle=sky;c.fillRect(0,0,360,540);
 ellipse(c,286,37,18,18,'#fff0ba');
 for(let i=0;i<7;i++){const x=i*58-12,h=33+(i*17)%53;round(c,x,143-h,43,h,4,chapter.ground);round(c,x+3,145-h,37,5,2,'#f3ddbf');for(let j=0;j<6;j++)round(c,x+7+(j%3)*11,155-h+Math.floor(j/3)*16,6,8,1,chapter.light);}
 if(scene==='garage'){round(c,7,3,346,144,9,'#655447');for(let i=0;i<8;i++)round(c,12,8+i*16,336,3,1,'#927b62');round(c,18,105,69,33,4,'#d6bc80');text(c,'GARAGE',52,126,9);}
 if(scene==='idea'||scene==='office'){for(let i=0;i<8;i++)round(c,8+i*43,101-(i%2)*14,28,24,2,['#f4d780','#dca7c0','#a2d9c0'][i%3]);}
 if(scene==='court'){for(let i=0;i<6;i++)round(c,14+i*59,75,13,65,3,'#efddd1');round(c,5,65,350,12,4,'#d1b3a8');}
 if(scene==='unicorn'){for(let i=0;i<4;i++){text(c,'✦',30+i*93,100+i%2*12,22,'#ffe4a4');}}
 if(cayman){for(const x of [19,322]){c.strokeStyle='#b49665';c.lineWidth=7;c.beginPath();c.moveTo(x,160);c.quadraticCurveTo(x+12,89,x,68);c.stroke();c.strokeStyle='#36896f';c.lineWidth=8;for(let a=-2;a<=2;a++){c.beginPath();c.moveTo(x,69);c.quadraticCurveTo(x+a*16,55,x+a*24,76);c.stroke();}}if(scene==='panama')round(c,0,135,360,9,0,'#5bb9c8');}
 if(scene==='marina'){round(c,0,105,360,42,0,'#5facc8');for(const x of [35,283]){c.fillStyle='#fcf4dc';c.beginPath();c.moveTo(x-27,130);c.lineTo(x+30,130);c.lineTo(x+20,140);c.lineTo(x-20,140);c.fill();round(c,x,79,2,49,0,'#f6f0dc');c.beginPath();c.moveTo(x+3,81);c.lineTo(x+25,125);c.lineTo(x+3,125);c.fill();}}
 if(scene==='studio'||scene==='stage'){round(c,0,0,360,147,0,chapter.sky);for(const x of [9,331])round(c,x,15,20,119,4,scene==='studio'?'#23243d':'#bd4160');for(let i=0;i<9;i++)ellipse(c,15+i*42,138,10,7,chapter.light);}
 const project=(lane,z)=>{const t=Math.max(0,Math.min(1,1-z/190)),p=t*t;return {x:180+(lane-1)*(28+p*82),y:139+p*365,s:.3+p*1.7,p};};
 c.fillStyle=chapter.ground;c.beginPath();c.moveTo(124,130);c.lineTo(236,130);c.lineTo(360,540);c.lineTo(0,540);c.fill();const road=c.createLinearGradient(0,130,0,540);road.addColorStop(0,chapter.ground);road.addColorStop(1,chapter.road);c.fillStyle=road;c.beginPath();c.moveTo(137,130);c.lineTo(223,130);c.lineTo(342,540);c.lineTo(18,540);c.fill();
 c.strokeStyle='#e7eed780';c.lineWidth=2;for(const lane of [.5,1.5]){for(let i=0;i<14;i++){const z=(i*9+(reduced?0:90-d%9))%126,a=project(lane,z),b=project(lane,z-3);c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}}
 for(let i=0;i<6;i++){const z=(i*18+96-(reduced?0:d%18))%112,p=project(1,z);for(const side of [-1,1]){const x=180+side*(57+p.p*162);c.save();c.translate(x,p.y);c.scale(p.s,p.s);
 if(scene==='garage'){round(c,-10,-21,20,21,2,'#bd9565');round(c,-2,-21,4,21,0,'#e6c897');}
 else if(scene==='idea'||scene==='office'){round(c,-2,-27,4,27,1,'#879496');round(c,-11,-34,22,17,2,'#f4d780');}
 else if(scene==='court'){round(c,-7,-30,14,30,2,'#ddc5bb');round(c,-10,-32,20,5,1,'#f2ddd2');}
 else if(scene==='studio'){round(c,-1,-29,2,29,1,'#beb9d4');round(c,-5,-36,10,14,5,'#38324e');}
 else if(scene==='stage'){round(c,-7,-19,14,19,3,'#252037');ellipse(c,0,-20,7,5,'#ffdd95');}
 else if(scene==='marina'){round(c,-3,-25,6,25,2,'#f3e8d8');round(c,-5,-26,10,4,1,'#7b91a7');}
 else if(cayman){round(c,-2,-30,4,30,2,'#b19464');for(const a of [-1,0,1]){c.strokeStyle='#489c79';c.lineWidth=3;c.beginPath();c.moveTo(0,-29);c.quadraticCurveTo(a*8,-38,a*13,-27);c.stroke();}}
 else{round(c,-5,-28,10,28,3,'#b8c8c6');ellipse(c,0,-30,10,6,'#6dac88');}c.restore();}}
 // Full-size travelling ad gantry occupies sky only, never the hazard corridor.
 const billboard=billboardAt(w?.ticks||0),ad=billboard.ad,exit=reduced?0:Math.max(0,(billboard.phase-.94)/.06),bx=20-exit*365;
 round(c,bx+6,20,320,88,10,'#133d4050');round(c,bx,14,320,88,10,'#e5ffee');round(c,bx+7,21,306,74,6,'#f5fff7');text(c,ad[0],bx+160,51,ad[0].length>22?16:ad[0].length>17?18:22);text(c,ad[1],bx+160,79,ad[1].length>23?16:ad[1].length>18?18:21,'#278768');
 round(c,30,112,300,19,7,'#153e46');text(c,chapter.title,180,125,10,'#e8fff0');
 if(w)for(const o of [...w.objects].sort((a,b)=>b.z-a.z)){if((o.done&&!o.hit)||o.z<d-3)continue;const p=project(o.lane,o.z-d);drawItem(c,{...o,theme:chapter},p.x,p.y,p.s);}
 if(w?.feedback)for(const f of w.feedback){const age=(w.ticks-f.tick)/55;c.save();c.globalAlpha=1-age;const fx=Math.max(100,Math.min(260,180+(f.lane-1)*75)),fy=126-age*9;round(c,fx-88,fy-16,176,25,12,'#14372fe8');text(c,f.text,fx,fy+1,11,f.color);c.restore();}
 const x=180+((w?.x??1)-1)*110;ellipse(c,x,500,23,7,'#10272b66');let jump=0;if(w?.action==='jump')jump=Math.sin((39-w.actionTicks)/39*Math.PI)*65;
 if(w?.shield){c.strokeStyle='#ffe2a0';c.lineWidth=2;c.beginPath();c.ellipse(x,464-jump,27,43,0,0,Math.PI*2);c.stroke();text(c,'VC BACKING',x,417-jump,8,'#ffe7b4');}
 person(c,x,454-jump,1.65,character,w?.dead?'collision':w?.action||'run',(w?.ticks||0)/7,false);
 if(w?.ticks>=4320){c.fillStyle='#596bb516';c.fillRect(0,0,360,540);}
}
