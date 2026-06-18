import { Heart, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';

export default function FoodCard({ food }) {
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const liked = wishlist.includes(food.id);

  return (
    <motion.article className="food-card" whileHover={{ y: -6 }}>
      <Link to={`/menu/${food.id}`} className="food-image">
        <img src={food.image} alt={food.name} loading="lazy" />
      </Link>
      <div className="food-content">
        <div className="row-between">
          <h3>{food.name}</h3>
          <button className={`heart ${liked ? 'liked' : ''}`} onClick={() => toggleWishlist(food.id)} aria-label="Toggle wishlist">
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>
        <p>{food.description}</p>
        <div className="row-between">
          <span className="rating"><Star size={16} fill="currentColor" /> {food.rating}</span>
          <strong>₹{food.price}</strong>
        </div>
        <button className="button full" onClick={() => addToCart(food)}>
          <Plus size={18} /> Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
