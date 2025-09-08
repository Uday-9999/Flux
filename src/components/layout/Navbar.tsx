import { Link } from 'react-router-dom'

export default function Navbar(){
return (
<nav className="nav">
<div className="nav-inner">
<Link to="/" className="brand">Flux</Link>
<div className="spacer"/>
<button className="btn" onClick={()=>window.dispatchEvent(new CustomEvent('open-cmdk'))}>Search (⌘K)</button>
<Link to="/wishlist" className="btn">♡ Wishlist</Link>
<Link to="/cart" className="btn">🛒 Cart</Link>
</div>
</nav>
)
}