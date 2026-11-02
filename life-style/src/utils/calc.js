export const uid=()=>Math.random().toString(36).slice(2,9)
export const topics=r=>r.weeks.flatMap(w=>w.topics)
export const stat=r=>{const t=topics(r),d=t.filter(x=>x.done).length
return{total:t.length,done:d,left:t.length-d,pct:t.length?Math.round(d/t.length*1000)/10:0}}
export const wstat=w=>{const d=w.topics.filter(x=>x.done).length
return{total:w.topics.length,done:d,pct:w.topics.length?Math.round(d/w.topics.length*1000)/10:0,complete:w.topics.length>0&&d===w.topics.length}}
export const next=r=>{for(const [i,w] of r.weeks.entries()){const t=w.topics.find(x=>!x.done);if(t)return{t,w,wn:i+1}}return null}
export const overall=s=>{const a=s.roadmaps.map(stat);const t=a.reduce((x,y)=>x+y.total,0),d=a.reduce((x,y)=>x+y.done,0)
return{total:t,done:d,pct:t?Math.round(d/t*1000)/10:0}}
export const achievements=s=>{const {done}=overall(s)
const wk=s.roadmaps.some(r=>r.weeks.some(w=>wstat(w).complete))
const rm=s.roadmaps.some(r=>{const x=stat(r);return x.total>0&&x.done===x.total})
return[{n:'First Step',d:'Complete your first topic',ok:done>=1},{n:'Getting Started',d:'Complete 5 topics',ok:done>=5},
{n:'Consistency',d:'Complete 10 topics',ok:done>=10},{n:'Week Master',d:'Complete an entire week',ok:wk},{n:'Roadmap Master',d:'Complete an entire roadmap',ok:rm}]}
