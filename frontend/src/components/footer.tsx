import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; {currentYear} UNparcero. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <a href="/information">Information</a>
          <a href="/team">Team</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

