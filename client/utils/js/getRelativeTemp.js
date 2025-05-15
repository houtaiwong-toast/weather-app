// Determine how the temperature feels, to adjust the temperature color
export const getRelativeTemp = kelvin => {
  if (kelvin < -73.15) {
    return 'cold';
  }
  if (6.85 < kelvin < 26.85) {
    return 'nice';
  }
  return 'hot';
};
