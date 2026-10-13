const news = id => `/newsroom/${id}.html`;
export const DISCLOSURES = {
 domain:{text:'Registered by someone with better timing.',url:news('planwerk-com-au-open-letter'),label:'The domain matter'},
 investor:{text:'Due diligence waived. He liked the deck.',url:news('series-b'),label:'Conviction before revenue'},
 users:{text:'An actual user. Nobody move.'},
 cayman:{text:'Grand Cayman office opened. Desk, product and tax all pending.'},
 seed:{text:'Seed round raised. Product remains a rumour.',url:news('seed-round'),label:'Two napkins, one valuation'},
 alex:{text:'Finance Manager acquired. Alex notification pending.',url:news('finance-manager-acquisition'),label:'Tell Alex'},
 bprime:{text:'Series B-Prime. Stopping now would raise questions.',url:news('series-b-extension'),label:'A Series C to fund a Series D'},
 sunkcost:{text:'Sunk Cost Capital: we’ve come this far.',url:news('series-b'),label:'Spiritually available'},
 quickone:{text:'Shivers has returned.',url:news('unnamed-individual-returns-to-melbourne'),label:'The quick catch-up'},
 offices:{text:'Office 17. Ask someone which one this is.',url:'/team.html',label:'Seventeen offices, allegedly'},
 university:{text:'Honorary Doctorate in Avoiding Deliverables.',url:'/university.html',label:'No external oversight'},
 deck:{text:'The investor has now read the deck twice.',url:news('series-a'),label:'The deck has been read'},
 logo:{text:'Series A. The idea now has a logo.',url:news('series-a'),label:'An idea with a logo'},
 finalfile:{text:'final_final_v2_FIXED_ACTUAL.pdf',url:news('finance-manager-acquisition'),label:'The final file'},
 capacity:{text:'92% claimed. Remaining capacity: you.'},
 gemini:{text:'Gemini estimates that this is probably money.'},
 founder:{text:'Founder confidence remains unaffected by evidence.'},
 meeting:{text:'This meeting could have been avoided.'},
 launch:{text:'First contact with a deliverable. Operations suspended.'},
 retirement:{text:'The board has reappointed you following an exhaustive search of this screen.'},
 redacted:{text:'Your quick catch-up has been accepted.'}
};
export const HAZARDS={workshop:{label:'PRESS RELEASE',hint:'Change lanes',headline:'PlanWerk issues statement following collision with its own statement',body:'The release was approved by Communications, being Sebastian. No product was involved.'},launch:{label:'LAUNCH',hint:'Change lanes',headline:'Product launch makes unexpected contact with company',body:'No customers were affected. No customers have been identified.'},scope:{label:'SHEETS',hint:'Jump or dodge',headline:'Scope increase delivered directly to management',body:'The request was described as tiny until it occupied an entire lane.'},payroll:{label:'PAYROLL.XLS',hint:'Jump or dodge',headline:'Finance Manager discovers recurring expenditure',body:'Payroll has arrived. Leadership has departed. Alex is still awaiting the acquisition email.'},diligence:{label:'DILIGENCE',hint:'Slide or dodge',headline:'Due diligence identifies a height discrepancy',body:'The company acknowledges that ducking was among the options presented to management.'},meeting:{label:'ALL HANDS',hint:'Slide or dodge',headline:'Founder attendance exceeds structural capacity',body:'Cameras on. Founder down. A working group has been formed behind the obstacle.'}};
export function release(w){const h=HAZARDS[w.last]||HAZARDS.workshop;return {headline:h.headline,body:`${w.character==='tom'?'Tom':'Sebastian'} covered ${Math.floor(w.distanceMm/1000).toLocaleString()} metres and raised $${w.cash}M in fictional funding, acquiring ${w.users} users along the way. ${w.character==='tom'?'Gemini described the route as clear. Tom will be asking a follow-up question.':'Sebastian described the impact as aggressive market entry. The board retains full confidence.'} ${h.body} ${w.avoided>=12?'The board has classified '+w.avoided+' avoided deliverables as productivity.':w.users===0?'Customer impact: none. Customer existence: also none.':'Your '+w.users+' users will be notified once Communications has found them.'}`};}
