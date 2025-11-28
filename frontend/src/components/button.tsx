import '../styles/button.css';

/**
 * Propiedades para el componente Button.
 */
interface ButtonProps {
  children: React.ReactNode; // Contenido del botón
  onClick?: () => void; // Manejador de evento click
  className?: string; // Clases CSS adicionales
  type?: 'button' | 'submit' | 'reset'; // Tipo de botón HTML
  variant?: 'primary' | 'secondary'; // Variante de estilo
  icon?: boolean; // Si debe mostrar un icono
  style?: React.CSSProperties; // Estilos en línea opcionales
  disabled?: boolean; // Si el botón está deshabilitado
}

/**
 * Componente de botón reutilizable.
 * Soporta diferentes variantes y tipos.
 */
const Button = ({ children, onClick, className = '', type = 'button', variant = 'primary', icon = false, style, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`custom-button ${variant} ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
      {icon && <span className="button-icon">→</span>}
    </button>
  );
};

export default Button;

