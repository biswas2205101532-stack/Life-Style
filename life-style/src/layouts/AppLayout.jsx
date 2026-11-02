import {useState} from 'react'
import {NavLink,Outlet} from 'react-router-dom'
import {Home,LayoutDashboard,BookOpen,Map,Target,BarChart3,Award,Settings,Menu,X} from 'lucide-react'
import {useStore} from '../context/Store'
const nav=[['/','Home',Home],['/dashboard','My Dashboard',LayoutDashboard],['/paths','Learning Paths',BookOpen],['/roadmaps','My Roadmaps',Map],['/goals','Life Goals',Target],['/analytics','Progress & Analytics',BarChart3],['/achievements','Achievements',Award],['/settings','Settings',Settings]]
export default function Layout(){
const {s}=useStore();const [o,setO]=useState(false)
const side=<div className="flex flex-col h-full p-4">
<div className="font-extrabold tracking-wide text-lg px-2 mb-6">LIFE <span className="text-brand">STYLE</span></div>
<nav className="space-y-1 flex-1">{nav.map(([to,l,I])=><NavLink key={to} to={to} end onClick={()=>setO(false)} className={({isActive})=>`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${isActive&&to!=='/'?'bg-brand text-white':'text-mut hover:bg-card hover:text-tx'}`}><I size={18}/>{l}</NavLink>)}</nav>
<div className="flex items-center gap-3 p-2 border-t border-line pt-4"><div className="w-9 h-9 rounded-full bg-brand grid place-items-center font-bold text-white">{(s.name||'L')[0].toUpperCase()}</div><div className="text-sm font-semibold truncate">{s.name}</div></div></div>
return <div className="min-h-screen">
<aside className="hidden md:block fixed inset-y-0 left-0 w-64 bg-side border-r border-line">{side}</aside>
<div className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-side border-b border-line px-4 h-14"><span className="font-extrabold">LIFE <span className="text-brand">STYLE</span></span><button onClick={()=>setO(true)}><Menu/></button></div>
{o&&<div className="fixed inset-0 z-40 flex"><div className="w-64 bg-side">{side}</div><div className="flex-1 bg-black/60" onClick={()=>setO(false)}><X className="m-4 text-white"/></div></div>}
<main className="md:ml-64 p-4 md:p-8 max-w-6xl"><Outlet/></main></div>}
