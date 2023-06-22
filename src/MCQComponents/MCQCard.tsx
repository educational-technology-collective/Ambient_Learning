import { IonCard, IonText, IonCardContent, createGesture } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import "./MCQCard.css";
import Choices from "./Choices";
import FrontIndicator from "../components/FrontIndicator";
import BackIndicator from "../components/BackIndicator";

const MCQCard: React.FC<{
  obj: flashCard;
  tupleIndex: number;
  moveOn: (tupleIndex: number) => void;
  oneMore: (tupleIndex: number) => void;
  refTuple: React.RefObject<HTMLInputElement>;
}> = ({ obj, tupleIndex, moveOn, oneMore, refTuple }) => {
  const question = obj.content.question;
  const choices = obj.content.answer;

  const ref = useRef<HTMLInputElement>(null);

  // This isClicked is for the tap of the card
  const [isClicked, setIsClicked] = useState(false);

  // Transform with 360 degree flipping
  const style = isClicked
    ? { transform: "rotateY(180deg)", background: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };

  // Callback for the tap of card
  const clickHandler = () => {
    setIsClicked(!isClicked);
    setClick(true);
    setCorrect(true);
  };

  const [clicked, setClick] = useState(false);

  // Function for one more swipe time out
  const oneMoreTimeOut = () => {
    oneMore(tupleIndex);
  };

  // Function that goes to next card after some time
  const timeOutFunc = () => {
    moveOn(tupleIndex);
  };

  // Allows Gesture only after user clicks an option
  useEffect(() => {
    enableGesture();
  });

  const setClickStatus = () => {
    setClick(true);
  };

  // If the user answers correctly
  const [correct, setCorrect] = useState(false);

  const setCorrectStatus = () => {
    setCorrect(true);
  };

  // Opacity State Variables
  const [negativeOpacity, setNegOp] = useState(0);
  const [positiveOpacity, setPosOp] = useState(0);
  const [onemoreOpacity, setOneMoreOp] = useState(0);
  const [nomoreOpacity, setNoMoreOp] = useState(0);

  // Function that Present Horizontal Indicators through opacity change
  const showHorizontalInd = (detail: any) => {
    // Swipe Right
    if (detail.deltaX > 0) {
      setNegOp(0);
      setPosOp(detail.deltaX / 100);
    }
    // Swipe Left
    else {
      setPosOp(0);
      setNegOp(-detail.deltaX / 100);
    }
  };

  // Horizontal Swiping Function
  const HorizontalMove = (detail: any, stuff: any) => {
    stuff.style.transform = `translateX(${detail.deltaX}px) rotate(${
      detail.deltaX / 20
    }deg)`;
    showHorizontalInd(detail);
  };

  // Horizontal Swipe End Function Determination
  const HorizontalEnd = (detail: any, stuff: any) => {
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
      setNegOp(0);
      setPosOp(0);
    }
  };

  // Function that shows the vertical indicators based on states
  const showVerticalInd = (detail: any) => {
    // Before Clicking
    if (!isClicked) {
      // Swipe Down to Show No More Card
      if (detail.deltaY > 0) {
        setOneMoreOp(0);
        setNoMoreOp(detail.deltaY / 100);
      }
      // Swipe Up will show nothing
      else {
        setNoMoreOp(0);
        setOneMoreOp(0);
      }
    }
    // After Clicking
    else {
      // Swipe Up will show One More Card
      if (detail.deltaY < 0) {
        setNoMoreOp(0);
        setOneMoreOp(-detail.deltaY / 100);
      }
      // Swipe Down will show no more card only if correct
      else {
        setOneMoreOp(0);
        setNoMoreOp(detail.deltaY / 100);
      }
    }
  };

  // Vertical Swiping Function
  const VerticalMove = (detail: any, card: any, stuff: any) => {
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
    showVerticalInd(detail);
  };

  // Vertical Swipe End Function Determination
  const VerticalEnd = (detail: any, card: any, stuff: any) => {
    const windowHeight = window.innerHeight;
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
        setNoMoreOp(0);
        setOneMoreOp(0);
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

        setClick(false);
        setIsClicked(false);
      }
      // Swipe Up enough, clear the top card
      else if (detail.deltaY < -windowHeight / 4) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(oneMoreTimeOut, 100);

        // Set all the style/className/isClicked back
        stuff.style.transform = "";

        setClick(false);
        setIsClicked(false);
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
        setNoMoreOp(0);
        setOneMoreOp(0);
      }
    }
  };

  const enableGesture = () => {
    const card = ref.current;
    const stuff = refTuple.current;
    if (stuff && card) {
      const gestureX = createGesture({
        el: card,
        gestureName: "swipe-mcq-x",
        direction: "x",
        onMove: (detail) => HorizontalMove(detail, stuff),
        onEnd: (detail) => HorizontalEnd(detail, stuff),
      });

      const gestureY = createGesture({
        el: card,
        gestureName: "swipe-mcq-y",
        direction: "y",
        onMove: (detail) => VerticalMove(detail, card, stuff),
        onEnd: (detail) => VerticalEnd(detail, card, stuff),
      });

      gestureY.enable(true);
      gestureX.enable(clicked);
    }
  };

  return (
    <div className="mcqcard-wrapper" ref={ref}>
      <IonCard
        className="mcqcard-container"
        onClick={clickHandler}
        disabled={clicked}
      >
        <IonCardContent className="mcqcard-content" style={style}>
          {/* Front Indicator */}
          <FrontIndicator nomoreOpacity={nomoreOpacity} />

          {/* Change text and choice front/back based on whether clicked */}
          <IonText
            className={!clicked ? "mcqquestion-text" : "mcqquestion-text-back"}
          >
            {question}
          </IonText>
          <Choices
            answer={choices}
            setClickStatus={setClickStatus}
            clicked={clicked}
            setCorrectStatus={setCorrectStatus}
          />

          {/* Indicators For the Back Page */}
          <BackIndicator
            negativeOpacity={negativeOpacity}
            positiveOpacity={positiveOpacity}
            onemoreOpacity={onemoreOpacity}
            nomoreOpacity={nomoreOpacity}
          />
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default MCQCard;
