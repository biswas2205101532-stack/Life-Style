import {useParams,Link} from 'react-router-dom'
import {ArrowUp,ArrowDown,Trash2,Link2,Plus,Pencil} from 'lucide-react'
import {useStore} from '../context/Store'
import {stat,wstat,next,uid} from '../utils/calc'
import {Bar,Check,Stat} from '../components/UI'
export default function Roadmap(){
const {id}=useParams();const {s,up}=useStore();const r=s.roadmaps.find(x=>x.id===id)
if(!r)return <div className="card">Roadmap not found. <Link className="text-brand" to="/paths">Browse paths</Link></div>
const st=stat(r),nx=next(r)
const mod=f=>up(d=>f(d.roadmaps.find(x=>x.id===id),d))
const setDur=v=>{let n=v==='custom'?parseInt(prompt('Number of weeks'),10):+v;if(!n||n<1||n>52)return
if(n<r.weeks.length&&r.weeks.slice(n).some(w=>w.topics.length)&&!confirm('Weeks beyond '+n+' contain topics and will be removed. Continue?'))return
mod(x=>{while(x.weeks.length<n)x.weeks.push({id:uid(),name:'Week '+(x.weeks.length+1),topics:[]});x.weeks.length=n})}
const mv=(wi,ti,d)=>mod(x=>{const a=x.weeks[wi].topics;const j=ti+d;if(j<0||j>=a.length)return;[a[ti],a[j]]=[a[j],a[ti]]})
return <div className="space-y-6">
<div><div className="flex flex-wrap items-center justify-between gap-3"><input className="text-2xl font-bold bg-transparent outline-none border-b border-transparent focus:border-brand" value={r.title} onChange={e=>mod(x=>{x.title=e.target.value})}/>
<div className="flex gap-2 items-center"><button className="btn2" onClick={()=>up(d=>{d.active=id})}>{s.active===id?'Active roadmap':'Set active'}</button><select className="inp w-auto" value={[2,4,6,8].includes(r.weeks.length)?r.weeks.length:'custom'} onChange={e=>setDur(e.target.value)}>{[2,4,6,8].map(n=><option key={n} value={n}>{n} weeks</option>)}<option value="custom">Custom ({r.weeks.length})</option></select></div></div>
<input className="w-full mt-2 text-sm text-mut bg-transparent outline-none" value={r.desc} onChange={e=>mod(x=>{x.desc=e.target.value})}/></div>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><Stat label="Total Topics" value={st.total}/><Stat label="Completed" value={st.done}/><Stat label="Remaining" value={st.left}/><Stat label="Progress" value={st.pct+'%'}/></div>
<Bar pct={st.pct} h="h-3"/>
<div className="card border-brand"><div className="text-xs text-mut mb-1">NEXT TOPIC</div>{nx?<div className="flex flex-wrap items-center justify-between gap-3"><div><div className="font-bold text-lg">{nx.t.title}</div><div className="text-xs text-mut">Week {nx.wn} · Not completed</div></div>{nx.t.url&&<a className="btn" href={nx.t.url} target="_blank" rel="noreferrer">START LEARNING</a>}</div>:<div className="font-bold">{st.total?'ROADMAP COMPLETED! 🎉':'Add topics to get started.'}</div>}</div>
{r.weeks.map((w,wi)=>{const x=wstat(w);return <div key={w.id} className="card">
<div className="flex items-center justify-between gap-3 mb-2"><div className="flex items-center gap-2 flex-1"><input className="font-semibold bg-transparent outline-none flex-1" value={w.name} onChange={e=>mod(y=>{y.weeks[wi].name=e.target.value})}/>{x.complete&&<span className="text-xs font-bold text-brand">WEEK COMPLETED!</span>}</div><span className="text-xs text-mut">{x.done}/{x.total} · {x.pct}%</span>
<button className="text-mut hover:text-brand" title="Delete week" onClick={()=>confirm('Delete this week?')&&mod(y=>{y.weeks.splice(wi,1)})}><Trash2 size={15}/></button></div>
<Bar pct={x.pct}/>
<ul className="mt-3 divide-y divide-line">{w.topics.map((t,ti)=><li key={t.id} className="flex items-center gap-3 py-2.5">
<Check on={t.done} onClick={()=>mod(y=>{y.weeks[wi].topics[ti].done=!t.done})}/>
<input className={`flex-1 bg-transparent outline-none text-sm ${t.done?'line-through text-mut':''}`} value={t.title} onChange={e=>mod(y=>{y.weeks[wi].topics[ti].title=e.target.value})}/>
{t.url&&<a className="btn2 !py-1.5 !px-2.5 !text-xs hidden sm:inline-flex" href={t.url} target="_blank" rel="noreferrer">LEARN & PRACTICE</a>}
<button title="Edit link" className="text-mut hover:text-tx" onClick={()=>{const u=prompt('Resource URL',t.url||'https://');if(u!==null)mod(y=>{y.weeks[wi].topics[ti].url=u.trim()})}}>{t.url?<Pencil size={14}/>:<Link2 size={14}/>}</button>
<button className="text-mut hover:text-tx" onClick={()=>mv(wi,ti,-1)}><ArrowUp size={14}/></button><button className="text-mut hover:text-tx" onClick={()=>mv(wi,ti,1)}><ArrowDown size={14}/></button>
<button className="text-mut hover:text-brand" onClick={()=>mod(y=>{y.weeks[wi].topics.splice(ti,1)})}><Trash2 size={14}/></button></li>)}</ul>
<form className="flex gap-2 mt-3" onSubmit={e=>{e.preventDefault();const v=e.target.t.value.trim();if(!v)return;mod(y=>{y.weeks[wi].topics.push({id:uid(),title:v,url:'',done:false})});e.target.reset()}}><input name="t" className="inp" placeholder="Add topic…"/><button className="btn"><Plus size={16}/></button></form></div>})}
<button className="btn2" onClick={()=>mod(y=>{y.weeks.push({id:uid(),name:'Week '+(y.weeks.length+1),topics:[]})})}><Plus size={16}/>Add week</button></div>}
