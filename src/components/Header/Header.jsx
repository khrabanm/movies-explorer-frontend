import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import close from '../../images/close.svg';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import Link from '../Link/Link';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Menu from '../Menu/Menu';

function Header({ isLoggedIn = true }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();

  const isMainPage = pathname === '/';

  const getModifier = (block) => `${block} ${isMainPage ? `${block}_theme_violet` : ''}`;

  return (
    <header className={getModifier('header')}>
      <div className="header__container container">
        <Logo />
        {isLoggedIn && width > 1152 && <Navigation className="header__nav" isWhite={isMainPage} />}
        <div className="header__buttons">
          {isLoggedIn && width > 1152 && <Button className="header__account">Аккаунт</Button>}
          {isLoggedIn && width <= 1152 && (
            <Button
              className={getModifier('header__menu')}
              onClick={() => setOpen((prevState) => !prevState)}
            >
              {open ? (
                <img src={close} alt="close" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none">
                  <g
                    fill={isMainPage ? 'var(--white)' : 'var(--black)'}
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M36 14H8v-3h28v3ZM36 24H8v-3h28v3ZM36 34H8v-3h28v3Z" />
                  </g>
                </svg>
              )}
            </Button>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/signup" className={getModifier('header__registration')}>
                Регистрация
              </Link>
              <Button className="header__signin">Войти</Button>
            </>
          )}
        </div>
      </div>
      {isLoggedIn && width <= 1152 && open && (
        <Menu onClick={() => setOpen(false)}>
          <Navigation />
          <Button className="header__account">Аккаунт</Button>
        </Menu>
      )}
    </header>
  );
}

export default Header;
