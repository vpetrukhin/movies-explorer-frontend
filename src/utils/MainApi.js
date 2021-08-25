import { MYAPI_BASE_URL } from "./constance";

export async function register(name, email, password) {
  const res = await fetch(`${MYAPI_BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const json = res.json();
  return json;
}