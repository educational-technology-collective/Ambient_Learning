
// Function that Present Horizontal Indicators through opacity change
export const showHorizontalInd = (
  detail: any,
  handleNegativeOpacity: (detail: any) => void,
  handlePositiveOpacity: (detail: any) => void
) => {
  // Swipe Right
  if (detail.deltaX > 0) {
    handlePositiveOpacity(detail);
  }
  // Swipe Left
  else {
    handleNegativeOpacity(detail);
  }
};
