import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'


export type SwipeCard = { id:string; name:string; price:number; image:string }


export default function SwipeDeck({ items, onLike, onSkip }:{ items:SwipeCard[]; onLike:(c:SwipeCard)=>void; onSkip:(c:SwipeCard)=>void }){
const [stack, setStack] = useState(items)


if(stack.length === 0) return <div className="muted">No more items. Adjust filters!</div>


const current = stack[0]
const x = useMotionValue(0)
const rotate = useTransform(x, [-200,200], [-12,12])
const alpha = useTransform(x, [-200,0,200], [0.9,1,0.9])


function end(dir:number){
setStack(s => s.slice(1))
dir > 0 ? onLike(current) : onSkip(current)
}


return (
<div className="deck">
<motion.div
className="card"
style={{ x, rotate, opacity: alpha }}
drag="x"
dragConstraints={{ left:0, right:0 }}
dragElastic={0.7}
onDragEnd={(_, info)=> end(info.offset.x)}
>
<img src={current.image} alt={current.name} className="card-img"/>
<div className="card-info">
<div>
<h3>{current.name}</h3>
<p className="price">${current.price.toFixed(2)}</p>
</div>
<div className="row">
<button className="btn ghost" onClick={()=>end(-1)}>Skip</button>
<button className="btn primary" onClick={()=>end(1)}>Add</button>
</div>
</div>
</motion.div>
</div>
)
}