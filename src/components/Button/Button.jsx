import './Button.css';
import {Link} from 'react-router-dom';

function Button({ children, className, onClick, href, ...props }) {
  return (
      <>
      {href ? (
          <Link
            to={href}
            className={`button ${className || ''}`}
          >
            {children}
          </Link>
        ) : (
            <button
                onClick={onClick}
                className={`button ${className || ''}`}
                {...props}
            >
              {children}
            </button>
        )}
      </>
  );
}

export default Button;
