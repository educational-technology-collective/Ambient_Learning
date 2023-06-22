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

// Horizontal Swiping Function
export const HorizontalMove = (
  detail: any,
  stuff: any,
  handleNegativeOpacity: (detail: any) => void,
  handlePositiveOpacity: (detail: any) => void
) => {
  stuff.style.transform = `translateX(${detail.deltaX}px) rotate(${
    detail.deltaX / 20
  }deg)`;
  showHorizontalInd(detail, handleNegativeOpacity, handlePositiveOpacity);
};

// Horizontal Swipe End Function Determination
export const HorizontalEnd = (
  detail: any,
  stuff: any,
  handleShowNothing: () => void,
  timeOutFunc: () => void
) => {
  const windowWidth = window.innerWidth;
  stuff.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

  // Swiping Right Quick Enough
  if (detail.velocityX > 0.3) {
    stuff.style.transform = `translateX(${windowWidth * 1.5}px)`;
    setTimeout(timeOutFunc, 100);
  }
  // Swiping Right more than half of window length. Move Card to Right
  else if (detail.deltaX > windowWidth / 3) {
    stuff.style.transform = `translateX(${windowWidth * 1.5}px)`;
    setTimeout(timeOutFunc, 100);
  }
  // Swiping Left Quick Enough
  else if (detail.velocityX < -0.3) {
    stuff.style.transform = `translateX(${windowWidth * -1.5}px)`;
    setTimeout(timeOutFunc, 100);
  }
  // Swiping Left More than half of window length. Move Card to Left
  else if (detail.deltaX < -windowWidth / 3) {
    stuff.style.transform = `translateX(${-windowWidth * 1.5}px)`;
    setTimeout(timeOutFunc, 100);
  }
  // Not Swiping Enough. Reset the Card to its position
  else {
    stuff.style.transform = "";
    handleShowNothing();
  }
};

// Function that shows the vertical indicators based on states
export const showVerticalInd = (
  detail: any,
  isClicked: boolean,
  handleNoMoreOpacity: (detail: any) => void,
  handleOneMoreOpacity: (detail: any) => void,
  handleShowNothing: () => void
) => {
  // Before Clicking
  if (!isClicked) {
    // Swipe Down to Show No More Card
    if (detail.deltaY > 0) {
      handleNoMoreOpacity(detail);
    }
    // Swipe Up will show nothing
    else {
      handleShowNothing();
    }
  }
  // After Clicking
  else {
    // Swipe Up will show One More Card
    if (detail.deltaY < 0) {
      handleOneMoreOpacity(detail);
    }
    // Swipe Down will show no more card only if correct
    else {
      handleNoMoreOpacity(detail);
    }
  }
};
