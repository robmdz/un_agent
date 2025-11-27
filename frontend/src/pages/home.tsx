import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import FAQ from '../components/faq';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div style={{ marginBottom: '4rem' }}>
        <Button onClick={() => navigate('/voice-agent')}>Hablar con UNparcero</Button>
        <div style={{ height: '1rem' }}></div>
        <Button onClick={() => navigate('/form')}>Danos tu opinión</Button>
      </div>
      
      <FAQ />
    </div>
  );
};

export default Home;

