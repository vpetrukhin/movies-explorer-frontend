import { BESTFILMS_BASE_URL } from "./constance";
import { getResponse } from "./getResponse";

export function getFilms() {
  return fetch(`${BESTFILMS_BASE_URL}/beatfilm-movies`)
    .then(res => getResponse(res));
}