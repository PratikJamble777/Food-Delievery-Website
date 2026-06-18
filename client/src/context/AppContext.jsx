import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { foods } from '../data/mockData';

const AppContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('pfd_cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('pfd_wishlist', []));
  const [user, setUser] = useState(() => readStorage('pfd_user', null));
  const [darkMode, setDarkMode] = useState(() => readStorage('pfd_dark', false));
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => localStorage.setItem('pfd_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('pfd_wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem('pfd_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('pfd_dark', JSON.stringify(darkMode)), [darkMode]);
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addToCart = (food, quantity = 1) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === food.id);
      if (existing) {
        return items.map((item) => item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...items, { ...food, quantity }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart((items) => items.filter((item) => item.id !== id));
      return;
    }
    setCart((items) => items.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const toggleWishlist = (id) => {
    setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 39;
    const discount = subtotal > 799 ? 120 : 0;
    const tax = Math.round(subtotal * 0.05);
    return { subtotal, deliveryFee, discount, tax, grandTotal: subtotal + deliveryFee + tax - discount };
  }, [cart]);

  const recommendedFoods = useMemo(() => foods.filter((food) => food.rating >= 4.7), []);

  const value = {
    cart,
    wishlist,
    user,
    darkMode,
    cartOpen,
    totals,
    recommendedFoods,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    setUser,
    setDarkMode,
    setCartOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
