import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/banner.css';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="announcement-banner">
      <div className="banner-content">
        <span className="banner-badge">New</span>
        <Link to="/register" className="banner-link">
          Regístrate para probar la siguiente versión
        </Link>
      </div>
      <button 
        className="banner-close" 
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
      >
        ×
      </button>
    </div>
  );
};

export default Banner;
