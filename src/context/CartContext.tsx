import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the Product type
export interface CartProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  condition: string;
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Omit<CartProduct, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  itemCount: 0,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Load cart from localStorage if available
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Calculate total number of items
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product: Omit<CartProduct, 'quantity'>, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If product already exists in cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Otherwise add new item
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update quantity of product in cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => useContext(CartContext);

export default CartProvider;