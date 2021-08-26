import React from 'react';

import MoviesCards from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movieList,
  notFound,
  btnHandler,
  btnIsActive,
  isCardSave,
  handleCardSave,
}) => {
  if (notFound) {
    return (
      <section className="movies-cards">
        <p className="movies-cards__message">Ничего не найдено</p>
      </section>
    );
  } else {
    return (
      <section className="movies-cards">
        <ul className="movies-cards__list">
          {movieList.map((movie) => (
            <MoviesCards
              movie={movie}
              key={movie.id}
              isSave={isCardSave}
              handleSave={handleCardSave}
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
    );
  }
};
export default MoviesCardList;