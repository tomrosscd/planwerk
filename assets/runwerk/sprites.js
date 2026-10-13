const heads=new Image();heads.src=new URL('./character-heads-v1.webp',import.meta.url).href;
const waitingPortraits=new Map();heads.addEventListener('load',()=>{for(const [canvas,who]of waitingPortraits)portrait(canvas,who);waitingPortraits.clear();});
function avatarHead(c,who,front,x,y,w,h){if(!heads.complete||!heads.naturalWidth)return false;const sw=heads.naturalWidth/2,sh=heads.naturalHeight/2;c.drawImage(heads,front?0:sw,who==='seb'?sh:0,sw,sh,x,y,w,h);return true;}
// Original vector cartoon likenesses, informed by the repository portrait references.
export function round(c,x,y,w,h,r,fill){c.fillStyle=fill;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
export function ellipse(c,x,y,rx,ry,fill){c.fillStyle=fill;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
function shade(c,x,y,w,h,light,dark){const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,light);g.addColorStop(1,dark);return g;}
export function person(c,x,y,scale,who,pose='run',frame=0,front=false){
 c.save();c.translate(x,y);c.scale(scale,scale);const seb=who==='seb',skin=shade(c,-12,-10,28,45,'#f3cbaa','#cb8e69'),shirt=shade(c,-13,-7,26,27,seb?'#b7e4dc':'#5b7195',seb?'#508f8c':'#2b405f'),pants=shade(c,-11,17,22,20,'#425773','#1d2d46');
 const stride=pose==='run'?Math.sin(frame*Math.PI/2)*3.8:pose==='jump'?2.5:0;
 if(pose==='slide'){c.translate(0,17);c.scale(1.12,.55);c.rotate(-.16);}if(pose==='collision')c.rotate(.12);
 c.translate(0,pose==='run'?Math.abs(Math.sin(frame*Math.PI/2))*.7:0);c.lineCap='round';
 // Soft sculpted limbs, broad shoulders and shaded clothing match the avatar head.
 c.lineWidth=8;c.strokeStyle=pants;for(const [side,d]of [[-1,stride],[1,-stride]]){c.beginPath();c.moveTo(side*5,15);c.quadraticCurveTo(side*7-d*.4,23+d*.35,side*7+d*.4,30-d*.25);c.stroke();round(c,side*7+d*.4-5,28-d*.25,11,5,2.5,shade(c,-5,28,10,5,'#fffbed','#b8c4c8'));round(c,side*7+d*.4-5,32-d*.25,11,1.5,.6,'#223443');}
 for(const side of [-1,1]){c.lineWidth=8;c.strokeStyle=skin;c.beginPath();c.moveTo(side*12,-1);c.quadraticCurveTo(side*(15+Math.abs(stride)*.2),5,side*14,12+side*stride);c.stroke();ellipse(c,side*14,12+side*stride,4.2,4.5,skin);round(c,side<0?-16:9,-6,7,12,3,shirt);}
 round(c,-13,-7,26,27,8,shirt);round(c,-10,13,20,7,3,pants);round(c,-3,-12,6,6,2,skin);
 c.strokeStyle=seb?'#d9f1e7':'#8297b0';c.lineWidth=1;c.beginPath();c.moveTo(-7,-4);c.quadraticCurveTo(0,1,7,-4);c.stroke();c.fillStyle='#ffffff18';c.beginPath();c.ellipse(-7,2,3,9,-.25,0,Math.PI*2);c.fill();
 if(!avatarHead(c,who,front,-15,-42,30,35)){ellipse(c,0,-26,11,14,skin);round(c,-10,-39,20,8,4,seb?'#645249':'#3c302c');}
 if(pose==='collision'){c.font='bold 10px system-ui';c.fillStyle='#ffe6a2';c.fillText('✦',-20,-38);c.fillText('✦',14,-35);}c.restore();
}
export function portrait(canvas,who){canvas.width=192;canvas.height=192;const c=canvas.getContext('2d');c.setTransform(2,0,0,2,0,0);const g=c.createLinearGradient(0,0,96,96);g.addColorStop(0,who==='tom'?'#284263':'#397c70');g.addColorStop(1,'#12282a');round(c,0,0,96,96,12,g);if(!avatarHead(c,who,true,0,0,96,96)){waitingPortraits.set(canvas,who);ellipse(c,48,48,25,32,'#8ca79b');}}
