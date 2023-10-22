import './Button.css';
import { Link } from 'react-router-dom';

function Button({ children, className, onClick, href, type = 'button', ...props }) {
  if (href) {
    return (
      <Link to={href} className={`button ${className || ''}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`button ${className || ''}`} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
