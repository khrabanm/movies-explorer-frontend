import './Link.css';
import { Link as RouterLink } from 'react-router-dom';

function Link({ children, to, className }) {
  return (
    <RouterLink className={`link ${className || ''}`} to={to}>
      {children}
    </RouterLink>
  );
}

export default Link;
