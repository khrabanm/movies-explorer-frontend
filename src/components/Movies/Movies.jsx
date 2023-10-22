import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, isSaved = false }) {
  return (
    <section className="movies">
      <div className="movies__container container">
        <SearchForm className="movies__divider" />
        <MoviesCardList movies={movies} isSaved={isSaved} />
      </div>
    </section>
  );
}

export default Movies;
