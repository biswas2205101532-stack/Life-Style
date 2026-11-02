import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Search,Copy,Trash2,Plus} from 'lucide-react'
import {useStore} from '../context/Store'
import {catalog} from '../data/catalog'
import {emptyRoadmap} from '../data/seed'
import {stat,uid} from '../utils/calc'
import {Bar,Head} from '../components/UI'
export function Paths(){
const {s,up}=useStore();const nav=useNavigate();const [q,setQ]=useState('');const [cat,setCat]=useState('All');const [nn,setNn]=useState('');const [nc,setNc]=useState('')
const items=[];Object.entries(catalog).forEach(([c,a])=>a.forEach(n=>items.push([n,c])))
s.roadmaps.forEach(r=>{if(!items.some(i=>i[0]===r.title))items.push([r.title,r.cat])})
const cats=['All',...new Set(items.map(i=>i[1]))]
const open=(n,c)=>{let r=s.roadmaps.find(x=>x.title===n);if(!r){r=emptyRoadmap(n,c);up(d=>{d.roadmaps.push(r)})}nav('/roadmap/'+r.id)}
const shown=items.filter(([n,c])=>(cat==='All'||c===cat)&&n.toLowerCase().includes(q.toLowerCase()))
return <div><Head title="Learning Paths" sub="Pick a path to open or create its roadmap."/>
<div className="relative mb-4"><Search size={16} className="absolute left-3 top-3 text-mut"/><input className="inp pl-9" placeholder="Search paths…" value={q} onChange={e=>setQ(e.target.value)}/></div>
<div className="flex flex-wrap gap-2 mb-6">{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${cat===c?'bg-brand border-brand text-white':'border-line text-mut'}`}>{c}</button>)}</div>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{shown.map(([n,c])=>{const r=s.roadmaps.find(x=>x.title===n);const st=r&&stat(r)
return <button key={n} onClick={()=>open(n,c)} className="card text-left hover:border-brand transition"><div className="font-semibold">{n}</div><div className="text-xs text-mut mb-3">{c}</div>{st?<><Bar pct={st.pct}/><div className="text-xs text-mut mt-2">{st.done}/{st.total} topics</div></>:<div className="text-xs text-mut">Not started</div>}</button>})}
{!shown.length&&<p className="text-mut">No paths match.</p>}</div>
<div className="card mt-8"><h2 className="font-semibold mb-3">Create custom learning path</h2><div className="flex flex-wrap gap-3"><input className="inp sm:w-64" placeholder="Name" value={nn} onChange={e=>setNn(e.target.value)}/><input className="inp sm:w-64" placeholder="Category (new or existing)" value={nc} onChange={e=>setNc(e.target.value)}/><button className="btn" disabled={!nn.trim()} onClick={()=>{open(nn.trim(),nc.trim()||'Custom');setNn('');setNc('')}}><Plus size={16}/>Create</button></div></div></div>}
export function Roadmaps(){
const {s,up}=useStore();const nav=useNavigate()
const dup=r=>up(d=>{const c=structuredClone(r);c.id=uid();c.title+=' (copy)';c.weeks.forEach(w=>{w.id=uid();w.topics.forEach(t=>{t.id=uid();t.done=false})});d.roadmaps.push(c)})
const del=r=>{if(confirm(`Delete "${r.title}"?`))up(d=>{d.roadmaps=d.roadmaps.filter(x=>x.id!==r.id);if(d.active===r.id)d.active=d.roadmaps[0]?.id})}
return <div><Head title="My Roadmaps"><button className="btn" onClick={()=>{const t=prompt('Roadmap name');if(t){const r=emptyRoadmap(t,'Custom');up(d=>{d.roadmaps.push(r)});nav('/roadmap/'+r.id)}}}><Plus size={16}/>New roadmap</button></Head>
<div className="grid md:grid-cols-2 gap-4">{s.roadmaps.map(r=>{const st=stat(r);return <div key={r.id} className="card"><div className="flex justify-between"><div><div className="font-semibold">{r.title}</div><div className="text-xs text-mut">{r.weeks.length} weeks · {st.done}/{st.total} topics</div></div><div className="font-bold">{st.pct}%</div></div><div className="my-4"><Bar pct={st.pct}/></div>
<div className="flex gap-2"><button className="btn" onClick={()=>nav('/roadmap/'+r.id)}>Open</button><button className="btn2" onClick={()=>dup(r)}><Copy size={14}/></button><button className="btn2" onClick={()=>del(r)}><Trash2 size={14}/></button></div></div>})}
{!s.roadmaps.length&&<p className="text-mut">No roadmaps yet.</p>}</div></div>}
