import {createContext,useContext,useEffect,useState} from 'react'
import {load,save} from '../utils/storage'
import {seed} from '../data/seed'
const C=createContext()
export const useStore=()=>useContext(C)
export function Provider({children}){
const [s,set]=useState(()=>load()||seed())
useEffect(()=>{save(s);document.documentElement.classList.toggle('light',s.theme==='light')},[s])
const up=f=>set(p=>{const n=structuredClone(p);f(n);return n})
return <C.Provider value={{s,up,set}}>{children}</C.Provider>}
