import { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { MOVIES_TEXT_ERROR, MOVIES_TEXT_NOT_FOUND, SHORT_MOVIE_DURATION } from '../../utils/consts';
import Preloader from '../Preloader/Preloader';

function Movies({ allMovies, getMovies, isError, isSaved = false }) {
  const [state, setState] = useState(
    localStorage.moviesState
      ? JSON.parse(localStorage.moviesState)
      : {
          movies: [],
          isShortMovies: false,
          searchQuery: '',
        },
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery, isShortMovies) => {
    if (isLoading) return;

    setIsLoading(true);
    let movies = allMovies;
    if (movies.length === 0) {
      movies = await getMovies();
    }

    movies = movies.filter((movie) => {
      if (isShortMovies) {
        return (
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) &&
          movie.duration <= SHORT_MOVIE_DURATION
        );
      }
      return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const newState = {
      movies,
      isShortMovies,
      searchQuery,
    };

    localStorage.setItem('moviesState', JSON.stringify(newState));

    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
    setIsLoading(false);
  };

  const handleFilter = (e) => {
    const isShortMovies = e.target.checked;
    handleSearch(state.searchQuery, isShortMovies);
  };

  const handleChangeQuery = (e) => {
    setState((prevState) => ({
      ...prevState,
      searchQuery: e.target.value,
    }));
  };

  return (
    <section className="movies">
      <div className="movies__container container">
        <SearchForm
          className="movies__divider"
          query={state.searchQuery}
          isShortMovies={state.isShortMovies}
          onChangeQuery={handleChangeQuery}
          onSearch={handleSearch}
          onFilter={handleFilter}
        />
        {isLoading && <Preloader />}
        {!isLoading && isError && <p className="movies__error">{MOVIES_TEXT_ERROR}</p>}
        {!isLoading && state.movies.length === 0 && allMovies.length !== 0 && !isError && (
          <p className="movies__error">{MOVIES_TEXT_NOT_FOUND}</p>
        )}
        {!isLoading && state.movies.length > 0 && (
          <MoviesCardList movies={state.movies} isSaved={isSaved} />
        )}
      </div>
    </section>
  );
}

export default Movies;
