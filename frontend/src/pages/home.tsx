import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import FAQ from '../components/faq';
import '../styles/home.css';
import '../styles/home-actions.css'; // Import new styles

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div style={{ 
        marginBottom: '4rem', 
        display: 'flex', 
        flexDirection: 'column', // Changed to column for stacking
        gap: '1.5rem', // Increased gap
        alignItems: 'center',
        width: '100%'
      }}>
        <Button 
          onClick={() => navigate('/voice-agent')} 
          variant="primary" 
          icon={false}
          className="main-action-button" // New class for sizing
        >
          Hablar con UNparcero
        </Button>
        <Button onClick={() => navigate('/form')} variant="secondary" icon={true}>
          Danos tu opinión
        </Button>
      </div>
      
      <FAQ />
    </div>
  );
};

export default Home;

