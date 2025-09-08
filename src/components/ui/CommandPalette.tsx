import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'


const commands = [
{ label: 'Home', action: (nav:any)=> nav('/') },
{ label: 'Open Cart', action: (nav:any)=> nav('/Cart') },
{ label: 'Open Wishlist', action: (nav:any)=> nav('/Wishlist') },
{ label: 'Search Headphones', action: (nav:any)=> nav('/?q=headphones') }
]


export default function CommandPalette(){
const [open, setOpen] = useState(false)
const [q, setQ] = useState('')
const nav = useNavigate()


useEffect(()=>{
const onKey = (e:KeyboardEvent)=>{
if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
e.preventDefault(); setOpen(true)
}
}
const onOpen = ()=> setOpen(true)
window.addEventListener('keydown', onKey)
window.addEventListener('open-cmdk', onOpen as any)
return ()=>{ window.removeEventListener('keydown', onKey); window.removeEventListener('open-cmdk', onOpen as any) }
},[])


const list = useMemo(()=> commands.filter(c=> c.label.toLowerCase().includes(q.toLowerCase())),[q])


if(!open) return null
return createPortal(
<div className="cmdk" onClick={()=>setOpen(false)}>
<div className="cmdk-panel" onClick={e=>e.stopPropagation()}>
<input autoFocus placeholder="Type a command…" value={q} onChange={e=>setQ(e.target.value)} />
<ul>
{list.map((c,i)=> (
<li key={i} onClick={()=>{ c.action(nav); setOpen(false) }}>{c.label}</li>
))}
{list.length===0 && <li className="muted">No commands</li>}
</ul>
</div>
</div>,
document.body
)
}