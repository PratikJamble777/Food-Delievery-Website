import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateQuantity, removeFromCart, totals } = useApp();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
          <motion.aside className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 24 }}>
            <div className="row-between">
              <h2>Your Cart</h2>
              <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-state">Your cart is waiting for something delicious.</div>
            ) : (
              <>
                <div className="drawer-items">
                  {cart.map((item) => (
                    <div className="drawer-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>₹{item.price}</p>
                        <div className="qty">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                      <button className="text-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  ))}
                </div>
                <div className="total-box">
                  <span>Total</span>
                  <strong>₹{totals.grandTotal}</strong>
                </div>
                <Link className="button full" to="/checkout" onClick={() => setCartOpen(false)}>Checkout</Link>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
