import './Title.css';

function Title({ children }) {
  return (
    <h2 className="title">{children}</h2>
  );
}

export default Title;