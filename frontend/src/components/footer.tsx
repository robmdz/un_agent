import '../styles/footer.css';

/**
 * Componente Footer.
 * Muestra el pie de página con derechos de autor y enlaces.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; {currentYear} UNparcero. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <a href="/team">Team</a>
          <a href="/register" className="special-link-footer">
            Nueva Versión
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

