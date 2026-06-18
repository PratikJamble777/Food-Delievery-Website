import { MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import Page from '../components/Page.jsx';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { restaurants } from '../data/mockData.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getDistanceKm = (from, restaurant) => {
  if (!from || !restaurant.latitude || !restaurant.longitude) return undefined;
  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRadians(restaurant.latitude - from.latitude);
  const dLng = toRadians(restaurant.longitude - from.longitude);
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(restaurant.latitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Number((earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2));
};

const normalizeRestaurant = (restaurant) => ({
  ...restaurant,
  deliveryTime: restaurant.deliveryTime ?? restaurant.delivery_time,
  distanceKm: restaurant.distanceKm ?? restaurant.distance_km
});

export default function Restaurants() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [sort, setSort] = useState('rating');
  const [location, setLocation] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const cuisines = ['All', ...new Set(restaurants.map((item) => item.cuisine))];

  const findNearby = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Location is not supported on this browser.');
      return;
    }

    setLocationStatus('Finding restaurants near you...');
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const currentLocation = { latitude: coords.latitude, longitude: coords.longitude };
        setLocation(currentLocation);

        try {
          const response = await fetch(`${API_URL}/restaurants?lat=${coords.latitude}&lng=${coords.longitude}&radius=25`);
          if (!response.ok) throw new Error('Nearby API unavailable');
          const data = await response.json();
          setNearbyRestaurants(data.map(normalizeRestaurant));
          setLocationStatus(`Showing restaurants within 25 km of your location.`);
        } catch {
          const localNearby = restaurants
            .map((restaurant) => ({ ...restaurant, distanceKm: getDistanceKm(currentLocation, restaurant) }))
            .filter((restaurant) => restaurant.distanceKm <= 25)
            .sort((a, b) => a.distanceKm - b.distanceKm);
          setNearbyRestaurants(localNearby);
          setLocationStatus('Showing nearby restaurants using local sample data.');
        }
      },
      () => setLocationStatus('Location permission was denied. You can still browse all restaurants.'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  const filtered = useMemo(() => {
    const source = nearbyRestaurants || restaurants;
    return source
      .map(normalizeRestaurant)
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .filter((item) => cuisine === 'All' || item.cuisine === cuisine)
      .sort((a, b) => {
        if (location && a.distanceKm !== undefined && b.distanceKm !== undefined) return a.distanceKm - b.distanceKm;
        return sort === 'time' ? a.deliveryTime - b.deliveryTime : b.rating - a.rating;
      });
  }, [query, cuisine, sort, location, nearbyRestaurants]);

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
      <div className="nearby-bar">
        <button className="button secondary" onClick={findNearby}><MapPin size={18} /> Use My Location</button>
        {nearbyRestaurants && <button className="text-button" onClick={() => { setNearbyRestaurants(null); setLocation(null); setLocationStatus('Showing all restaurants.'); }}>Show all restaurants</button>}
        {locationStatus && <span>{locationStatus}</span>}
      </div>
      <div className="restaurant-grid">{filtered.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>
    </Page>
  );
}
