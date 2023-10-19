import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import Button from "../Button/Button";

function MoviesCardList({ movies, isSaved = false }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((movie) => (
          <li className="movies-card-list__item" key={movie.id}>
            <MoviesCard movie={movie} isSaved={isSaved} />
          </li>
        ))}
      </ul>
      {!isSaved && movies.length > 0 && (
        <Button className="movies-card-list__button" type="button">
          Ещё
        </Button>
      )}
    </section>
  );
}

export default MoviesCardList;
