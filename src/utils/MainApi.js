import { BESTFILMS_BASE_URL, MYAPI_BASE_URL } from "./constance";
import { getResponse } from "./getResponse";



export function register(name, email, password) {
  return fetch(`${MYAPI_BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => getResponse(res));
};

export function login(email, password) {
  return fetch(`${MYAPI_BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponse(res));
}

export function getUserInfo(jwt) {
  return fetch(`${MYAPI_BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwt}`,
    },
  })
    .then(res => getResponse(res));
}

export function updateUserInfo(email, name, jwt) {
  return fetch(`${MYAPI_BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ email, name }),
  })
    .then(res => getResponse(res));
}

export function getSavedFilms(jwt) {
  return fetch(`${MYAPI_BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  })
    .then(res => getResponse(res));
}

export function addFilm(filmData, jwt) {
  const { country, director, duration, year, description, nameRU, nameEN  } = filmData;
  const image = `${BESTFILMS_BASE_URL}${filmData.image.url}`;
  const thumbnail = `${BESTFILMS_BASE_URL}${filmData.image.formats.thumbnail.url}`;
  const trailer = filmData.trailerLink;
  const movieId = filmData.id;

  return fetch(`${MYAPI_BASE_URL}/movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    }),
  })
    .then(res => getResponse(res));
}

export function deleteFilm(movieId, jwt) {
  return fetch(`${MYAPI_BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwt}`,
    },
  })
    .then(res => getResponse(res));
}
