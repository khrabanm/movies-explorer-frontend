import './Button.css';

function Button({ children, className, onClick, href, ...props }) {
  return (
      <>
      {href ? (
          <a
            href={href}
            className={`button ${className || ''}`}
            {...props}
          >
            {children}
          </a>
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
