import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ShoppingBag, Moon, Sun, User, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const navItems = [
  ['/', 'Home'],
  ['/restaurants', 'Restaurants'],
  ['/menu', 'Menu'],
  ['/dashboard', 'Dashboard'],
  ['/admin', 'Admin']
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart, darkMode, setDarkMode, setCartOpen, user } = useApp();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Pratik Food Delivery home">
        <span className="brand-mark">P</span>
        <span>Pratik Food Delivery</span>
      </Link>
      <nav className={`nav ${open ? 'open' : ''}`}>
        {navItems.map(([to, label]) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link className="icon-button" to={user ? '/dashboard' : '/auth'} aria-label="Account">
          <User size={20} />
        </Link>
        <button className="icon-button cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart">
          <ShoppingBag size={20} />
          {itemCount > 0 && <span>{itemCount}</span>}
        </button>
        <button className="icon-button mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
