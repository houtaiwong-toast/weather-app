export const convertUnixTimestamp = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let ampm = 'AM';
  if (hours > 12) {
    hours -= 12;
    ampm = 'PM';
  }

  return {
    date: date.toDateString(),
    time: `${hours}:${date.getMinutes()} ${ampm}`,
  };
};
