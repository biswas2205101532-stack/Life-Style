import {Link} from 'react-router-dom'
import {overall,stat} from '../utils/calc'
import {useStore} from '../context/Store'
import {Bar} from '../components/UI'
export default function Landing(){
const {s}=useStore();const o=overall(s);const r=s.roadmaps.find(x=>x.id===s.active)||s.roadmaps[0];const st=r&&stat(r)
return <div className="min-h-screen">
<header className="max-w-6xl mx-auto flex items-center justify-between p-5"><span className="font-extrabold text-lg">LIFE <span className="text-brand">STYLE</span></span><Link to="/dashboard" className="btn2">Dashboard</Link></header>
<section className="max-w-6xl mx-auto px-5 py-12 grid lg:grid-cols-2 gap-12 items-center">
<div><h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Design Your Life. <span className="text-brand">Track Your Growth.</span></h1>
<p className="text-mut mt-5 text-lg max-w-lg">Your personal space to organize goals, build skills, learn programming, and become better every day.</p>
<div className="flex flex-wrap gap-3 mt-8"><Link to="/dashboard" className="btn">START YOUR JOURNEY</Link><Link to="/paths" className="btn2">EXPLORE ROADMAPS</Link></div></div>
<div className="card space-y-5 shadow-2xl"><div className="flex justify-between text-sm"><span className="text-mut">Overall progress</span><b>{o.pct}%</b></div><Bar pct={o.pct} h="h-3"/>
{st&&<div className="bg-app rounded-xl p-4"><div className="font-semibold">{r.title}</div><div className="text-xs text-mut mb-3">{st.done} of {st.total} topics</div><Bar pct={st.pct}/></div>}
<div className="grid grid-cols-3 gap-3 text-center">{[['Topics',o.total],['Done',o.done],['Goals',s.goals.length]].map(([a,b])=><div key={a} className="bg-app rounded-xl p-3"><div className="text-xl font-bold">{b}</div><div className="text-xs text-mut">{a}</div></div>)}</div></div></section></div>}
