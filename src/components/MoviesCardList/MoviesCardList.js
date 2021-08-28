import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MoviesCards from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movieList,
  notFound,
  btnHandler,
  btnIsActive,
  handleCardSave,
  handleDeleteCard,
  savedMovies,
}) => {
  if (notFound) {
    return (
      <section className="movies-cards">
        <p className="movies-cards__message">Ничего не найдено</p>
      </section>
    );
  } else {
    return (
      <Switch>
        <Route path="/movies">
          <section className="movies-cards">
            <ul className="movies-cards__list">
              {movieList.map((movie) => (
                <MoviesCards
                  movie={movie}
                  key={movie.id ? movie.id : movie._id}
                  handleSaveMovie={handleCardSave}
                  savedMovies={savedMovies}
                />
              ))}
            </ul>
            {!btnIsActive && (
              <button
                className="movies-cards__btn"
                type="button"
                onClick={btnHandler}
              >
                Ещё
              </button>
            )}
          </section>
        </Route>
        <Route path="/saved-movies">
          <section className="movies-cards">
            <ul className="movies-cards__list">
              {movieList.map((movie) => (
                <MoviesCards
                  movie={movie}
                  key={movie.id ? movie.id : movie._id}
                  handleSaveMovie={handleCardSave}
                  savedMovies={savedMovies}
                  handleDeleteCard={handleDeleteCard}
                />
              ))}
            </ul>
          </section>
        </Route>
      </Switch>
    );
  }
};
export default MoviesCardList;