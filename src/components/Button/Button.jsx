import './Button.css';

function Button({ children, className, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`button ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
