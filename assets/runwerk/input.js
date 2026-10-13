export function installInput({canvas,onAction,onEscape,onPause,isPlaying}){
 const keys={ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right',ArrowUp:'jump',w:'jump',' ':'jump',ArrowDown:'slide',s:'slide'};
 document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable)return;if(e.key==='Escape'){e.preventDefault();if(!e.repeat)onEscape();return;}if(!isPlaying())return;const action=keys[e.key]||keys[e.key.toLowerCase()];if(action){e.preventDefault();if(!e.repeat)onAction(action);}if(e.key.toLowerCase()==='p'){e.preventDefault();if(!e.repeat)onPause();}});
 document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>onAction(b.dataset.action)));
 let origin=null;canvas.addEventListener('pointerdown',e=>{if(!isPlaying())return;origin={x:e.clientX,y:e.clientY,id:e.pointerId};try{canvas.setPointerCapture(e.pointerId);}catch{}});
 canvas.addEventListener('pointerup',e=>{if(!origin||origin.id!==e.pointerId)return;const dx=e.clientX-origin.x,dy=e.clientY-origin.y;origin=null;if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;if(Math.abs(dx)>Math.abs(dy)*1.2)onAction(dx<0?'left':'right');else if(Math.abs(dy)>Math.abs(dx)*1.2)onAction(dy<0?'jump':'slide');});canvas.addEventListener('pointercancel',()=>{origin=null;});
 window.addEventListener('blur',onPause);document.addEventListener('visibilitychange',()=>{if(document.hidden)onPause();});
}
