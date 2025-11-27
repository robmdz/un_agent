import '../styles/button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  icon?: boolean;
}

const Button = ({ children, onClick, className = '', type = 'button', variant = 'primary', icon = false }: ButtonProps) => {
  return (
    <button 
      type={type}
      className={`custom-button ${variant} ${className}`}
      onClick={onClick}
    >
      {children}
      {icon && <span className="button-icon">→</span>}
    </button>
  );
};

export default Button;

