import { useState } from 'react';
import './MoviesCard.css';
import Button from '../Button/Button';
import deleteSaved from '../../images/delete-saved.svg';
import RadioButton from '../RadioButton/RadioButton';

function MoviesCard({ movie, isSaved }) {
  const [checked, setChecked] = useState(false);

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={movie.image} alt={movie.name} />
      <div className="movies-card__info">
        <div className="movies-card__title-container">
          <h2 className="movies-card__title">{movie.name}</h2>
          {isSaved ? (
            <Button className="movies-card__delete" type="button">
              <img src={deleteSaved} alt="Удалить" />
            </Button>
          ) : (
            <RadioButton
              name={movie.name}
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
            />
          )}
        </div>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
