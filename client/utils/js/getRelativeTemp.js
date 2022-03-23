// Determine how the temperature feels, to adjust the temperature color
export const getRelativeTemp = kelvin => {
  if (kelvin < 280) {
    return 'cold';
  }
  if (280 < kelvin < 300) {
    return 'nice';
  }
  return 'hot';
};
