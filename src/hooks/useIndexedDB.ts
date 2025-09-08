import { openDB, IDBPDatabase } from 'idb'


let db: IDBPDatabase | null = null
export async function getDB(){
if(db) return db
db = await openDB('flux-db', 1, { upgrade(db){ db.createObjectStore('kv') } })
return db
}
export async function setItem<T=any>(key:string, value:T){
const d = await getDB(); await d.put('kv', value, key)
}
export async function getItem<T=any>(key:string){
const d = await getDB(); return d.get('kv', key) as Promise<T | undefined>
}