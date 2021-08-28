import React, { useEffect, useState } from 'react';

import { BESTFILMS_BASE_URL } from '../../utils/constance';
import { generateDurationString } from '../../utils/generateDurationString';

const MoviesCard = ({ movie, handleSaveMovie, savedMovies }) => {
  const [isSave, setIsSave] = useState(false);

  const { image, nameRU, duration, trailerLink, id } = movie;

  useEffect(() => {
    setIsSave(savedMovies.some((savedMovie) => savedMovie.movieId === id));
  }, [savedMovies, id])

  const btnClass = isSave
    ? "movies-card__btn movies-card__btn_saved"
    : "movies-card__btn";

  const handleSave = () => {
    handleSaveMovie(movie, isSave, findMovies()?._id);
  };

  const findMovies = () => {
    return savedMovies.find((savedMovie) => savedMovie.movieId === id);
  }

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