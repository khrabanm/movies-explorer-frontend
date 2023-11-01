import { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { MOVIES_TEXT_ERROR, MOVIES_TEXT_NOT_FOUND, SHORT_MOVIE_DURATION } from '../../utils/consts';
import Preloader from '../Preloader/Preloader';
import usePrevious from '../../hooks/usePrevious';

function Movies({ allMovies, savedMovies, getMovies, onSave, onDelete, isError, isSaved = false }) {
  const setInitialStates = () => {
    if (isSaved) {
      if (localStorage.savedMoviesState) {
        const savedMoviesState = JSON.parse(localStorage.savedMoviesState);
        return {
          ...savedMoviesState,
          movies: savedMoviesState.movies.filter((movie) =>
            savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId),
          ),
        };
      }
      return {
        movies: savedMovies,
        isShortMovies: false,
        searchQuery: '',
      };
    }
    return localStorage.moviesState
      ? JSON.parse(localStorage.moviesState)
      : {
          movies: [],
          isShortMovies: false,
          searchQuery: '',
        };
  };
  const [state, setState] = useState(setInitialStates());
  const [isLoading, setIsLoading] = useState(false);
  const prevIsSaved = usePrevious(isSaved);

  const handleSearch = async (searchQuery, isShortMovies) => {
    if (isLoading) return;

    setIsLoading(true);
    let movies = !isSaved ? allMovies : savedMovies;
    if (movies.length === 0) {
      movies = await getMovies();
    }

    movies = movies.filter((movie) => {
      if (isShortMovies) {
        return (
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())) &&
          movie.duration <= SHORT_MOVIE_DURATION
        );
      }
      return (
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    const newState = {
      movies,
      isShortMovies,
      searchQuery,
    };

    localStorage.setItem(!isSaved ? 'moviesState' : 'savedMoviesState', JSON.stringify(newState));

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

  useEffect(() => {
    if (isSaved && prevIsSaved !== isSaved) {
      if (localStorage.savedMoviesState) {
        const savedMoviesState = JSON.parse(localStorage.savedMoviesState);
        setState({
          ...savedMoviesState,
          movies: savedMoviesState.movies.filter((movie) =>
            savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId),
          ),
        });
      } else {
        setState({
          isShortMovies: false,
          searchQuery: '',
          movies: savedMovies,
        });
      }
    } else if (!isSaved && prevIsSaved !== isSaved) {
      setState(
        localStorage.moviesState
          ? JSON.parse(localStorage.moviesState)
          : {
              movies: [],
              isShortMovies: false,
              searchQuery: '',
            },
      );
    }
  }, [savedMovies, isSaved, prevIsSaved]);

  useEffect(
    () => () => {
      if (isSaved) {
        localStorage.removeItem('savedMoviesState');
      }
    },
    [isSaved],
  );

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
        {!isLoading &&
          state.movies.length === 0 &&
          ((!isSaved && allMovies.length !== 0) || (isSaved && savedMovies.length !== 0)) &&
          !isError && <p className="movies__error">{MOVIES_TEXT_NOT_FOUND}</p>}
        {!isLoading && state.movies.length > 0 && (
          <MoviesCardList
            onSave={onSave}
            onDelete={onDelete}
            movies={state.movies}
            savedMovies={savedMovies}
            isSaved={isSaved}
          />
        )}
      </div>
    </section>
  );
}

export default Movies;
