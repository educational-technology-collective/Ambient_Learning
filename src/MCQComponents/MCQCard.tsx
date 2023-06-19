import { IonCard, IonText, IonCardContent, createGesture } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import "./MCQCard.css";
import Choices from "./Choices";
import FrontMCQIndicator from "../components/FrontMCQIndicator";

const MCQCard: React.FC<{ obj: flashCard; moveOn: (id: number) => void }> = ({
  obj,
  moveOn,
}) => {
  const question = obj.content.question;
  const choices = obj.content.answer;

  const ref = useRef<HTMLInputElement>(null);

  const [isClicked, setIsClicked] = useState(false);
  const style = isClicked
    ? { transform: "rotateY(360deg)", background: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };
  const clickHandler = () => {
    setIsClicked(!isClicked);
    setClick(true);
    setCorrect(true);
  };

  const [clicked, setClick] = useState(false);

  // Function that goes to next card after some time
  const timeOutFunc = () => {
    moveOn(obj.index);
  };

  // Allows Gesture only after user clicks an option
  useEffect(() => {
    enableGesture();
  }, [clicked]);

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
  const HorizontalMove = (detail: any, card: any) => {
    card.style.transform = `translateX(${detail.deltaX}px) rotate(${
      detail.deltaX / 20
    }deg)`;
    showHorizontalInd(detail);
  };

  // Horizontal Swipe End Function Determination
  const HorizontalEnd = (detail: any, card: any) => {
    const windowWidth = window.innerWidth;
    card.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Swiping Right Quick Enough
    if (detail.velocityX > 0.3) {
      card.style.transform = `translateX(${windowWidth * 1.5}px)`;
      setTimeout(timeOutFunc, 100);
    }
    // Swiping Right more than half of window length. Move Card to Right
    else if (detail.deltaX > windowWidth / 3) {
      card.style.transform = `translateX(${windowWidth * 1.5}px)`;
      setTimeout(timeOutFunc, 100);
    }
    // Swiping Left Quick Enough
    else if (detail.velocityX < -0.3) {
      card.style.transform = `translateX(${windowWidth * -1.5}px)`;
      setTimeout(timeOutFunc, 100);
    }
    // Swiping Left More than half of window length. Move Card to Left
    else if (detail.deltaX < -windowWidth / 3) {
      card.style.transform = `translateX(${-windowWidth * 1.5}px)`;
      setTimeout(timeOutFunc, 100);
    }
    // Not Swiping Enough. Reset the Card to its position
    else {
      card.style.transform = "";
      setNegOp(0);
      setPosOp(0);
    }
  };

  // Function that shows the vertical indicators based on states
  const showVerticalInd = (detail: any) => {
    // Before Clicking
    if (!clicked) {
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
  const VerticalMove = (detail: any, card: any) => {
    card.style.transform = `translateY(${detail.deltaY}px) rotate(${
      detail.deltaY / 90
    }deg)`;
    showVerticalInd(detail);
  };

  // Vertical Swipe End Function Determination
  const VerticalEnd = (detail: any, card: any) => {
    const windowHeight = window.innerHeight;
    card.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Before clicking
    if (!clicked) {
      // Swipe Down fast
      if (detail.velocityY > 0.3) {
        card.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Swipe Down enough
      else if (detail.deltaY > windowHeight / 4) {
        card.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Reset
      else {
        card.style.transform = "";
        setNoMoreOp(0);
        setOneMoreOp(0);
      }
    }
    // After clicking
    else {
      // Swipe Up fast
      if (detail.velocityY < -0.3) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Swipe Up enough
      else if (detail.deltaY < -windowHeight / 4) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      //  Swipe down fast
      else if (detail.velocityY > 0.3) {
        card.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Swipe down enough
      else if (detail.deltaY > windowHeight / 4) {
        card.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Reset
      else {
        card.style.transform = "";
        setNoMoreOp(0);
        setOneMoreOp(0);
      }
    }
  };

  const enableGesture = () => {
    const card = ref.current;
    if (card) {
      const gestureX = createGesture({
        el: card,
        gestureName: "swipe-mcq-x",
        direction: "x",
        onMove: (detail) => HorizontalMove(detail, card),
        onEnd: (detail) => HorizontalEnd(detail, card),
      });
      const gestureY = createGesture({
        el: card,
        gestureName: "swipe-mcq-y",
        direction: "y",
        onMove: (detail) => VerticalMove(detail, card),
        onEnd: (detail) => VerticalEnd(detail, card),
      });
      gestureY.enable();
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
          <FrontMCQIndicator
            negativeOpacity={negativeOpacity}
            positiveOpacity={positiveOpacity}
            onemoreOpacity={onemoreOpacity}
            nomoreOpacity={nomoreOpacity}
          />
          <IonText className="mcqquestion-text">{question}</IonText>
          <Choices
            answer={choices}
            setClickStatus={setClickStatus}
            clicked={clicked}
            setCorrectStatus={setCorrectStatus}
          />
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default MCQCard;
