import React from 'react';

const AboutProject = () => {
  
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__discription">
        <div className="about-project__stages">
          <h3 className="about-project__heading">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__weeks">
          <h3 className="about-project__heading">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__statusbar">
        <div className="about-project__back">
          <div className="about-project__rectangle about-project__rectangle_green">1 неделя</div>
          <p className="about-project__caption">Back-end</p>
        </div>
        <div className="about-project__front">
          <div className="about-project__rectangle">4 недели</div>
          <p className="about-project__caption">Front-end</p></div>
      </div>
    </section>
  )
}
export default AboutProject;