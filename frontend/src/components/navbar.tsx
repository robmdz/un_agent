import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/navbar.css';
import contrastIcon from '../assets/contrast_5811797.png';

function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <h1><Link to="/">UNparcero</Link></h1>
            
            <div className={`navbar-center ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/information" onClick={() => setIsMenuOpen(false)}>Information</Link></li>
                    <li><Link to="/team" onClick={() => setIsMenuOpen(false)}>Team</Link></li>
                </ul>
            </div>

            <div className="navbar-right">
                <button 
                    className={`theme-toggle ${theme}`} 
                    onClick={toggleTheme} 
                    aria-label="Toggle theme"
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    <span className="theme-toggle-thumb">
                        <img src={contrastIcon} alt="" className="theme-icon" />
                    </span>
                </button>
                <button 
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
