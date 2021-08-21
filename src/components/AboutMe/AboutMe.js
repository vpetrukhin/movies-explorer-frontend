import React from 'react';

import avatar from '../../images/ava-min.jpg';

const AboutMe = () => {
  
  return (
    <section id="aboutMe" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__inner">
        <div className="about-me__description">
          <h3 className="about-me__name">Василий</h3>
          <p className="about-me__about">Фронтенд-разработчик, 23 года</p>
          <p className="about-me__text">Я родился и живу в Москве. Закончил Московский автодорожный институт по професии "Инженер по автоматизици". Люблю активно проводить время. В конце 4 курса начал кодить. После окончания курса по веб-разработке занялся поиском работы.</p>
          <ul className="about-me__list">
            <li className="about-me__item">
              <a href="https://vk.com/vasyaapp" className="about-me__link">VK</a>
            </li>
            <li className="about-me__item">
              <a href="https://github.com/vpetrukhin" className="about-me__link">Github</a>
            </li>
          </ul>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Василий" />
      </div>
    </section>
  )
};

export default AboutMe;
