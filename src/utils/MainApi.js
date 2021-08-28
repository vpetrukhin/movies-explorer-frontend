import { BESTFILMS_BASE_URL, MYAPI_BASE_URL } from "./constance";

export async function register(name, email, password) {
  const res = await fetch(`${MYAPI_BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const json = await res.json();
  return json;
}

export async function login(email, password) {
  const res = await fetch(`${MYAPI_BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json()
  return json;
}

export async function getUserInfo(jwt) {
  const res = await fetch(`${MYAPI_BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwt}`,
    },
  });
  const json = await res.json();
  return json;
}

export async function updateUserInfo(email, name, jwt) {
  const res = await fetch(`${MYAPI_BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ email, name }),
  })
  const json = await res.json();
  return json;
}

export async function getSavedFilms(jwt) {
  const res = await fetch(`${MYAPI_BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  });
  const json = await res.json();
  return json;
}

export async function addFilm(filmData, jwt) {
  const { country, director, duration, year, description, nameRU, nameEN  } = filmData;
  const image = `${BESTFILMS_BASE_URL}${filmData.image.url}`;
  const thumbnail = `${BESTFILMS_BASE_URL}${filmData.image.formats.thumbnail.url}`;
  const trailer = filmData.trailerLink;
  const movieId = filmData.id;

  const res = await fetch(`${MYAPI_BASE_URL}/movies`, {
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
  });
  const json = await res.json();
  return json;
}

export async function deleteFilm(movieId, jwt) {
  const res = await fetch(`${MYAPI_BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwt}`,
    },
  });
  const json = await res.json();
  return json;
}