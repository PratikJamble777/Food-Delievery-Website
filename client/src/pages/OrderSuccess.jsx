import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Page from '../components/Page.jsx';

export default function OrderSuccess() {
  const { state } = useLocation();
  const orderId = state?.orderId || `PFD${Date.now().toString().slice(-6)}`;

  return (
    <Page className="success-page">
      <motion.div className="success-mark" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
        <Check size={56} />
      </motion.div>
      <h1>Order placed successfully</h1>
      <p>Order ID: <strong>{orderId}</strong></p>
      <p>Estimated delivery: <strong>25-30 minutes</strong></p>
      <Link className="button" to="/menu">Continue Shopping</Link>
    </Page>
  );
}
