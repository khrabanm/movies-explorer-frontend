import { useState } from 'react';
import './Profile.css';
import Button from '../Button/Button';

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('При обновлении профиля произошла ошибка.');
  console.log(setError);

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__form-container">
          <label className="profile__label" htmlFor="name">
            Имя
          </label>
          <input
            className="profile__input"
            type="text"
            id="name"
            value="Виталий"
            disabled={!isEdit}
          />
        </div>
        <div className="profile__form-container">
          <label className="profile__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="profile__input"
            type="email"
            id="email"
            value="pochta@yandex.ru"
            disabled={!isEdit}
          />
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
    </section>
  );
}

export default Profile;
