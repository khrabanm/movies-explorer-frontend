import { useState } from 'react';
import './SearchForm.css';
import search from '../../images/search.svg';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { FORM_ERROR_MESSAGES } from '../../utils/consts';

function SearchForm({ className, query, isShortMovies, onChangeQuery, onSearch, onFilter }) {
  const [isEmpty, setIsEmpty] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setIsEmpty(true);
      return;
    }
    onSearch(query, isShortMovies);
  };

  const handleChangeQuery = (e) => {
    onChangeQuery(e);
    setIsEmpty(false);
  };

  return (
    <section className={`search-form ${className || ''}`}>
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className={`search-form__container ${isEmpty ? 'search-form__container--error' : ''}`}>
          <input
            className="search-form__input"
            value={query}
            onChange={handleChangeQuery}
            name="search"
            placeholder="Фильм"
          />
          <Button className="search-form__button" type="submit">
            <img src={search} alt="Поиск" />
          </Button>
          {isEmpty && <span className="search-form__error">{FORM_ERROR_MESSAGES.search}</span>}
        </div>
        <FilterCheckbox text="Короткометражки" checked={isShortMovies} onChange={onFilter} />
      </form>
    </section>
  );
}

export default SearchForm;
