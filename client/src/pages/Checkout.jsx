import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Checkout() {
  const { cart, totals, clearCart } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', mobile: '', address: '', payment: 'Cash on Delivery' });
  const orderId = useMemo(() => `PFD${Date.now().toString().slice(-6)}`, []);

  const submit = (event) => {
    event.preventDefault();
    if (!cart.length) return;
    clearCart();
    navigate('/success', { state: { orderId } });
  };

  return (
    <Page className="page-shell">
      <div className="page-title"><h1>Checkout</h1></div>
      <div className="checkout-layout">
        <form className="form-card" onSubmit={submit}>
          <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label>Mobile Number<input required pattern="[0-9]{10}" value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} /></label>
          <label>Address<textarea required rows="4" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></label>
          <label>Payment Method
            <select value={form.payment} onChange={(event) => setForm({ ...form, payment: event.target.value })}>
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
            </select>
          </label>
          <button className="button full" disabled={!cart.length}>Place Order</button>
        </form>
        <aside className="summary">
          <h2>Order summary</h2>
          {cart.map((item) => <p key={item.id}><span>{item.name} x {item.quantity}</span><strong>₹{item.price * item.quantity}</strong></p>)}
          <p className="grand"><span>Total</span><strong>₹{totals.grandTotal}</strong></p>
        </aside>
      </div>
    </Page>
  );
}
