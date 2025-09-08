import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

type Product = {
  id: string
  name: string
  price: number
  description: string
  image: string
}

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // In a real app, fetch from API. For now, dummy data:
    const dummyProducts: Product[] = [
      { id: "1", name: "Flux Sneakers", price: 89.99, description: "Comfortable sneakers for everyday wear.", image: "/assets/sneakers.jpg" },
      { id: "2", name: "Wireless Headphones", price: 149.99, description: "Noise-cancelling headphones with 30hr battery.", image: "/assets/headphones.jpg" },
    ]

    const found = dummyProducts.find((p) => p.id === id)
    if (found) setProduct(found)
  }, [id])

  if (!product) {
    return <div className="p-6 text-center">Loading product...</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-xl shadow-md mb-6" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-500 mb-4">${product.price}</p>
      <p className="mb-6">{product.description}</p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
        Add to Cart 🛒
      </button>
    </div>
  )
}
