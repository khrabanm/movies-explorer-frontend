import { useEffect, useState } from 'react';
import './Authentication.css';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Link from '../Link/Link';
import {
  EMAIL_MAX,
  EMAIL_MIN,
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
  SERVER_ERRORS_CODE,
  SIGNUP_ERROR_MESSAGES,
  SIGNIN_ERROR_MESSAGES,
} from '../../utils/consts';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Preloader from '../Preloader/Preloader';

function Authentication({ isSignIn = true, onSubmit }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(isSignIn);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    if (isLoading) return;
    setIsLoading(true);
    e.preventDefault();
    onSubmit(values)
      .catch((err) => {
        const errorText = isSignIn
          ? SIGNIN_ERROR_MESSAGES[SERVER_ERRORS_CODE[err.message]]
          : SIGNUP_ERROR_MESSAGES[SERVER_ERRORS_CODE[err.message]];
        setError(errorText || err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    resetForm();
    setError('');
  }, [isSignIn, resetForm]);

  return (
    <main className="authentication">
      <header className="authentication__header">
        <Logo />
        <h1 className="authentication__title">{isSignIn ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
      </header>
      {isLoading ? (
        <Preloader />
      ) : (
        <form onSubmit={handleSubmit} className="authentication__form" id="authentication">
          <div className="authentication__form-wrapper">
            {!isSignIn && (
              <div className="authentication__item">
                <label className="authentication__label" htmlFor="name">
                  Имя
                </label>
                <input
                  placeholder="Имя"
                  minLength={NAME_MIN}
                  maxLength={NAME_MAX}
                  className={`authentication__input ${
                    errors.name && 'authentication__input_error'
                  }`}
                  name="name"
                  id="name"
                  type="text"
                  required
                  value={values.name || ''}
                  onChange={handleChange}
                />
                {errors.name && <span className="authentication__error">{errors.name}</span>}
              </div>
            )}
            <div className="authentication__item">
              <label className="authentication__label" htmlFor="email">
                E-mail
              </label>
              <input
                placeholder="E-mail"
                className={`authentication__input ${errors.email && 'authentication__input_error'}`}
                minLength={EMAIL_MIN}
                maxLength={EMAIL_MAX}
                name="email"
                id="email"
                type="email"
                required
                value={values.email || ''}
                onChange={handleChange}
              />
              {errors.email && <span className="authentication__error">{errors.email}</span>}
            </div>
            <div className="authentication__item">
              <label className="authentication__label" htmlFor="password">
                Пароль
              </label>
              <input
                placeholder="Пароль"
                minLength={isSignIn ? NAME_MIN : PASSWORD_MIN}
                maxLength={isSignIn ? EMAIL_MAX : PASSWORD_MAX}
                className={`authentication__input ${
                  errors.password && 'authentication__input_error'
                }`}
                name="password"
                id="password"
                type="password"
                required
                value={values.password || ''}
                onChange={handleChange}
              />
              {errors.password && <span className="authentication__error">{errors.password}</span>}
            </div>
          </div>
          <footer className="authentication__footer">
            {error && <span className="authentication__error">{error}</span>}
            <Button
              type="submit"
              form="authentication"
              className={`authentication__button ${
                !isValid ? 'authentication__button_disabled' : ''
              }`}
              disabled={!isValid || isLoading}
            >
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
      )}
    </main>
  );
}

export default Authentication;
