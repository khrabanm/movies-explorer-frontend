import { useState } from 'react';
import './Authentication.css';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Link from '../Link/Link';

function Authentication({ isSignIn = true }) {
  const [error, setError] = useState('Что-то пошло не так...');
  console.log(setError);
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="authentication">
      <header className="authentication__header">
        <Logo />
        <h1 className="authentication__title">{isSignIn ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
      </header>
      <form onSubmit={onSubmit} className="authentication__form" id="authentication">
        <div className="authentication__form-wrapper">
          {!isSignIn && (
            <div className="authentication__item">
              <label className="authentication__label" htmlFor="name">
                Имя
              </label>
              <input
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                className="authentication__input"
                name="name"
                id="name"
                type="text"
                required
              />
            </div>
          )}
          <div className="authentication__item">
            <label className="authentication__label" htmlFor="email">
              E-mail
            </label>
            <input
              placeholder="E-mail"
              className="authentication__input"
              name="email"
              id="email"
              type="email"
              required
            />
          </div>
          <div className="authentication__item">
            <label className="authentication__label" htmlFor="password">
              Пароль
            </label>
            <input
              placeholder="Пароль"
              minLength="8"
              maxLength="30"
              className={`authentication__input ${error && 'authentication__input_error'}`}
              name="password"
              id="password"
              type="password"
              required
            />
            {error && <span className="authentication__error">{error}</span>}
          </div>
        </div>
        <footer className="authentication__footer">
          <Button type="submit" form="authentication" className="authentication__button">
            {isSignIn ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <p className="authentication__text">
            {isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
            <Link to={isSignIn ? '/signup' : '/signin'} className="authentication__link">
              {isSignIn ? 'Регистрация' : 'Войти'}
            </Link>
          </p>
        </footer>
      </form>
    </main>
  );
}

export default Authentication;
