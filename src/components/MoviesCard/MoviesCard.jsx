import { useState } from 'react';
import './MoviesCard.css';
import Button from '../Button/Button';
import deleteSaved from '../../images/delete-saved.svg';
import RadioButton from '../RadioButton/RadioButton';
import { MOVIES_IMAGE_URL } from '../../utils/consts';

const getDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  return `${hours ? `${hours}ч` : ''} ${minutes}м`;
};

function MoviesCard({ movie, isSaved }) {
  const [checked, setChecked] = useState(false);

  return (
    <article className="movies-card">
      <img
        className="movies-card__image"
        src={`${MOVIES_IMAGE_URL}${movie.image.url}`}
        alt={movie.nameRU}
      />
      <div className="movies-card__info">
        <div className="movies-card__title-container">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          {isSaved ? (
            <Button className="movies-card__delete" type="button">
              <img src={deleteSaved} alt="Удалить" />
            </Button>
          ) : (
            <RadioButton
              name={movie.nameRU}
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
            />
          )}
        </div>
        <p className="movies-card__duration">{getDuration(movie.duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
