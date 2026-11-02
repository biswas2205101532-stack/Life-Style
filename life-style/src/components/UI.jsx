import {Check as Tick} from 'lucide-react'
export const Bar=({pct,h='h-2'})=><div className={`w-full ${h} rounded-full bg-line overflow-hidden`}><div className="h-full rounded-full bg-brand transition-all duration-700" style={{width:pct+'%'}}/></div>
export const Check=({on,onClick})=><button onClick={onClick} aria-label="toggle" className={`shrink-0 w-6 h-6 rounded-md border-2 grid place-items-center transition ${on?'bg-brand border-brand pop':'border-line hover:border-brand'}`}>{on&&<Tick size={16} color="#fff" strokeWidth={3}/>}</button>
export const Stat=({label,value})=><div className="card"><div className="text-xs text-mut">{label}</div><div className="text-2xl font-bold mt-1">{value}</div></div>
export const Head=({title,sub,children})=><div className="flex flex-wrap items-end justify-between gap-3 mb-6"><div><h1 className="text-2xl font-bold">{title}</h1>{sub&&<p className="text-mut text-sm mt-1">{sub}</p>}</div>{children}</div>
