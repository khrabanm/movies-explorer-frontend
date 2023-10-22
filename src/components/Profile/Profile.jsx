import { useState } from 'react';
import './Profile.css';
import Button from '../Button/Button';

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('При обновлении профиля произошла ошибка.');
  console.log(setError);

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__form-container">
          <input
            placeholder="Имя"
            minLength="2"
            maxLength="30"
            className="profile__input"
            type="text"
            id="name"
            value="Виталий"
            disabled={!isEdit}
          />
          <label className="profile__label" htmlFor="name">
            Имя
          </label>
        </div>
        <div className="profile__form-container">
          <input
            placeholder="E-mail"
            className="profile__input"
            type="email"
            id="email"
            value="pochta@yandex.ru"
            disabled={!isEdit}
          />
          <label className="profile__label" htmlFor="email">
            E-mail
          </label>
        </div>
      </form>
      <div className="profile__buttons">
        {isEdit ? (
          <>
            {error && <p className="profile__error">{error}</p>}
            <Button className="profile__save" onClick={() => setIsEdit(false)}>
              Сохранить
            </Button>
          </>
        ) : (
          <>
            <Button className="profile__edit" onClick={() => setIsEdit(true)}>
              Редактировать
            </Button>
            <Button className="profile__exit" href="/">
              Выйти из аккаунта
            </Button>
          </>
        )}
      </div>
    </main>
  );
}

export default Profile;
