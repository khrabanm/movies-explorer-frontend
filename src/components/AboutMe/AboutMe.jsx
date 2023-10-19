import './AboutMe.css';
import Title from '../Title/Title';
import student from '../../images/student.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container container">
        <Title>Студент</Title>
        <div className="about-me__info">
          <div className="about-me__column">
            <div className="about-me__about">
              <h3 className="about-me__subtitle">Виталий</h3>
              <p className="about-me__text">Фронтенд-разработчик, 30 лет</p>
              <p className="about-me__subtext">
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и
                дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015
                года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                начал заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
            </div>
            <a
              className="about-me__link"
              href="https://github.com/khrabanm"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <img
            className="about-me__photo"
            src={student}
            alt="Student"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
