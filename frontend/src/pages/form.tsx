import { useNavigate } from 'react-router-dom';
import Button from '../components/button';

const Form = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por tu opinión!");
    navigate('/');
  };

  return (
    <div className="page-container">
      <h1>Danos tu opinión</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
        <textarea 
          placeholder="Cuéntanos qué te pareció la experiencia..."
          rows={5}
          style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', fontFamily: 'inherit' }}
          required
        />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button type="submit">Enviar</Button>
          <Button onClick={() => navigate('/voice-agent')} className="secondary">Volver</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;

