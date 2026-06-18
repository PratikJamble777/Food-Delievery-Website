import { useMemo, useState } from 'react';
import Page from '../components/Page.jsx';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { restaurants } from '../data/mockData.js';

export default function Restaurants() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [sort, setSort] = useState('rating');
  const cuisines = ['All', ...new Set(restaurants.map((item) => item.cuisine))];

  const filtered = useMemo(() => {
    return restaurants
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .filter((item) => cuisine === 'All' || item.cuisine === cuisine)
      .sort((a, b) => sort === 'time' ? a.deliveryTime - b.deliveryTime : b.rating - a.rating);
  }, [query, cuisine, sort]);

  return (
    <Page className="page-shell">
      <div className="page-title">
        <span className="eyebrow">Restaurants</span>
        <h1>Find your next favorite kitchen</h1>
      </div>
      <div className="filters">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search restaurants" />
        <select value={cuisine} onChange={(event) => setCuisine(event.target.value)}>
          {cuisines.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="rating">Sort by rating</option>
          <option value="time">Sort by delivery time</option>
        </select>
      </div>
      <div className="restaurant-grid">{filtered.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>
    </Page>
  );
}
