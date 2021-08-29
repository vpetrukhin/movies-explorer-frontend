export const sortFilms = (films, keyWord, isShortFilm) => {
  if (isShortFilm && !keyWord) {
    return films.filter((film) => film.duration <= 40);
  }

  if (isShortFilm) {
    const shortFilmList = films.filter((film) => film.duration <= 40);
    return shortFilmList.filter((film) => film.nameRU.search(keyWord) !== -1);
  }

  const sortFilmsList = films.filter(
    (film) => film.nameRU.search(keyWord) !== -1
  );

  return sortFilmsList;
};
