import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getDB, getItem, setItem } from '../hooks/useIndexedDB'


type Item = { id:string; name:string; price:number; image?:string; qty:number }


type Ctx = {
cart: Item[];
wishlist: Item[];
addToCart: (p: Omit<Item,'qty'>) => void;
addToWishlist:(p: Omit<Item,'qty'>) => void;
removeFromCart:(id:string)=>void;
}


const CartCtx = createContext<Ctx | null>(null)


export function CartProvider({ children }:{children:React.ReactNode}){
const [cart, setCart] = useState<Item[]>([])
const [wishlist, setWishlist] = useState<Item[]>([])


useEffect(()=>{ (async()=>{
await getDB()
setCart((await getItem<Item[]>('cart')) || [])
setWishlist((await getItem<Item[]>('wishlist')) || [])
})() },[])


useEffect(()=>{ setItem('cart', cart) },[cart])
useEffect(()=>{ setItem('wishlist', wishlist) },[wishlist])


const api = useMemo<Ctx>(()=>({
cart,
wishlist,
addToCart:(p)=> setCart(prev=>{
const i = prev.findIndex(x=>x.id===p.id)
if(i>-1){ const cp=[...prev]; cp[i]={...cp[i], qty:cp[i].qty+1}; return cp }
return [...prev, {...p, qty:1}]
}),
addToWishlist:(p)=> setWishlist(prev=> prev.some(x=>x.id===p.id)? prev : [...prev, {...p, qty:1}]),
removeFromCart:(id)=> setCart(prev=> prev.filter(x=>x.id!==id)),
}),[cart, wishlist])


return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
}


export const useCart = ()=>{
const ctx = useContext(CartCtx)
if(!ctx) throw new Error('useCart must be used within CartProvider')
return ctx
}