import './AboutProject.css';
import Title from "../Title/Title";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container container">
        <Title>О проекте</Title>
        <div className="about-project__info">
          <div className="about-project__column">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
              финальные доработки.
            </p>
          </div>
          <div className="about-project__column">
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
              успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__progress">
          <div className="about-project__progress-section about-project__progress-section_type_backend">
            1 неделя
          </div>
          <div className="about-project__progress-section about-project__progress-section_type_frontend">
            4 недели
          </div>
          <div className="about-project__progress-text">Back-end</div>
          <div className="about-project__progress-text">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
