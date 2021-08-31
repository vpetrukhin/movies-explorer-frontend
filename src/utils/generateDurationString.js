export const generateDurationString = (duration) => {
  let hours = Math.floor(duration / 60);
  let minutes = (duration - 60) ;

  if (duration < 60) {
    minutes *= -1;
    return `${minutes}м`;
  }

  return `${hours}ч ${minutes}м`;
};