import './Menu.css';

function Menu({ children, onClick }) {
  return (
    <div className="menu">
      <button type="button" className="menu__button" onClick={onClick}> </button>
      <div className="menu__container">{children}</div>
    </div>
  );
}

export default Menu;
