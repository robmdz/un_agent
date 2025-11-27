import '../styles/button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, onClick, className = '', type = 'button' }: ButtonProps) => {
  return (
    <button 
      type={type}
      className={`custom-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

