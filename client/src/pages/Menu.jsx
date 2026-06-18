import { useMemo, useState } from 'react';
import Page from '../components/Page.jsx';
import FoodCard from '../components/FoodCard.jsx';
import { categories, foods } from '../data/mockData.js';

export default function Menu() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    return foods.filter((food) => {
      const matchesCategory = category === 'All' || food.category === category;
      const matchesQuery = `${food.name} ${food.description}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <Page className="page-shell">
      <div className="page-title">
        <span className="eyebrow">Menu</span>
        <h1>Crave-worthy meals, ready fast</h1>
      </div>
      <div className="filters">
        <input list="suggestions" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes, ingredients, cuisines" />
        <datalist id="suggestions">
          {foods.map((food) => <option key={food.id} value={food.name} />)}
        </datalist>
      </div>
      <div className="category-tabs">
        {['All', ...categories].map((item) => (
          <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>
        ))}
      </div>
      <div className="skeleton-row" aria-hidden="true"><span /><span /><span /></div>
      <div className="food-grid">{results.map((food) => <FoodCard key={food.id} food={food} />)}</div>
    </Page>
  );
}
