import { BESTFILMS_BASE_URL } from "./constance";

export async function getFilms() {
  const res = await fetch(`${BESTFILMS_BASE_URL}/beatfilm-movies`);
  const json = await res.json()
  return json
}