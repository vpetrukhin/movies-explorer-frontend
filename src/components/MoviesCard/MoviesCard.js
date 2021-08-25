import React from 'react';

import { BESTFILMS_BASE_URL } from '../../utils/constance';
import { generateDurationString } from '../../utils/generateDurationString';

const MoviesCard = ({ movie }) => {
  const { image, nameRU, duration } = movie;



  return (
    <li className="movies-cards__card">
      <article className="movies-card">
        <div className="movies-card__img-wrapper">
          <button className="movies-card__btn" type="button">
            Сохранить
          </button>
          <img
            className="movies-card__img"
            src={`${BESTFILMS_BASE_URL}${image.url}`}
            alt={nameRU}
          />
        </div>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{generateDurationString(duration)}</p>
        </div>
      </article>
    </li>
  );
}
export default MoviesCard;