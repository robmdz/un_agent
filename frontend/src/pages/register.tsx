import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import '../styles/form.css';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Gracias por registrarte! Te avisaremos cuando la nueva versión esté lista.");
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="form-container" style={{ marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Únete a la espera</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Sé el primero en probar las nuevas funciones de UNparcero.
        </p>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input 
              type="text" 
              id="name"
              name="name"
              className="text-input"
              placeholder="Tu nombre"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico institucional</label>
            <input 
              type="email" 
              id="email"
              name="email"
              className="text-input"
              placeholder="usuario@unal.edu.co"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rol en la universidad</label>
            <div className="radio-group" style={{ flexDirection: 'column', gap: '0.8rem' }}>
              <label className="radio-label">
                <input type="radio" name="role" value="student" required />
                <span>Estudiante</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="role" value="teacher" />
                <span>Docente</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="role" value="admin" />
                <span>Administrativo</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="role" value="visitor" />
                <span>Visitante</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="interests">¿Qué te gustaría ver en la próxima versión?</label>
            <textarea 
              id="interests"
              name="interests"
              rows={3}
              className="text-input"
              placeholder="Cuéntanos tus ideas..."
            />
          </div>

          <div className="form-actions" style={{ flexDirection: 'column', gap: '1rem' }}>
            <Button type="submit" variant="primary" style={{ width: '100%' }}>
              Registrarme
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/')}
              style={{ width: '100%' }}
            >
              Volver al inicio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

