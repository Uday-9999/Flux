import { createContext, useContext, useEffect, useState } from 'react'


const ThemeCtx = createContext<{theme:'light'|'dark'; toggle:()=>void} | null>(null)


export function ThemeProvider({ children }:{children:React.ReactNode}){
const [theme, setTheme] = useState<'light'|'dark'>(()=> (localStorage.getItem('theme') as any) || 'light')
useEffect(()=>{
document.documentElement.setAttribute('data-theme', theme)
localStorage.setItem('theme', theme)
},[theme])
return <ThemeCtx.Provider value={{ theme, toggle:()=> setTheme(t=> t==='light'?'dark':'light') }}>{children}</ThemeCtx.Provider>
}


export const useTheme = ()=>{
const ctx = useContext(ThemeCtx)
if(!ctx) throw new Error('useTheme must be used within ThemeProvider')
return ctx
}