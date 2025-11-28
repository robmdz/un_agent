import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/button';
import Modal from '../components/modal';
import { supabase } from '../lib/supabaseClient';
import '../styles/form.css';

/**
 * Página de registro para nuevos usuarios.
 * Permite a los usuarios inscribirse para probar nuevas versiones.
 */
const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    const registrationData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      interests: formData.get('interests') as string || null,
    };

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (error) throw error;

      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error al guardar registro:', error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/');
        }}
        title="¡Registro Exitoso!"
      >
        <p>¡Gracias por registrarte! Te avisaremos cuando la nueva versión esté lista.</p>
      </Modal>

      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error en el Registro"
      >
        <p>Hubo un error al procesar tu registro. Por favor, intenta de nuevo.</p>
      </Modal>

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
            <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrarme'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
              style={{ width: '100%' }}
              disabled={isSubmitting}
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

