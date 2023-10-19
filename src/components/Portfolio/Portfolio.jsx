import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__container container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://github.com/khrabanm"
              target="_blank"
              rel="noreferrer"
            >
              <span className="portfolio__link-text">Статичный сайт</span>
              <span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://github.com/khrabanm"
              target="_blank"
              rel="noreferrer"
            >
              <span className="portfolio__link-text">Адаптивный сайт</span>
              <span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://github.com/khrabanm"
              target="_blank"
              rel="noreferrer"
            >
              <span className="portfolio__link-text">Одностраничное приложение</span>
              <span className="portfolio__link-arrow">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
