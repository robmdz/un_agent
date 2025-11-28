import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/navbar.css';
import contrastIcon from '../assets/contrast_5811797.png';

/**
 * Componente Navbar.
 * Muestra la barra de navegación principal con enlaces y control de tema.
 */
function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-brand">
                        <h1><Link to="/">UNparcero</Link></h1>
                    </div>

                    <div className="navbar-links">
                        <Link to="/team">Equipo</Link>
                        <Link to="/register" className="special-link">
                            Nueva Versión
                        </Link>
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
                </div>
            </nav>
        </>
    )
}

export default Navbar
