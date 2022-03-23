export const convertKelvin = (kelvin, useMetric) => {
  if (!kelvin) {
    return '';
  }
  const celcius = kelvin - 273.15;
  if (useMetric) {
    return `${parseInt(celcius)}°C`;
  }
  return `${parseInt(celcius * (9 / 5) + 32)}°F`;
};
