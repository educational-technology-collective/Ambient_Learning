/* *******

This file is for the swiping mechanism of the crads. 
Since both of the cards use the same move/end logic, we have one file for them.

******* */
import { Gesture, GestureDetail, createGesture } from "@ionic/react";

// Function that Present Horizontal Indicators through opacity change
const showHorizontalInd = (
  detail: GestureDetail,
  handleNegativeOpacity: (detail: GestureDetail) => void,
  handlePositiveOpacity: (detail: GestureDetail) => void
) => {
  // Swipe Right. Show Positive Indicators
  if (detail.deltaX > 0) {
    handlePositiveOpacity(detail);
  }
  // Swipe Left. Show Negative Indicators
  else {
    handleNegativeOpacity(detail);
  }
};

// Horizontal Swiping Function
const HorizontalMove = (
  detail: GestureDetail,
  stuff: HTMLInputElement | null,
  handleNegativeOpacity: (detail: GestureDetail) => void,
  handlePositiveOpacity: (detail: GestureDetail) => void
) => {
  if (stuff) {
    stuff.style.transform = `translateX(${detail.deltaX}px) rotate(${
      detail.deltaX / 20
    }deg)`;
    // Calling the function to show horizontal indicators
    showHorizontalInd(detail, handleNegativeOpacity, handlePositiveOpacity);
  }
};

// Horizontal Swipe End Function Determination
const HorizontalEnd = (
  detail: GestureDetail,
  stuff: HTMLInputElement | null,
  handleShowNothing: () => void,
  timeOutFunc: () => void
) => {
  if (stuff) {
    const windowWidth: number = window.innerWidth;
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
  }
};

// Function that shows the vertical indicators based on states
const showVerticalInd = (
  detail: GestureDetail,
  isClicked: boolean,
  handleNoMoreOpacity: (detail: GestureDetail) => void,
  handleOneMoreOpacity: (detail: GestureDetail) => void,
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
    // Swipe Up will show One More Card indicator
    if (detail.deltaY < 0) {
      handleOneMoreOpacity(detail);
    }
    // Swipe Down will show no more card only if correct
    else {
      handleNoMoreOpacity(detail);
    }
  }
};

// Vertical Swiping Function
const VerticalMove = (
  detail: GestureDetail,
  card: HTMLInputElement | null,
  stuff: HTMLInputElement | null,
  isClicked: boolean,
  handleNoMoreOpacity: (detail: GestureDetail) => void,
  handleOneMoreOpacity: (detail: GestureDetail) => void,
  handleShowNothing: () => void
) => {
  if (stuff && card) {
    // Before Flipping. Move Down the Whole Tuple
    if (!isClicked) {
      stuff.style.transform = `translateY(${detail.deltaY}px) rotate(${
        detail.deltaY / 90
      }deg)`;
    }
    // After Flipping
    else {
      // Moving Down will move the whole Tuple
      if (detail.deltaY > 0) {
        stuff.style.transform = `translateY(${detail.deltaY}px) rotate(${
          detail.deltaY / 90
        }deg)`;
      }
      // Moving Up will only move the top card
      else {
        stuff.style.transform = "";
        card.style.transform = `translateY(${detail.deltaY}px) rotate(${
          detail.deltaY / 90
        }deg)`;
      }
    }
    // Call the function to show vertical indicators
    showVerticalInd(
      detail,
      isClicked,
      handleNoMoreOpacity,
      handleOneMoreOpacity,
      handleShowNothing
    );
  }
};

// Vertical Swipe End Function Determination
const VerticalEnd = (
  detail: GestureDetail,
  card: HTMLInputElement | null,
  stuff: HTMLInputElement | null,
  isClicked: boolean,
  handleShowNothing: () => void,
  backHandler: () => void,
  timeOutFunc: () => void,
  oneMoreTimeOut: () => void
) => {
  if (stuff && card) {
    const windowHeight: number = window.innerHeight;
    stuff.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    card.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Before clicking
    if (!isClicked) {
      // Swipe Down fast, clear the tuple
      if (detail.velocityY > 0.3) {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Swipe Down enough, clear the tuple
      else if (detail.deltaY > windowHeight / 4) {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Reset
      else {
        stuff.style.transform = "";
        handleShowNothing();
      }
    }
    // After clicking
    else {
      // Swipe Up fast, clear the top card
      if (detail.velocityY < -0.3) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(oneMoreTimeOut, 100);

        // Set all the style/className/isClicked back
        stuff.style.transform = "";
        backHandler();
      }
      // Swipe Up enough, clear the top card
      else if (detail.deltaY < -windowHeight / 4) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(oneMoreTimeOut, 100);

        // Set all the style/className/isClicked back
        stuff.style.transform = "";
        backHandler();
      }
      //  Swipe down fast, clear the tuple
      else if (detail.velocityY > 0.3) {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Swipe down enough, clear the tuple
      else if (detail.deltaY > windowHeight / 4) {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Reset
      else {
        card.style.transform = "";
        stuff.style.transform = "";
        handleShowNothing();
      }
    }
  }
};

// Function that manages the gesture
export const enableGesture = (
  card: HTMLInputElement | null,
  stuff: HTMLInputElement | null,
  isClicked: boolean,
  handleNegativeOpacity: (detail: GestureDetail) => void,
  handlePositiveOpacity: (detail: GestureDetail) => void,
  handleNoMoreOpacity: (detail: GestureDetail) => void,
  handleOneMoreOpacity: (detail: GestureDetail) => void,
  handleShowNothing: () => void,
  backHandler: () => void,
  timeOutFunc: () => void,
  oneMoreTimeOut: () => void
) => {
  if (stuff && card) {
    // Horizontal Direction Swiping
    const gestureX: Gesture = createGesture({
      el: card,
      gestureName: "swipe-x",
      direction: "x",
      onMove: (detail) =>
        HorizontalMove(
          detail,
          stuff,
          handleNegativeOpacity,
          handlePositiveOpacity
        ),
      onEnd: (detail) =>
        HorizontalEnd(detail, stuff, handleShowNothing, timeOutFunc),
    });

    // Veritical Direction Swiping
    const gestureY: Gesture = createGesture({
      el: card,
      gestureName: "swipe-y",
      direction: "y",
      onMove: (detail) =>
        VerticalMove(
          detail,
          card,
          stuff,
          isClicked,
          handleNoMoreOpacity,
          handleOneMoreOpacity,
          handleShowNothing
        ),
      onEnd: (detail) =>
        VerticalEnd(
          detail,
          card,
          stuff,
          isClicked,
          handleShowNothing,
          backHandler,
          timeOutFunc,
          oneMoreTimeOut
        ),
    });

    // Vertical Swiping is always Enabled
    gestureY.enable(true);

    // Horizontal Swiping is enabled only after tapping
    gestureX.enable(isClicked);
  }
};
