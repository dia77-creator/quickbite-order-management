import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);

    if (existing) {
      setCart(
        cart.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const decreaseQty = (id) => {
    const existing = cart.find(i => i.id === id);
    if (!existing) return;

    if (existing.quantity === 1) {
      setCart(cart.filter(i => i.id !== id));
    } else {
      setCart(
        cart.map(i =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
}