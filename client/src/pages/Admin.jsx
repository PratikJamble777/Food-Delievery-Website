import Page from '../components/Page.jsx';
import { foods, restaurants } from '../data/mockData.js';

export default function Admin() {
  const metrics = [
    ['Total Orders', '1,284'],
    ['Total Users', '8,420'],
    ['Revenue', '₹12.8L'],
    ['Active Orders', '46']
  ];

  return (
    <Page className="page-shell">
      <div className="page-title"><span className="eyebrow">Admin</span><h1>Operations dashboard</h1></div>
      <div className="metric-grid">{metrics.map(([label, value]) => <article className="metric" key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>
      <div className="admin-grid">
        <section className="panel"><h2>Food Management</h2>{foods.slice(0, 4).map((food) => <p key={food.id}><span>{food.name}</span><button>Edit</button><button>Delete</button></p>)}<button className="button full">Add Food</button></section>
        <section className="panel"><h2>Restaurant Management</h2>{restaurants.map((restaurant) => <p key={restaurant.id}><span>{restaurant.name}</span><button>Edit</button><button>Delete</button></p>)}<button className="button full">Add Restaurant</button></section>
        <section className="panel"><h2>Order Management</h2>{['Accepted', 'Preparing', 'Out for delivery', 'Delivered'].map((status) => <p key={status}><span>Order #{status.slice(0, 3).toUpperCase()}</span><select defaultValue={status}><option>{status}</option><option>Cancelled</option></select></p>)}</section>
        <section className="panel"><h2>User Management</h2>{['Aarav Mehta', 'Nisha Rao', 'Kunal Shah'].map((name) => <p key={name}><span>{name}</span><button>Manage</button></p>)}</section>
      </div>
    </Page>
  );
}
