import {useRef} from 'react'
import {useStore} from '../context/Store'
import {overall,stat,wstat,achievements} from '../utils/calc'
import {clear} from '../utils/storage'
import {seed} from '../data/seed'
import {Stat,Head} from '../components/UI'
export function Analytics(){
const {s}=useStore();const o=overall(s);const ag=s.goals.filter(g=>g.status!=='Completed').length
return <div className="space-y-6"><Head title="Progress & Analytics"/>
<div className="grid grid-cols-2 lg:grid-cols-3 gap-4"><Stat label="Completed Topics" value={o.done}/><Stat label="Active Roadmaps" value={s.roadmaps.filter(r=>stat(r).pct<100).length}/><Stat label="Overall Progress" value={o.pct+'%'}/><Stat label="Completed Goals" value={s.goals.length-ag}/><Stat label="Remaining Goals" value={ag}/></div>
{s.roadmaps.map(r=><div key={r.id} className="card"><div className="flex justify-between mb-4"><b>{r.title}</b><span className="text-sm text-mut">{stat(r).pct}%</span></div>
<div className="flex items-end gap-3 h-32">{r.weeks.map(w=>{const x=wstat(w);return <div key={w.id} className="flex-1 flex flex-col items-center justify-end h-full"><div className="text-xs text-mut mb-1">{x.pct}%</div><div className="w-full max-w-[56px] rounded-t-lg bg-brand transition-all duration-700" style={{height:Math.max(x.pct,2)+'%',opacity:x.pct?1:.25}}/></div>})}</div>
<div className="flex gap-3 mt-2">{r.weeks.map((w,i)=><div key={w.id} className="flex-1 text-center text-xs text-mut">W{i+1}</div>)}</div></div>)}</div>}
export function Achievements(){
const {s}=useStore();return <div><Head title="Achievements"/><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{achievements(s).map(a=><div key={a.n} className={`card ${a.ok?'border-brand':'opacity-50'}`}><div className="text-3xl mb-2">{a.ok?'🏆':'🔒'}</div><div className="font-semibold">{a.n}</div><div className="text-sm text-mut">{a.d}</div></div>)}</div></div>}
export function Settings(){
const {s,up,set}=useStore();const fr=useRef()
const exp=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(s,null,2)],{type:'application/json'}));a.download='life-style-backup.json';a.click()}
const imp=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{try{const d=JSON.parse(t);if(!Array.isArray(d.roadmaps)||!Array.isArray(d.goals))throw 0;if(confirm('Replace current data with this file?'))set(d)}catch{alert('Invalid backup file.')}});e.target.value=''}
const reset=()=>{if(confirm('Reset ALL progress, roadmaps and goals? This cannot be undone.')){clear();set(seed())}}
return <div className="space-y-6 max-w-xl"><Head title="Settings"/>
<div className="card space-y-3"><label className="text-sm text-mut">Display name</label><input className="inp" value={s.name} onChange={e=>up(d=>{d.name=e.target.value})}/>
<label className="text-sm text-mut">Theme</label><div className="flex gap-2">{['dark','light'].map(t=><button key={t} onClick={()=>up(d=>{d.theme=t})} className={s.theme===t?'btn':'btn2'}>{t==='dark'?'Dark Mode':'Light Mode'}</button>)}</div></div>
<div className="card space-y-3"><div className="font-semibold">Data</div><div className="flex flex-wrap gap-2"><button className="btn2" onClick={exp}>Export Data</button><button className="btn2" onClick={()=>fr.current.click()}>Import Data</button><input ref={fr} type="file" accept="application/json" hidden onChange={imp}/><button className="btn" onClick={reset}>Reset Progress</button></div></div></div>}
