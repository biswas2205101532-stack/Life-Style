import {Link,useNavigate} from 'react-router-dom'
import {useStore} from '../context/Store'
import {overall,stat,wstat,next,achievements} from '../utils/calc'
import {Bar,Stat,Head} from '../components/UI'
export default function Dashboard(){
const {s}=useStore();const nav=useNavigate();const o=overall(s)
const r=s.roadmaps.find(x=>x.id===s.active)||s.roadmaps[0];const st=r&&stat(r);const nx=r&&next(r)
const ag=s.goals.filter(g=>g.status!=='Completed').length,cg=s.goals.length-ag
return <div className="space-y-6">
<Head title={`Welcome back, ${s.name}`} sub={new Date().toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'})}/>
<div className="grid grid-cols-2 lg:grid-cols-5 gap-4"><Stat label="Active Goals" value={ag}/><Stat label="Completed Goals" value={cg}/><Stat label="Learning Topics" value={o.total}/><Stat label="Completed Topics" value={o.done}/><Stat label="Overall Progress" value={o.pct+'%'}/></div>
<div className="grid lg:grid-cols-2 gap-6">
<div className="card"><h2 className="font-semibold mb-3">Continue Learning</h2>{r?<><div className="text-lg font-bold">{r.title}</div><div className="text-sm text-mut mb-3">{st.done}/{st.total} topics · {st.pct}%</div><Bar pct={st.pct}/><button className="btn mt-4" onClick={()=>nav('/roadmap/'+r.id)}>Continue</button></>:<Link className="btn" to="/paths">Pick a path</Link>}</div>
<div className="card"><h2 className="font-semibold mb-3">Today's Focus</h2>{nx?<><div className="text-lg font-bold">{nx.t.title}</div><div className="text-sm text-mut mb-3">Week {nx.wn} · Not completed</div><div className="flex gap-2">{nx.t.url&&<a className="btn" href={nx.t.url} target="_blank" rel="noreferrer">LEARN & PRACTICE</a>}<button className="btn2" onClick={()=>nav('/roadmap/'+r.id)}>Open roadmap</button></div></>:<p className="text-mut">{r&&st.total>0?'ROADMAP COMPLETED! 🎉':'Add topics to a roadmap to get a focus.'}</p>}</div></div>
<div className="grid lg:grid-cols-2 gap-6">
<div className="card"><h2 className="font-semibold mb-3">Weekly Overview</h2><div className="space-y-3">{r?.weeks.map(w=>{const x=wstat(w);return <div key={w.id}><div className="flex justify-between text-xs text-mut mb-1"><span>{w.name}</span><span>{x.done}/{x.total}</span></div><Bar pct={x.pct}/></div>})}</div></div>
<div className="card"><h2 className="font-semibold mb-3">Recent Achievements</h2>{achievements(s).filter(a=>a.ok).map(a=><div key={a.n} className="text-sm py-1">🏆 {a.n}</div>)}{!achievements(s).some(a=>a.ok)&&<p className="text-mut text-sm">Complete a topic to unlock your first badge.</p>}</div></div></div>}
