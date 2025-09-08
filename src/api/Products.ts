export type Product = { id:string; name:string; price:number; image:string; description:string }


export const products: Product[] = [
{ id:'p1', name:'Orbit Headphones', price:79.99, image:'https://picsum.photos/seed/phones/800/600', description:'Lightweight wireless over-ear.' },
{ id:'p2', name:'Nebula Sneakers', price:99.00, image:'https://picsum.photos/seed/shoes/800/600', description:'Breathable knit, everyday comfort.' },
{ id:'p3', name:'Lumen Watch', price:149.00, image:'https://picsum.photos/seed/watch/800/600', description:'Minimal analog with sapphire glass.' },
{ id:'p4', name:'Aura Lamp', price:45.00, image:'https://picsum.photos/seed/lamp/800/600', description:'Warm dimmable desk light.' }
]


export const getById = (id:string)=> products.find(p=>p.id===id)