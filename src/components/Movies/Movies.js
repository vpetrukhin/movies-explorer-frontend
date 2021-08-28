import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

const Movies = ({
  handleSearchFormMovies,
  movieList,
  notFound,
  loading,
  isActive,
  moreMoviesBtnHandler,
  moreBtnActive,
  isCardSave,
  handleCardSave,
  checkSavedCard,
  savedMovies,
}) => {
  return (
    <main className="movies">
      <SearchForm
        handleSearchFormMovies={handleSearchFormMovies}
        movieList={movieList}
      />

      {loading && !movieList.length ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movieList={movieList}
          notFound={notFound}
          btnHandler={moreMoviesBtnHandler}
          btnIsActive={moreBtnActive}
          isCardSave={isCardSave}
          handleCardSave={handleCardSave}
          checkSavedCard={checkSavedCard}
          savedMovies={savedMovies}
        />
      )}

      <InfoToolTip isActive={isActive} />
    </main>
  );
};
export default Movies;