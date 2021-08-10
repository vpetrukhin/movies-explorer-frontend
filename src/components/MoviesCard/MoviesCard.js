import React from 'react';

import picture from '../../images/movie-img.jpg';

const MoviesCard = () => {
  
  return (
    <article className="movies-card">
      <div className="movies-card__img-wrapper">
        <button className="movies-card__btn" type="button">Сохранить</button>
        <img className="movies-card__img" src={picture} alt="#"/>
      </div>
      <div className="movies-card__description">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <p className="movies-card__duration">1ч 17м</p>
      </div>
    </article>
  )
}
export default MoviesCard;