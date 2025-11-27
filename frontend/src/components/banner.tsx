import { useState } from 'react';
import '../styles/banner.css';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="announcement-banner">
      <div className="banner-content">
        <span className="banner-badge">New</span>
        <a href="#" className="banner-link">
          Regístrate para probar la siguiente versión <span className="banner-arrow">→</span>
        </a>
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

