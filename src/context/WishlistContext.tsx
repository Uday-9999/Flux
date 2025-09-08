import { createContext, useState, ReactNode } from "react"
import { Product } from "../api/Products"

type WishlistContextType = {
  wishlist: Product[]
  addToWishlist: (p: Product) => void
  removeFromWishlist: (id: string) => void
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {}
})

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([])

  function addToWishlist(p: Product) {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === p.id)) {
        return prev // avoid duplicates
      }
      return [...prev, p]
    })
  }

  function removeFromWishlist(id: string) {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}
