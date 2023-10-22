import './FilterCheckbox.css';
import smalltumb from '../../images/smalltumb.svg';
import smalltumboff from '../../images/smalltumboff.svg';

function FilterCheckbox({ checked, onChange, text }) {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__input visually-hidden"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <img src={checked ? smalltumb : smalltumboff} alt="Чекбокс" />
      <span className="filter-checkbox__text">{text}</span>
    </label>
  );
}

export default FilterCheckbox;
