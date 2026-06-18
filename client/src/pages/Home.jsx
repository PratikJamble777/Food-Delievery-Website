import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, BadgeIndianRupee, Leaf, MapPinned, ArrowRight, Mail } from 'lucide-react';
import Page from '../components/Page.jsx';
import FoodCard from '../components/FoodCard.jsx';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { foods, restaurants, reviews } from '../data/mockData.js';

const features = [
  [Bike, 'Fast Delivery', 'Hot meals delivered in 20-30 minutes.'],
  [BadgeIndianRupee, 'Best Prices', 'Daily deals, coupons, and fair delivery fees.'],
  [Leaf, 'Fresh Food', 'Trusted restaurant partners and quality packaging.'],
  [MapPinned, 'Live Tracking', 'Track every order from kitchen to doorstep.']
];

export default function Home() {
  return (
    <Page>
      <section className="hero">
        <div className="hero-copy">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>Delicious Food Delivered Fast</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>Food Delivered To Your Doorstep</motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>Order from your favorite restaurants in minutes.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <Link className="button" to="/menu">Order Now <ArrowRight size={18} /></Link>
            <Link className="button secondary" to="/restaurants">Explore Menu</Link>
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12 }}>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80" alt="A premium spread of delivered food" />
          <div className="floating-badge top">25 min delivery</div>
          <div className="floating-badge bottom">4.9 customer love</div>
        </motion.div>
      </section>

      <section className="section feature-grid">
        {features.map(([Icon, title, text]) => (
          <motion.article className="feature" key={title} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 22 }} viewport={{ once: true }}>
            <Icon size={26} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Recommended</span>
            <h2>Popular dishes near you</h2>
          </div>
          <Link to="/menu">View all</Link>
        </div>
        <div className="food-grid">{foods.slice(0, 4).map((food) => <FoodCard key={food.id} food={food} />)}</div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Restaurants</span>
            <h2>Top rated kitchens</h2>
          </div>
          <Link to="/restaurants">Explore</Link>
        </div>
        <div className="restaurant-grid">{restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>
      </section>

      <section className="section reviews">
        <div className="section-heading"><h2>Customers keep coming back</h2></div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review" key={review.name}>
              <strong>{'★'.repeat(review.rating)}</strong>
              <p>{review.text}</p>
              <span>{review.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div>
          <Mail size={30} />
          <h2>Get exclusive coupons</h2>
          <p>Fresh offers, new restaurants, and seasonal menus in your inbox.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Email address" aria-label="Email address" required />
          <button className="button">Subscribe</button>
        </form>
      </section>
    </Page>
  );
}
