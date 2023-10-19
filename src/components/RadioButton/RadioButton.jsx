import './RadioButton.css';
import save from '../../images/save.svg';
import saved from '../../images/saved.svg';

function RadioButton({ checked, onChange }) {
  return (
    <label className="radio-button">
      <input className="radio-button__input" type="radio" checked={checked} onChange={onChange} />
      <img src={checked ? saved : save} alt="checkbox" />
    </label>
  );
}

export default RadioButton;
