import React from 'react';

const Portfolio = () => {
  
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://vpetrukhin.github.io/how-to-learn/" target="_blank" className="portfolio__link" rel="noreferrer">Статичный сайт</a>
        </li>
        <li className="portfolio__item">
          <a href="https://vpetrukhin.github.io/russian-travel/index.html" target="_blank" className="portfolio__link" rel="noreferrer">Адаптивный сайт</a>
        </li>
        <li className="portfolio__item">
          <a href="https://people.mesto.nomoredomains.monster" target="_blank" className="portfolio__link" rel="noreferrer">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
}
export default Portfolio;