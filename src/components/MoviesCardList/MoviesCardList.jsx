import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { BREAKPOINTS, MOVIES_COUNT } from '../../utils/consts';
import usePrevious from '../../hooks/usePrevious';

const getVisibleMovies = (width) => {
  if (width <= BREAKPOINTS.MOBILE_MAX) return MOVIES_COUNT.MOBILE;
  if (width <= BREAKPOINTS.TABLET_MAX) return MOVIES_COUNT.TABLET;
  if (width <= BREAKPOINTS.LAPTOP_MAX) return MOVIES_COUNT.LAPTOP;
  if (width <= BREAKPOINTS.DESKTOP_MAX) return MOVIES_COUNT.DESKTOP;
  return MOVIES_COUNT.DESKTOP_4K;
};

const getAddVisibleMovies = (width) => {
  if (width <= BREAKPOINTS.MOBILE_MAX) return MOVIES_COUNT.MOBILE_ADD;
  if (width <= BREAKPOINTS.TABLET_MAX) return MOVIES_COUNT.TABLET_ADD;
  if (width <= BREAKPOINTS.LAPTOP_MAX) return MOVIES_COUNT.LAPTOP_ADD;
  if (width <= BREAKPOINTS.DESKTOP_MAX) return MOVIES_COUNT.DESKTOP_ADD;
  return MOVIES_COUNT.DESKTOP_4K_ADD;
};

function MoviesCardList({ movies, savedMovies, onSave, onDelete, isSaved = false }) {
  const { width } = useWindowDimensions();
  const [visibleMovies, setVisibleMovies] = useState(getVisibleMovies(width));
  const prevMovies = usePrevious(movies);

  useEffect(() => {
    setVisibleMovies(getVisibleMovies(width));
  }, [width]);

  useEffect(() => {
    if (prevMovies) {
      if (prevMovies.length !== movies.length) setVisibleMovies(getVisibleMovies(width));
      if (prevMovies.length === movies.length) {
        let isSame = true;
        prevMovies.forEach((movie, idx) => {
          if (movie.movieId !== movies[idx].movieId) isSame = false;
        });
        if (!isSame) setVisibleMovies(getVisibleMovies(width));
      }
    }
  }, [width, movies, prevMovies]);

  const handleAddMovies = () => {
    setVisibleMovies((prev) => prev + getAddVisibleMovies(width));
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((movie, idx) => {
          if (idx >= visibleMovies && !isSaved) return null;
          return (
            <li className="movies-card-list__item" key={movie.movieId}>
              <MoviesCard
                movie={movie}
                savedMovies={savedMovies}
                isSaved={isSaved}
                onSave={onSave}
                onDelete={onDelete}
              />
            </li>
          );
        })}
      </ul>
      {movies.length > visibleMovies && !isSaved && (
        <Button className="movies-card-list__button" type="button" onClick={handleAddMovies}>
          Ещё
        </Button>
      )}
    </section>
  );
}

export default MoviesCardList;
