import React from 'react';

import MoviesCards from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {
  
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        <li className="movies-cards__card">
          <MoviesCards />
        </li>
        <li className="movies-cards__card">
          <MoviesCards />
        </li>
        <li className="movies-cards__card">
          <MoviesCards />
        </li>
        <li className="movies-cards__card">
          <MoviesCards />
        </li>
        <li className="movies-cards__card">
          <MoviesCards />
        </li>
        <li className="movies-cards__card">
          <MoviesCards />
        </li>
      </ul>
      <button className="movies-cards__btn" type="button">Ещё</button>
    </section>
  )
}
export default MoviesCardList;