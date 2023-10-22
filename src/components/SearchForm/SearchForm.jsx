import { useState } from 'react';
import './SearchForm.css';
import search from '../../images/search.svg';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ className }) {
  const [checked, setChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={`search-form ${className || ''}`}>
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input className="search-form__input" placeholder="Фильм" required />
          <Button className="search-form__button" type="submit">
            <img src={search} alt="search" />
          </Button>
        </div>
        <FilterCheckbox
          text="Короткометражки"
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
      </form>
    </section>
  );
}

export default SearchForm;
