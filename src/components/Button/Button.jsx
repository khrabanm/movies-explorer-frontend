import './Button.css';
import { Link } from 'react-router-dom';

function Button({ children, className, onClick, href, ...props }) {
  if (href) {
    return (
      <Link to={href} className={`button ${className || ''}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`button ${className || ''}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
