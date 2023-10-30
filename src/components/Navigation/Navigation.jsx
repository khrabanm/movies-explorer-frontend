import { NavLink } from 'react-router-dom';
import './Navigation.css';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { BREAKPOINTS } from '../../utils/consts';

function Navigation({ isWhite = false, className }) {
  const { width } = useWindowDimensions();
  const getClass = ({ isActive }) =>
    `navigation__link ${isActive ? 'navigation__link_active' : ''} ${
      isWhite ? 'navigation__link_white' : ''
    }`;

  return (
    <nav className={`navigation ${className || ''}`}>
      {width <= BREAKPOINTS.MOBILE_MAX && (
        <NavLink to="/" className={getClass}>
          Главная
        </NavLink>
      )}
      <NavLink to="/movies" className={getClass}>
        Фильмы
      </NavLink>
      <NavLink to="/saved-movies" className={getClass}>
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;
