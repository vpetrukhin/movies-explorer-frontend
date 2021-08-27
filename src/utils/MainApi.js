import { MYAPI_BASE_URL } from "./constance";

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