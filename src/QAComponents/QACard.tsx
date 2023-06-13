import React, { useEffect, useRef, useState } from "react";
import { IonCard, IonCardContent, IonText, createGesture } from "@ionic/react";
import "./QACard.css";
import "../components/Indicators";
import FrontIndicator from "../components/FrontIndicator";
import BackIndicator from "../components/BackIndicator";

const QACard: React.FC<{ obj: flashCard }> = ({ obj }) => {
  const [isClicked, setIsClicked] = useState(false);
  const style = isClicked
    ? { transform: "rotateY(180deg)", background: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };
  const clickHandler = () => {
    setIsClicked(!isClicked);
  };
  const question = obj.content.question;
  const answer = obj.content.answer;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initGesture();
  }, []);


  // Opacity State Variables
  const [negativeOpacity, setNegOp] = useState(0);
  const [positiveOpacity, setPosOp] = useState(0);
  const [onemoreOpacity, setOneMoreOp] = useState(0);
  const [nomoreOpacity, setNoMoreOp] = useState(0);

  // Function that Shows Positive and Negative Indicators
  const showHorizontalInd = (detail: any) => {
    // Swiping Right. Indicates Positive
    if (detail.deltaX > 0) {
      setNegOp(0);
      setPosOp(detail.deltaX / 180);
    }
    // Swiping Left. Indicate Negative
    else {
      setPosOp(0);
      setNegOp(-detail.deltaX / 180);
    }
  };

  // Horizontal Swiping Function
  const HorizontalMove = (detail: any, card: any) => {

    // Set the Rotation as Swiping Cards Horizontally
    card.style.transform = `translateX(${detail.deltaX}px) rotate(${
      detail.deltaX / 20
    }deg)`;

    // Setting the Indicators' opacity based on the Direction
    showHorizontalInd(detail);
  };

  // Horizontal Swipe End Function Determination
  const HorizontalEnd = (detail: any, card: any) => {
    const windowWidth = window.innerWidth;
    card.style.transition = "0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Swiping Right more than half of window length. Move Card to Right
    if (detail.deltaX > windowWidth / 3) {
      card.style.transform = `translateX(${windowWidth * 1.5}px)`;
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

  // Function that shows OneMore and NoMore Indicators
  const showVerticalInd = (detail: any) => {
    // Swiping Down. Indicates No More This Card
    if (detail.deltaY > 0) {
      setOneMoreOp(0);
      setNoMoreOp(detail.deltaY / 180);
    }
    // Swiping Up. Indicates One More Simmilar Card
    else {
      setNoMoreOp(0);
      setOneMoreOp(-detail.deltaY / 180);
    }
  };

  // Vertical Swiping onMove Function
  const VerticalMove = (detail: any, card: any) => {
    card.style.transform = `translateY(${detail.deltaY}px)`;

    // Set Vertical Indicators
    showVerticalInd(detail);
  };

  // Vertical Swiping onEnd Function
  const VerticalEnd = (detail: any, card: any) => {
    const windowHeight = window.innerHeight;
    card.style.transition = "0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Swipe the card Down more than 1/5 of the window height. Move Card Down
    if (detail.deltaY > windowHeight / 5) {
      card.style.transform = `translateY(${windowHeight * 1.5}px)`;
    }
    // Swipe the Card Up more than 1/5 of the window height. Move Card Up
    else if (detail.deltaY < -windowHeight / 5) {
      card.style.transform = `translateY(${-windowHeight * 1.5}px)`;
    }
    // Not Swiping Enough. Reset Card to its original Position with 0 opacity
    else {
      card.style.transform = "";
      setNoMoreOp(0);
      setOneMoreOp(0);
    }
  };

  // Gesture Management
  const initGesture = () => {
    const card = ref.current;

    if (card) {
      const gestureX = createGesture({
        el: card,
        direction: "x",
        gestureName: "swipe-x",
        onMove: (detail) => HorizontalMove(detail, card),
        onEnd: (detail) => HorizontalEnd(detail, card),
      });

      const gestureY = createGesture({
        el: card,
        direction: "y",
        gestureName: "swipe-y",
        onMove: (detail) => VerticalMove(detail, card),

        onEnd: (detail) => VerticalEnd(detail, card),
      });

      gestureY.enable(true);
      gestureX.enable(true);
    }
  };

  return (
    <div className="qacard-wrapper" ref={ref}>
      <IonCard button className="qacard-container" onClick={clickHandler}>
        {/* Flipper Parent */}
        <IonCardContent className="qacard-content" style={style}>
          {/* Indicators For the Front Page */}
          <FrontIndicator
            negativeOpacity={negativeOpacity}
            positiveOpacity={positiveOpacity}
            onemoreOpacity={onemoreOpacity}
            nomoreOpacity={nomoreOpacity}
          />

          {/* Front QuestionText */}
          <IonText className="qaquestion-text">{question}</IonText>

          {/* Back AnswerText */}
          <IonText className="qaanswer-text">{answer}</IonText>

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

export default QACard;
