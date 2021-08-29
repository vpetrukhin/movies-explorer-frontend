import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { BESTFILMS_BASE_URL } from '../../utils/constance';
import { generateDurationString } from '../../utils/generateDurationString';

const MoviesCard = ({
  movie,
  handleSaveMovie,
  handleDeleteCard,
  savedMovies,
}) => {
  const [isSave, setIsSave] = useState(false);

  const { image, nameRU, duration } = movie;
  const id = movie.id || movie.movieId;
  const trailer = movie.trailerLink || movie.trailer

  useEffect(() => {
    setIsSave(savedMovies.some((savedMovie) => savedMovie.movieId === id));
  }, [savedMovies, id]);

  const btnClass = isSave
    ? "movies-card__btn movies-card__btn_saved"
    : "movies-card__btn";

  const handleSave = () => {
    handleSaveMovie(movie, isSave);
  };
  const handleDelete = () => {
    handleDeleteCard(findMovies()._id);
  };
  const findMovies = () => {
    return savedMovies.find((savedMovie) => savedMovie.movieId === id);
  };

  return (
    <Switch>
      <Route path="/movies">
        <li className="movies-cards__card">
          <article className="movies-card">
            <button className={btnClass} type="button" onClick={handleSave}>
              Сохранить
            </button>
            <a
              href={trailer}
              className="movies-card__link"
              target="_blank"
              rel="noreferrer"
            >
              <div className="movies-card__img-wrapper">
                <img
                  className="movies-card__img"
                  src={
                    image.url
                      ? `${BESTFILMS_BASE_URL}${image.url}`
                      : movie.image
                  }
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
      </Route>
      <Route path="/saved-movies">
        <li className="movies-cards__card">
          <article className="movies-card movies-card_saved">
            <button
              className="movies-card__btn movies-card__btn_saved"
              type="button"
              onClick={handleDelete}
            />
            <a
              href={trailer}
              className="movies-card__link"
              target="_blank"
              rel="noreferrer"
            >
              <div className="movies-card__img-wrapper">
                <img
                  className="movies-card__img"
                  src={
                    image.url
                      ? `${BESTFILMS_BASE_URL}${image.url}`
                      : movie.image
                  }
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
      </Route>
    </Switch>
  );
};
export default MoviesCard;