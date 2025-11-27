import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/navbar.css';

function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <h1><Link to="/">UNparcero</Link></h1>
            <div className="navbar-right">
                <ul>
                    <li><Link to="/information">Information</Link></li>
                    <li><Link to="/team">Team</Link></li>
                </ul>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
