import { useEffect, useState } from 'react';
import './MoviesCard.css';
import Button from '../Button/Button';
import deleteSaved from '../../images/delete-saved.svg';
import RadioButton from '../RadioButton/RadioButton';
import usePrevious from '../../hooks/usePrevious';

const getDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  return `${hours ? `${hours}ч` : ''} ${minutes}м`;
};

function MoviesCard({ movie, savedMovies, isSaved, onSave, onDelete }) {
  const [checked, setChecked] = useState(
    savedMovies.some((item) => item.movieId === movie.movieId),
  );
  const prevSavedMoviesLength = usePrevious(savedMovies.length);
  const handleSave = () => {
    setChecked(true);
    onSave({ ...movie, isSaved: undefined }).catch((error) => {
      console.error(error);
      setChecked(false);
    });
  };

  const handleDelete = () => {
    setChecked(false);
    const savedMovie = savedMovies.find((item) => item.movieId === movie.movieId);
    onDelete(savedMovie._id).catch((error) => {
      console.error(error);
      setChecked(true);
    });
  };

  const handleSaveClick = () => {
    if (checked) {
      handleDelete();
    } else {
      handleSave();
    }
  };

  useEffect(() => {
    if (prevSavedMoviesLength !== savedMovies.length) {
      setChecked(savedMovies.some((item) => item.movieId === movie.movieId));
    }
  }, [movie.movieId, prevSavedMoviesLength, savedMovies]);

  return (
    <article className="movies-card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer" className="movies-card__link">
        <img className="movies-card__image" src={movie.image} alt={movie.nameRU} />
      </a>
      <div className="movies-card__info">
        <div className="movies-card__title-container">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          {isSaved ? (
            <Button className="movies-card__delete" type="button" onClick={handleDelete}>
              <img src={deleteSaved} alt="Удалить" />
            </Button>
          ) : (
            <RadioButton name={movie.nameRU} checked={checked} onChange={handleSaveClick} />
          )}
        </div>
        <p className="movies-card__duration">{getDuration(movie.duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
