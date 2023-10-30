import './PageNotFound.css';
import Link from '../Link/Link';

function PageNotFound() {
  return (
    <main className="page-not-found">
      <div className="page-not-found__title-wrapper">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__text">Страница не найдена</p>
      </div>
      <Link to={-1} className="page-not-found__link">
        Назад
      </Link>
    </main>
  );
}

export default PageNotFound;
