import {useState} from 'react'
import {Pencil,Trash2,CheckCircle2} from 'lucide-react'
import {useStore} from '../context/Store'
import {uid} from '../utils/calc'
import {Bar,Head} from '../components/UI'
const cats=['Academic','Career','Fitness','Financial','Personal Development','Daily Habits','Future Plans']
const blank={name:'',desc:'',cat:cats[0],date:'',priority:'Medium',status:'Not Started',progress:0}
export default function Goals(){
const {s,up}=useStore();const [f,setF]=useState(blank)
const set=(k,v)=>setF(p=>({...p,[k]:v}))
const submit=e=>{e.preventDefault();if(!f.name.trim())return
up(d=>{if(f.id)d.goals=d.goals.map(g=>g.id===f.id?f:g);else d.goals.push({...f,id:uid()})});setF(blank)}
return <div><Head title="My Life Goals" sub="Academic, career, fitness, financial and more."/>
<form onSubmit={submit} className="card grid md:grid-cols-3 gap-3 mb-6">
<input className="inp md:col-span-2" placeholder="Goal name" value={f.name} onChange={e=>set('name',e.target.value)}/>
<select className="inp" value={f.cat} onChange={e=>set('cat',e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select>
<input className="inp md:col-span-3" placeholder="Description" value={f.desc} onChange={e=>set('desc',e.target.value)}/>
<input type="date" className="inp" value={f.date} onChange={e=>set('date',e.target.value)}/>
<select className="inp" value={f.priority} onChange={e=>set('priority',e.target.value)}>{['Low','Medium','High'].map(c=><option key={c}>{c}</option>)}</select>
<select className="inp" value={f.status} onChange={e=>set('status',e.target.value)}>{['Not Started','In Progress','Completed'].map(c=><option key={c}>{c}</option>)}</select>
<label className="md:col-span-2 text-xs text-mut flex items-center gap-3">Progress {f.progress}%<input type="range" className="flex-1 accent-[#D83A42]" value={f.progress} onChange={e=>set('progress',+e.target.value)}/></label>
<div className="flex gap-2"><button className="btn flex-1">{f.id?'Save goal':'Add goal'}</button>{f.id&&<button type="button" className="btn2" onClick={()=>setF(blank)}>Cancel</button>}</div></form>
<div className="grid md:grid-cols-2 gap-4">{s.goals.map(g=><div key={g.id} className="card"><div className="flex justify-between gap-2"><div><div className={`font-semibold ${g.status==='Completed'?'line-through text-mut':''}`}>{g.name}</div><div className="text-xs text-mut">{g.cat} · {g.priority} priority{g.date&&' · '+g.date} · {g.status}</div></div>
<div className="flex gap-2 text-mut"><button title="Complete" onClick={()=>up(d=>{const x=d.goals.find(y=>y.id===g.id);x.status='Completed';x.progress=100})}><CheckCircle2 size={18} className={g.status==='Completed'?'text-brand':''}/></button><button onClick={()=>setF(g)}><Pencil size={16}/></button><button onClick={()=>confirm('Delete goal?')&&up(d=>{d.goals=d.goals.filter(y=>y.id!==g.id)})}><Trash2 size={16}/></button></div></div>
{g.desc&&<p className="text-sm text-mut mt-2">{g.desc}</p>}<div className="mt-3"><Bar pct={g.progress}/></div></div>)}
{!s.goals.length&&<p className="text-mut">No goals yet — add your first one above.</p>}</div></div>}
