import Page from '../components/Page.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Dashboard() {
  const { user, wishlist } = useApp();
  const orders = [
    { id: 'PFD430921', status: 'Delivered', total: 527 },
    { id: 'PFD430118', status: 'On the way', total: 328 }
  ];

  return (
    <Page className="page-shell">
      <div className="page-title"><span className="eyebrow">Account</span><h1>{user?.name || 'Welcome back'}</h1></div>
      <div className="dashboard-grid">
        <section className="panel"><h2>Profile</h2><p>{user?.email || 'customer@pratikfood.com'}</p><p>{user?.mobile || 'Add mobile number'}</p></section>
        <section className="panel"><h2>Order History</h2>{orders.map((order) => <p key={order.id}><span>{order.id}</span><strong>{order.status}</strong></p>)}</section>
        <section className="panel"><h2>Saved Addresses</h2><p>Home: 221 Food Street, Mumbai</p><p>Work: Tech Park, Pune</p></section>
        <section className="panel"><h2>Account Settings</h2><p>Wishlist items: {wishlist.length}</p><p>Notifications: Enabled</p></section>
      </div>
    </Page>
  );
}
