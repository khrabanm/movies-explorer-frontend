import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { MOVIES_COUNT } from '../../utils/consts';

const getVisibleMovies = (width) => {
  if (width <= 767) return MOVIES_COUNT.MOBILE;
  if (width <= 1152) return MOVIES_COUNT.TABLET;
  return MOVIES_COUNT.DESKTOP;
};

const getAddVisibleMovies = (width) => {
  if (width <= 767) return MOVIES_COUNT.MOBILE_ADD;
  if (width <= 1152) return MOVIES_COUNT.TABLET_ADD;
  return MOVIES_COUNT.DESKTOP_ADD;
};

function MoviesCardList({ movies, isSaved = false }) {
  const { width } = useWindowDimensions();
  const [visibleMovies, setVisibleMovies] = useState(getVisibleMovies(width));
  useEffect(() => {
    setVisibleMovies(getVisibleMovies(width));
  }, [width]);

  const handleAddMovies = () => {
    setVisibleMovies((prev) => prev + getAddVisibleMovies(width));
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((movie, idx) => {
          if (idx >= visibleMovies) return null;
          return (
            <li className="movies-card-list__item" key={movie.id}>
              <MoviesCard movie={movie} isSaved={isSaved} />
            </li>
          );
        })}
      </ul>
      {movies.length > visibleMovies && (
        <Button className="movies-card-list__button" type="button" onClick={handleAddMovies}>
          Ещё
        </Button>
      )}
    </section>
  );
}

export default MoviesCardList;
