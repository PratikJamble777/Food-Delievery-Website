import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Page from '../components/Page.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totals } = useApp();

  return (
    <Page className="page-shell">
      <div className="page-title"><h1>Your Cart</h1></div>
      <div className="cart-layout">
        <div className="cart-list">
          {cart.length === 0 && <div className="empty-state">No items yet. Your next great meal starts on the menu.</div>}
          {cart.map((item) => (
            <article className="cart-line" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div><h3>{item.name}</h3><p>₹{item.price}</p></div>
              <div className="qty">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
              </div>
              <button className="icon-button" onClick={() => removeFromCart(item.id)} aria-label="Remove item"><Trash2 size={18} /></button>
            </article>
          ))}
        </div>
        <div className="summary">
          <h2>Price breakdown</h2>
          <p><span>Subtotal</span><strong>₹{totals.subtotal}</strong></p>
          <p><span>Delivery fee</span><strong>₹{totals.deliveryFee}</strong></p>
          <p><span>Tax</span><strong>₹{totals.tax}</strong></p>
          <p><span>Coupon</span><strong>-₹{totals.discount}</strong></p>
          <p className="grand"><span>Grand total</span><strong>₹{totals.grandTotal}</strong></p>
          <Link className="button full" to="/checkout">Checkout</Link>
          <Link className="button secondary full" to="/menu">Continue Shopping</Link>
        </div>
      </div>
    </Page>
  );
}
