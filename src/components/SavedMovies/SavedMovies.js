import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({
  handleSearchFormMovies,
  savedMovieList,
  MoviesForRender,
  onCardDelete,
  sortShortFilm
}) => {
  const renderList =
    MoviesForRender.length === 0 ? savedMovieList : MoviesForRender;

  return (
    <main className="movies">
      <SearchForm
        handleSearchFormMovies={handleSearchFormMovies}
        sortShortFilm={sortShortFilm}
      />
      <MoviesCardList
        movieList={renderList}
        savedMovies={savedMovieList}
        handleDeleteCard={onCardDelete}
      />
    </main>
  );
};
export default SavedMovies;