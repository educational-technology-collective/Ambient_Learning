/* 
------------**********-----------

This file is for the swiping mechanism of the crads. 
Since both of the cards use the same move/end logic, we have one file for them.

------------**********-----------
*/

import { Gesture, GestureDetail, createGesture } from "@ionic/react";

// Function that Present Horizontal Indicators through opacity change
const showHorizontalInd = (
  detail: GestureDetail,
  handleNegativeOpacity: (detail: GestureDetail) => void,
  handlePositiveOpacity: (detail: GestureDetail) => void,
  handleAnimateKnow: () => void,
  handleAnimateDontKnow: () => void
) => {
  // Swipe Right. Show Positive Indicators and animate know button
  if (detail.deltaX > 0) {
    handlePositiveOpacity(detail);
    handleAnimateKnow();
  }
  // Swipe Left. Show Negative Indicators and animate dont know button
  else {
    handleNegativeOpacity(detail);
    handleAnimateDontKnow();
  }
};

// Horizontal Swiping Function
export const HorizontalMove = (
  cardId: string,
  detail: GestureDetail,
  stuff: HTMLInputElement | null,
  handleNegativeOpacity: (detail: GestureDetail) => void,
  handlePositiveOpacity: (detail: GestureDetail) => void,
  handleAnimateKnow: () => void,
  handleAnimateDontKnow: () => void
) => {
  // If it's tutorial 3 or tutorial 5, we don't allow swiping horizontally
  if (cardId === "tutorial3" || cardId === "tutorial5") return;
  if (stuff) {
    if (cardId === "tutorial1" || cardId === "tutorial2") {
      // If it's tutorial 1 or tutorial 2, only moving right
      if (detail.deltaX > 0) {
        stuff.style.transform = `translateX(${detail.deltaX}px) rotate(${
          detail.deltaX / 20
        }deg)`;
        // Calling the function to show horizontal indicators
        showHorizontalInd(
          detail,
          handleNegativeOpacity,
          handlePositiveOpacity,
          handleAnimateKnow,
          handleAnimateDontKnow
        );
      }
    } else if (cardId === "tutorial4") {
      // if it's tutorial 4, only moving left
      if (detail.deltaX < 0) {
        stuff.style.transform = `translateX(${detail.deltaX}px) rotate(${
          detail.deltaX / 20
        }deg)`;
        // Calling the function to show horizontal indicators
        showHorizontalInd(
          detail,
          handleNegativeOpacity,
          handlePositiveOpacity,
          handleAnimateKnow,
          handleAnimateDontKnow
        );
      }
    } else {
      // Regular card swiping left right
      stuff.style.transform = `translateX(${detail.deltaX}px) rotate(${
        detail.deltaX / 20
      }deg)`;
      // Calling the function to show horizontal indicators
      showHorizontalInd(
        detail,
        handleNegativeOpacity,
        handlePositiveOpacity,
        handleAnimateKnow,
        handleAnimateDontKnow
      );
    }
  }
};

// Horizontal Swipe End Function Determination
const HorizontalEnd = (
  cardId: string,
  detail: GestureDetail,
  stuff: HTMLInputElement | null,
  handleShowNothing: () => void,
  knowTimeOut: () => void,
  dontKnowTimeOut: () => void,
  handleNoAnimation: () => void
) => {
  // If it's tutorial 3 or 5, we return
  if (cardId === "tutorial3" || cardId === "tutorial5") return;
  if (stuff) {
    const windowWidth: number = window.innerWidth;
    stuff.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Swiping Right Quick Enough (Know Card)
    if (detail.velocityX > 0.3 && cardId !== "tutorial4") {
      stuff.style.transform = `translateX(${windowWidth * 1.5}px)`;
      setTimeout(knowTimeOut, 100);
    }
    // Swiping Right more than half of window length. Move Card to Right (Know)
    else if (detail.deltaX > windowWidth / 3 && cardId !== "tutorial4") {
      stuff.style.transform = `translateX(${windowWidth * 1.5}px)`;
      setTimeout(knowTimeOut, 100);
    }
    // Swiping Left Quick Enough (Don't Know)
    else if (
      detail.velocityX < -0.3 &&
      cardId !== "tutorial1" &&
      cardId !== "tutorial2"
    ) {
      stuff.style.transform = `translateX(${windowWidth * -1.5}px)`;
      setTimeout(dontKnowTimeOut, 100);
    }
    // Swiping Left More than half of window length. Move Card to Left (Don't Know)
    else if (
      detail.deltaX < -windowWidth / 3 &&
      cardId !== "tutorial1" &&
      cardId !== "tutorial2"
    ) {
      stuff.style.transform = `translateX(${-windowWidth * 1.5}px)`;
      setTimeout(dontKnowTimeOut, 100);
    }
    // Not Swiping Enough. Reset the Card to its position
    else {
      stuff.style.transform = "";

      // Reset all indicators to have opacity 0
      handleShowNothing();
    }
    // Reset all animation boolean
    handleNoAnimation();
  }
};

// Function that shows the vertical indicators based on states
const showVerticalInd = (
  detail: GestureDetail,
  handleNoMoreOpacity: (detail: GestureDetail) => void,
  handleOneMoreOpacity: (detail: GestureDetail) => void,
  handleAnimatePoorCard: () => void,
  handleAnimateOneMore: () => void
) => {
  // Swiping Down for no more indicator and poor card button
  if (detail.deltaY > 0) {
    handleNoMoreOpacity(detail);
    handleAnimatePoorCard();
  }
  // Swiping up for one more indicator and one more button
  else {
    handleOneMoreOpacity(detail);
    handleAnimateOneMore();
  }
};

// Vertical Swiping Function
const VerticalMove = (
  cardId: string,
  detail: GestureDetail,
  card: HTMLInputElement | null,
  stuff: HTMLInputElement | null,
  isClicked: boolean,
  handleNoMoreOpacity: (detail: GestureDetail) => void,
  handleOneMoreOpacity: (detail: GestureDetail) => void,
  handleAnimatePoorCard: () => void,
  handleAnimateOneMore: () => void
) => {
  // If it's tutorial 1, 2, 4, we return
  if (
    cardId === "tutorial1" ||
    cardId === "tutorial2" ||
    cardId === "tutorial4"
  )
    return;
  if (stuff && card) {
    // Before Flipping. Move Down the Whole Tuple
    if (!isClicked) {
      if (
        detail.deltaY > 0 &&
        cardId !== "tutorial3" &&
        cardId !== "tutorial5"
      ) {
        stuff.style.transform = `translateY(${detail.deltaY}px) rotate(${
          detail.deltaY / 90
        }deg)`;
        showVerticalInd(
          detail,
          handleNoMoreOpacity,
          handleOneMoreOpacity,
          handleAnimatePoorCard,
          handleAnimateOneMore
        );
      }
    }
    // After Flipping
    else {
      // Moving Down will move the whole Tuple
      if (detail.deltaY > 0 && cardId !== "tutorial3") {
        stuff.style.transform = `translateY(${detail.deltaY}px) rotate(${
          detail.deltaY / 90
        }deg)`;
        showVerticalInd(
          detail,
          handleNoMoreOpacity,
          handleOneMoreOpacity,
          handleAnimatePoorCard,
          handleAnimateOneMore
        );
      }
      // Moving Up will only move the top card
      else if (detail.deltaY < 0 && cardId !== "tutorial5") {
        stuff.style.transform = "";
        card.style.transform = `translateY(${detail.deltaY}px) rotate(${
          detail.deltaY / 90
        }deg)`;
        showVerticalInd(
          detail,
          handleNoMoreOpacity,
          handleOneMoreOpacity,
          handleAnimatePoorCard,
          handleAnimateOneMore
        );
      }
    }
  }
};

// Vertical Swipe End Function Determination
const VerticalEnd = (
  cardId: string,
  detail: GestureDetail,
  card: HTMLInputElement | null,
  stuff: HTMLInputElement | null,
  isClicked: boolean,
  handleShowNothing: () => void,
  poorCardBeforeTimeOut: () => void,
  poorCardAfterTimeOut: () => void,
  oneMoreTimeOut: () => void,
  handleNoAnimation: () => void
) => {
  // If it's tutorial 1, 2, 4, we return
  if (
    cardId === "tutorial1" ||
    cardId === "tutorial2" ||
    cardId === "tutorial4"
  )
    return;
  if (stuff && card) {
    const windowHeight: number = window.innerHeight;
    stuff.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    card.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Before clicking
    if (!isClicked) {
      // Swipe Down fast, clear the tuple (Poor Card)
      if (
        detail.velocityY > 0.3 &&
        cardId !== "tutorial3" &&
        cardId !== "tutorial5"
      ) {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(poorCardBeforeTimeOut, 100);
      }
      // Swipe Down enough, clear the tuple (Poor Card)
      else if (
        detail.deltaY > windowHeight / 4 &&
        cardId !== "tutorial3" &&
        cardId !== "tutorial5"
      ) {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(poorCardBeforeTimeOut, 100);
      }
      // Reset the tuple
      else {
        stuff.style.transform = "";
        handleShowNothing();
      }
    }
    // After clicking
    else {
      // Swipe Up fast, clear the top card (One More)
      if (detail.velocityY < -0.3 && cardId !== "tutorial5") {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(oneMoreTimeOut, 100);

        // Set the position of the card back
        stuff.style.transform = "";
      }
      // Swipe Up enough, clear the top card (One More)
      else if (detail.deltaY < -windowHeight / 4 && cardId !== "tutorial5") {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(oneMoreTimeOut, 100);

        // Set position of the card back
        stuff.style.transform = "";
      }
      //  Swipe down fast, clear the tuple (Poor Card)
      else if (detail.velocityY > 0.3 && cardId !== "tutorial3") {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(poorCardAfterTimeOut, 100);
      }
      // Swipe down enough, clear the tuple (Poor Card)
      else if (detail.deltaY > windowHeight / 4 && cardId !== "tutorial3") {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(poorCardAfterTimeOut, 100);
      }
      // Reset
      else {
        card.style.transform = "";
        stuff.style.transform = "";
        handleShowNothing();
      }
    }
    // Always reset animation no matter what
    handleNoAnimation();
  }
};

// Function that manages the gesture
export const enableGesture = (
  cardId: string,
  card: HTMLInputElement | null,
  stuff: HTMLInputElement | null,
  isClicked: boolean,
  handleNegativeOpacity: (detail: GestureDetail) => void,
  handlePositiveOpacity: (detail: GestureDetail) => void,
  handleNoMoreOpacity: (detail: GestureDetail) => void,
  handleOneMoreOpacity: (detail: GestureDetail) => void,
  handleShowNothing: () => void,
  knowTimeOut: () => void,
  dontKnowTimeOut: () => void,
  poorCardBeforeTimeOut: () => void,
  poorCardAfterTimeOut: () => void,
  oneMoreTimeOut: () => void,
  handleAnimateKnow: () => void,
  handleAniamteDontKnow: () => void,
  handleAnimatePoorCard: () => void,
  handleAnimateOneMore: () => void,
  handleNoAnimation: () => void
) => {
  if (stuff && card) {
    // Horizontal Direction Swiping
    const gestureX: Gesture = createGesture({
      el: card,
      gestureName: "swipe-x",
      direction: "x",
      onMove: (detail) =>
        HorizontalMove(
          cardId,
          detail,
          stuff,
          handleNegativeOpacity,
          handlePositiveOpacity,
          handleAnimateKnow,
          handleAniamteDontKnow
        ),
      onEnd: (detail) =>
        HorizontalEnd(
          cardId,
          detail,
          stuff,
          handleShowNothing,
          knowTimeOut,
          dontKnowTimeOut,
          handleNoAnimation
        ),
    });

    // Veritical Direction Swiping
    const gestureY: Gesture = createGesture({
      el: card,
      gestureName: "swipe-y",
      direction: "y",
      onMove: (detail) =>
        VerticalMove(
          cardId,
          detail,
          card,
          stuff,
          isClicked,
          handleNoMoreOpacity,
          handleOneMoreOpacity,
          handleAnimatePoorCard,
          handleAnimateOneMore
        ),
      onEnd: (detail) =>
        VerticalEnd(
          cardId,
          detail,
          card,
          stuff,
          isClicked,
          handleShowNothing,
          poorCardBeforeTimeOut,
          poorCardAfterTimeOut,
          oneMoreTimeOut,
          handleNoAnimation
        ),
    });

    // Vertical Swiping is always Enabled
    gestureY.enable(true);

    // Horizontal Swiping is enabled only after tapping/clicking a choice
    gestureX.enable(isClicked);
  }
};
