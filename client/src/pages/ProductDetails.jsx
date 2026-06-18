import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Minus, Plus, Star } from 'lucide-react';
import Page from '../components/Page.jsx';
import FoodCard from '../components/FoodCard.jsx';
import { foods, reviews } from '../data/mockData.js';
import { useApp } from '../context/AppContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const food = foods.find((item) => item.id === Number(id)) || foods[0];
  const { addToCart, recommendedFoods } = useApp();
  const [quantity, setQuantity] = useState(1);

  return (
    <Page className="page-shell">
      <section className="product-detail">
        <img src={food.image} alt={food.name} />
        <div>
          <Link to="/menu" className="text-button">Back to menu</Link>
          <h1>{food.name}</h1>
          <div className="rating large"><Star size={18} fill="currentColor" /> {food.rating}</div>
          <p>{food.description}</p>
          <h3>Ingredients</h3>
          <div className="chips">{food.ingredients.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="detail-buy">
            <strong>₹{food.price}</strong>
            <div className="qty big">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
            </div>
            <button className="button" onClick={() => addToCart(food, quantity)}>Add to Cart</button>
          </div>
        </div>
      </section>
      <section className="section">
        <h2>Reviews</h2>
        <div className="review-grid">{reviews.map((review) => <article className="review" key={review.name}><strong>{review.name}</strong><p>{review.text}</p></article>)}</div>
      </section>
      <section className="section">
        <h2>Recommended Foods</h2>
        <div className="food-grid">{recommendedFoods.slice(0, 3).map((item) => <FoodCard key={item.id} food={item} />)}</div>
      </section>
    </Page>
  );
}
