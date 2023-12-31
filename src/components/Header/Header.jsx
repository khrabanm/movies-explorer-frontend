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
import { BREAKPOINTS } from '../../utils/consts';

function Header({ isLoggedIn = true }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();

  const isMainPage = pathname === '/';

  const getModifier = (block) => `${block} ${isMainPage ? `${block}_theme_violet` : ''}`;

  const handleOpenMenu = () => {
    setOpen(true);
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  };

  const handleCloseMenu = () => {
    setOpen(false);
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  };

  return (
    <header className={getModifier('header')}>
      <div className="header__container container">
        <Logo />
        {isLoggedIn && width > BREAKPOINTS.MOBILE_MAX && (
          <Navigation className="header__nav" isWhite={isMainPage} />
        )}
        <nav className="header__buttons">
          {isLoggedIn && width > BREAKPOINTS.MOBILE_MAX && (
            <Button href="/profile" className="header__account">
              Аккаунт
            </Button>
          )}
          {isLoggedIn && width <= BREAKPOINTS.MOBILE_MAX && (
            <Button
              className={getModifier('header__menu')}
              onClick={open ? handleCloseMenu : handleOpenMenu}
            >
              {open ? (
                <img src={close} alt="Закрыть" />
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
              <Button href="/signin" className="header__signin">
                Войти
              </Button>
            </>
          )}
        </nav>
      </div>
      {isLoggedIn && width <= BREAKPOINTS.MOBILE_MAX && open && (
        <Menu onClick={handleCloseMenu}>
          <Navigation />
          <Button href="/profile" className="header__account">
            Аккаунт
          </Button>
        </Menu>
      )}
    </header>
  );
}

export default Header;
