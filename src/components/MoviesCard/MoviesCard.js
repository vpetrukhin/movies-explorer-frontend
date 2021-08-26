import React from 'react';

import { BESTFILMS_BASE_URL } from '../../utils/constance';
import { generateDurationString } from '../../utils/generateDurationString';

const MoviesCard = ({ movie, isSave, handleSave }) => {
  const { image, nameRU, duration, trailerLink } = movie;
  const btnClass = isSave
    ? "movies-card__btn movies-card__btn_saved"
    : "movies-card__btn";

  return (
    <li className="movies-cards__card">
      <article className="movies-card">
        <button className={btnClass} type="button" onClick={handleSave}>
          Сохранить
        </button>
        <a
          href={trailerLink}
          className="movies-card__link"
          target="_blank"
          rel="noreferrer"
        >
          <div className="movies-card__img-wrapper">
            <img
              className="movies-card__img"
              src={`${BESTFILMS_BASE_URL}${image.url}`}
              alt={nameRU}
            />
          </div>
          <div className="movies-card__description">
            <h2 className="movies-card__title">{nameRU}</h2>
            <p className="movies-card__duration">
              {generateDurationString(duration)}
            </p>
          </div>
        </a>
      </article>
    </li>
  );
};
export default MoviesCard;