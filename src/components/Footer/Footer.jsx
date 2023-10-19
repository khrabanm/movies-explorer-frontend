import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__footer">
          <span className="footer__year">&copy; 2023</span>
          <div className="footer__links">
            <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a className="footer__link" href="https://github.com/khrabanm" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;