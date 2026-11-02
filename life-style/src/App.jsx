import {Routes,Route,Navigate} from 'react-router-dom'
import Layout from './layouts/AppLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import {Paths,Roadmaps} from './pages/Paths'
import Roadmap from './pages/Roadmap'
import Goals from './pages/Goals'
import {Analytics,Achievements,Settings} from './pages/Misc'
export default function App(){return <Routes>
<Route path="/" element={<Landing/>}/>
<Route element={<Layout/>}>
<Route path="/dashboard" element={<Dashboard/>}/><Route path="/paths" element={<Paths/>}/>
<Route path="/roadmaps" element={<Roadmaps/>}/><Route path="/roadmap/:id" element={<Roadmap/>}/>
<Route path="/goals" element={<Goals/>}/><Route path="/analytics" element={<Analytics/>}/>
<Route path="/achievements" element={<Achievements/>}/><Route path="/settings" element={<Settings/>}/></Route>
<Route path="*" element={<Navigate to="/"/>}/></Routes>}
