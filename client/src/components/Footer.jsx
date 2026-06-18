import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>Pratik Food Delivery</h3>
        <p>Delicious Food Delivered Fast</p>
      </div>
      <div className="footer-links">
        <Link to="/contact">About Us</Link>
        <Link to="/contact">Contact</Link>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms and Conditions</a>
      </div>
      <div className="socials">
        <a href="https://instagram.com" aria-label="Instagram">Instagram</a>
        <a href="https://facebook.com" aria-label="Facebook">Facebook</a>
        <a href="https://www.linkedin.com/in/pratik-jamble-044047252" aria-label="LinkedIn">LinkedIn</a>
        <a href="https://x.com" aria-label="X">X</a>
      </div>
    </footer>
  );
}
