import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Button onClick={() => navigate('/voice-agent')}>Hablar con UNparcero</Button>
    </div>
  );
};

export default Home;

