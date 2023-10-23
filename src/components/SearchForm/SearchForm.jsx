import './SearchForm.css';
import search from '../../images/search.svg';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ className, query, isShortMovies, onChangeQuery, onSearch, onFilter }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, isShortMovies);
  };

  return (
    <section className={`search-form ${className || ''}`}>
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input
            className="search-form__input"
            value={query}
            onChange={onChangeQuery}
            placeholder="Фильм"
            required
          />
          <Button className="search-form__button" type="submit">
            <img src={search} alt="Поиск" />
          </Button>
        </div>
        <FilterCheckbox text="Короткометражки" checked={isShortMovies} onChange={onFilter} />
      </form>
    </section>
  );
}

export default SearchForm;
