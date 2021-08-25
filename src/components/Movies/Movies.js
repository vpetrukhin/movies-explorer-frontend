import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

const Movies = ({
  handleSearchFormSubmit,
  movieList,
  notFound,
  loading,
  isActive,
  moreMoviesBtnHandler,
}) => {
  return (
    <main className="movies">
      <SearchForm
        handleSearchFormSubmit={handleSearchFormSubmit}
        movieList={movieList}
      />

      {loading && !movieList.length ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movieList={movieList}
          notFound={notFound}
          btnHandler={moreMoviesBtnHandler}
        />
      )}

      <InfoToolTip isActive={isActive} />
    </main>
  );
};
export default Movies;