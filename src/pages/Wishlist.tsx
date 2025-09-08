import { useContext } from "react"
import { WishlistContext } from "../context/WishlistContext"

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext)

  if (wishlist.length === 0) {
    return <div className="p-6 text-center text-gray-500">💖 Your wishlist is empty.</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b py-4">
          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
          <div className="flex-1">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-gray-500">${item.price}</p>
          </div>
          <button
            onClick={() => removeFromWishlist(item.id)}
            className="px-3 py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
