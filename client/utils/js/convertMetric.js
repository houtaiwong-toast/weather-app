export const convertMetric = (fahrenheit, useMetric) => {
  if (!fahrenheit) {
    return '';
  }
  if (useMetric) {
    const celsius = (fahrenheit - 32) * 5/9;
    return `${parseInt(celsius)}°C`;
  }
  return `${parseInt(fahrenheit)}°F`;
};
