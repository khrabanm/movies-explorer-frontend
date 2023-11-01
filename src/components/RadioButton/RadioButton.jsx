import './RadioButton.css';
import save from '../../images/save.svg';
import saved from '../../images/saved.svg';

function RadioButton({ checked, onChange, name }) {
  return (
    <label className="radio-button">
      <input
        className="radio-button__input visually-hidden"
        type="checkbox"
        value={checked}
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <img src={checked ? saved : save} alt="Чекбокс" />
    </label>
  );
}

export default RadioButton;
