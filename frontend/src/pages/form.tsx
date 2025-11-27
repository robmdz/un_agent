import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import '../styles/form.css';

const Form = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por tu opinión!");
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="form-container">
      <h1>Danos tu opinión</h1>
        <form onSubmit={handleSubmit} className="feedback-form">
          
          {/* Pregunta 1 */}
          <div className="form-group">
            <label>¿Utilizarían este chatbot para ubicarse en la universidad?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="use_chatbot" value="yes" required />
                <span>Sí</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="use_chatbot" value="no" />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Pregunta 2 */}
          <div className="form-group">
            <label>¿Qué tal les pareció la facilidad de utilización del chatbot?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="ease_of_use" value="easy" required />
                <span>Fácil</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="ease_of_use" value="hard" />
                <span>Difícil</span>
              </label>
            </div>
          </div>

          {/* Pregunta 3 */}
          <div className="form-group">
            <label>¿Sentiste que el chatbot entendió correctamente lo que necesitabas?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="understanding" value="yes" required />
                <span>Sí</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="understanding" value="no" />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Pregunta 4 */}
          <div className="form-group">
            <label>¿El chatbot te guió de manera adecuada al lugar de destino?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="guidance" value="yes" required />
                <span>Sí</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="guidance" value="no" />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Pregunta 5 */}
          <div className="form-group">
            <label>¿La información entregada por el chatbot fue clara y útil para ti?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="clarity" value="yes" required />
                <span>Sí</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="clarity" value="no" />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Pregunta 6 */}
          <div className="form-group">
            <label>En una escala de 1 a 5, ¿qué tan satisfecho está con la herramienta?</label>
            <div className="rating-group">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="rating-label">
                  <input type="radio" name="satisfaction" value={num} required />
                  <span className="rating-circle">{num}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pregunta 7 */}
          <div className="form-group">
            <label>¿Qué le cambiarías para que la experiencia fuera más rápida o más fácil?</label>
            <textarea 
              name="improvements"
              rows={3}
              className="text-input"
            />
          </div>

          {/* Pregunta 8 */}
          <div className="form-group">
            <label>¿Qué otra información relacionada te gustaría que el chatbot te proporcionara?</label>
        <textarea 
              name="other_info"
              rows={3}
              className="text-input"
            />
          </div>

          <div className="form-actions">
          <Button type="submit">Enviar</Button>
          <Button onClick={() => navigate('/voice-agent')} className="secondary">Volver</Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Form;
