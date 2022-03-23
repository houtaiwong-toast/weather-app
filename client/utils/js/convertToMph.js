// Convert meters per second to MPH
export const convertToMph = (speed, useMetric) =>
  useMetric
    ? `${parseInt(speed)} m/s`
    : `${parseInt(speed * 2.237)} mph`;
