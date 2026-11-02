// Storage adapter. To move to Supabase later, replace load/save with async calls to your table.
const KEY='lifestyle.v1'
export const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch{return null}}
export const save=s=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch{}}
export const clear=()=>localStorage.removeItem(KEY)
