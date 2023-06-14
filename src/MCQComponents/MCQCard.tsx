import { IonCard, IonText, IonCardContent, createGesture } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import "./MCQCard.css";
import Choices from "./Choices";
import FrontIndicator from "../components/FrontIndicator";

const MCQCard: React.FC<{ obj: flashCard }> = ({ obj }) => {
  const question = obj.content.question;
  const choices = obj.content.answer;

  const ref = useRef<HTMLInputElement>(null);

  const [clicked, setClick] = useState(false);

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
    card.style.transition = "0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Swiping Right Quick Enough
    if (detail.velocityX > 0.25) {
      card.style.transform = `translateX(${windowWidth * 1.5}px)`;
    }
    // Swiping Right more than half of window length. Move Card to Right
    else if (detail.deltaX > windowWidth / 3) {
      card.style.transform = `translateX(${windowWidth * 1.5}px)`;
    }
    // Swiping Left Quick Enough
    else if (detail.velocityX < -0.25) {
      card.style.transform = `translateX(${windowWidth * -1.5}px)`;
    }
    // Swiping Left More than half of window length. Move Card to Left
    else if (detail.deltaX < -windowWidth / 3) {
      card.style.transform = `translateX(${-windowWidth * 1.5}px)`;
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
        if (correct) {
          setNoMoreOp(detail.deltaY / 100);
        }
      }
    }
  };

  // Vertical Swiping Function
  const VerticalMove = (detail: any, card: any) => {
    card.style.transform = `translateY(${detail.deltaY}px)`;
    showVerticalInd(detail);
  };

  // Vertical Swipe End Function Determination
  const VerticalEnd = (detail: any, card: any) => {
    const windowHeight = window.innerHeight;
    card.style.transition = "0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Before clicking
    if (!clicked) {
      // Swipe Down fast
      if (detail.velocityY > 0.25) {
        card.style.transform = `translateY(${windowHeight * 1.5}px)`;
      }
      // Swipe Down enough
      else if (detail.deltaY > windowHeight / 5) {
        card.style.transform = `translateY(${windowHeight * 1.5}px)`;
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
      if (detail.velocityY < -0.25) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
      }
      // Swipe Up enough
      else if (detail.deltaY < -windowHeight / 5) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
      }
      // Correct and Swipe down fast
      else if (correct && detail.velocityY > 0.25) {
        card.style.transform = `translateY(${windowHeight * 1.5}px)`;
      }
      // Correct and Swipe down enough
      else if (correct && detail.deltaY > windowHeight / 5) {
        card.style.transform = `translateY(${windowHeight * 1.5}px)`;
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
      gestureX.enable();
    }
  };

  return (
    <div className="mcqcard-wrapper" ref={ref}>
      <IonCard className="mcqcard-container">
        <IonCardContent className="mcqcard-content">
          <FrontIndicator
            negativeOpacity={negativeOpacity}
            positiveOpacity={positiveOpacity}
            onemoreOpacity={onemoreOpacity}
            nomoreOpacity={nomoreOpacity}
          />
          <IonText className="mcqquestion-text">{question}</IonText>
        </IonCardContent>
        <Choices
          answer={choices}
          setClickStatus={setClickStatus}
          clicked={clicked}
          setCorrectStatus={setCorrectStatus}
        />
      </IonCard>
    </div>
  );
};

export default MCQCard;
