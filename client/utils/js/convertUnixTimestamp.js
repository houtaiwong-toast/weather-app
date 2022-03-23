export const convertUnixTimestamp = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = 'AM';
  if (hours > 12) {
    hours -= 12;
    ampm = 'PM';
  }
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return {
    date: date.toDateString(),
    time: `${hours}:${minutes} ${ampm}`,
  };
};
