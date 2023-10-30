import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Button from '../Button/Button';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import {
  PROFILE_ERRORS_MESSAGES,
  PROFILE_SUCCESS_MESSAGE,
  SERVER_ERRORS_CODE,
} from '../../utils/consts';

function Profile({ onLogOut, onUpdate }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, errors, handleChange, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    if (isEdit) {
      setValues(currentUser);
    }
  }, [currentUser, isEdit, setValues]);

  const handleSetEdit = () => {
    setIsEdit(true);
    setIsSuccess(false);
    setError('');
  };

  const handleLogout = () => {
    if (isLoading) return;
    setIsLoading(true);
    onLogOut()
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    onUpdate({ ...currentUser, ...values })
      .then(() => {
        resetForm();
        setIsEdit(false);
        setIsSuccess(true);
        setError('');
      })
      .catch((err) => {
        setError(PROFILE_ERRORS_MESSAGES[SERVER_ERRORS_CODE[err.message]] || err.message);
        setValues(currentUser);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <form id="profile" className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__form-container">
              <input
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                className={`profile__input ${errors.name && 'profile__input_error'}`}
                type="text"
                id="name"
                name="name"
                value={isEdit ? values.name : currentUser.name}
                onChange={handleChange}
                disabled={!isEdit}
              />
              <label
                className={`profile__label ${errors.name && 'profile__label_error'}`}
                htmlFor="name"
              >
                Имя
              </label>
            </div>
            <div className="profile__form-container">
              <input
                placeholder="E-mail"
                className={`profile__input ${errors.email && 'profile__input_error'}`}
                type="email"
                name="email"
                id="email"
                value={isEdit ? values.email : currentUser.email}
                onChange={handleChange}
                disabled={!isEdit}
              />
              <label
                className={`profile__label ${errors.email && 'profile__label_error'}`}
                htmlFor="email"
              >
                E-mail
              </label>
            </div>
          </form>
          <div className="profile__buttons">
            {isEdit ? (
              <>
                {error && <p className="profile__error">{error}</p>}
                <Button
                  type="submit"
                  form="profile"
                  disabled={!isValid}
                  className={`profile__save ${!isValid && 'profile__save_disabled'}`}
                >
                  Сохранить
                </Button>
              </>
            ) : (
              <>
                {isSuccess && <p className="profile__success">{PROFILE_SUCCESS_MESSAGE}</p>}
                <Button className="profile__edit" onClick={handleSetEdit}>
                  Редактировать
                </Button>
                <Button className="profile__exit" onClick={handleLogout}>
                  Выйти из аккаунта
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default Profile;
