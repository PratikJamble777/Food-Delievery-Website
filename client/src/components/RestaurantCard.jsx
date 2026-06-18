import { Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RestaurantCard({ restaurant }) {
  const deliveryTime = restaurant.deliveryTime ?? restaurant.delivery_time;
  const distance = restaurant.distanceKm ?? restaurant.distance_km;

  return (
    <motion.article className="restaurant-card" whileHover={{ y: -6 }}>
      <div className="restaurant-image">
        <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
        <span>{restaurant.offer}</span>
      </div>
      <div className="restaurant-content">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisine}</p>
        <div className="meta-row">
          <span><Star size={16} fill="currentColor" /> {restaurant.rating}</span>
          <span><Clock size={16} /> {deliveryTime} min</span>
        </div>
        {distance !== undefined && <p className="distance-text">{Number(distance).toFixed(1)} km away</p>}
      </div>
    </motion.article>
  );
}
