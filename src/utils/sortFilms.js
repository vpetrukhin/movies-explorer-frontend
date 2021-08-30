import { SHORT_FILM_DURATION } from "./constance";

export const sortFilms = (films, keyWord, isShortFilm) => {
  if (isShortFilm && !keyWord) {
    return films.filter((film) => film.duration <= SHORT_FILM_DURATION);
  }

  if (isShortFilm) {
    const shortFilmList = films.filter((film) => film.duration <= SHORT_FILM_DURATION);
    return shortFilmList.filter((film) => film.nameRU.search(keyWord) !== -1);
  }

  const sortFilmsList = films.filter(
    (film) => film.nameRU.search(keyWord) !== -1
  );

  return sortFilmsList;
};
