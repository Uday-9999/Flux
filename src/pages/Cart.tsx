import React from 'react';
import { useCart } from '../context/CartContext';

type CartItem = {
  id: string | number;
  name: string;
  price: number;
};

export default function Cart() {
  const { cart, removeFromCart } = useCart() as {
    cart: CartItem[];
    removeFromCart: (id: string | number) => void;
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> – ₹{item.price}
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
