import React, { useEffect, useRef, useState } from "react";
import { IonCard, IonCardContent, IonText, createGesture } from "@ionic/react";
import "./QACard.css";
import "./Indicators";
import {
  BackNegativeIndicator,
  BackNoMoreIndicator,
  BackOneMoreIndicator,
  BackPositiveIndicator,
  FrontNegativeIndicator,
  FrontNoMoreIndicator,
  FrontOneMoreIndicator,
  FrontPositiveIndicator,
} from "./Indicators";
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

  const [negativeOpacity, setNegOp] = useState(0);
  const [positiveOpacity, setPosOp] = useState(0);
  const [onemoreOpacity, setOneMoreOp] = useState(0);
  const [nomoreOpacity, setNoMoreOp] = useState(0);

  const HorizontalMove = (detail: any, card: any) => {
    //Set the Rotation as Swiping Cards Horizontally
    card.style.transform = `translateX(${detail.deltaX}px) rotate(${
      detail.deltaX / 20
    }deg)`;

    //Setting the Indicators' opacity based on the Direction

    //Swiping Right. Indicates Positive
    if (detail.deltaX > 0) {
      setNegOp(0);
      setPosOp(detail.deltaX / 180);
    }
    //Swiping Left. Indicate Negative
    else {
      setPosOp(0);
      setNegOp(-detail.deltaX / 180);
    }
  };

  const initGesture = () => {
    const card = ref.current;

    if (card) {
      const gestureX = createGesture({
        el: card,
        direction: "x",
        gestureName: "swipe-x",
        onMove: (detail) => HorizontalMove(detail, card),
        onEnd: (detail) => {
          const windowWidth = window.innerWidth;
          card.style.transition =
            "0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          if (detail.deltaX > windowWidth / 2) {
            card.style.transform = `translateX(${windowWidth * 1.5}px)`;
          } else if (detail.deltaX < -windowWidth / 2) {
            card.style.transform = `translateX(${-windowWidth * 1.5}px)`;
          } else {
            card.style.transform = "";
            setNegOp(0);
            setPosOp(0);
          }
        },
      });

      const gestureY = createGesture({
        el: card,
        direction: "y",
        gestureName: "swipe-y",
        onMove: (detail) => {
          card.style.transform = `translateY(${detail.deltaY}px)`;
          if (detail.deltaY > 0) {
            setOneMoreOp(0);
            setNoMoreOp(detail.deltaY / 200);
          } else {
            setNoMoreOp(0);
            setOneMoreOp(-detail.deltaY / 200);
          }
        },

        onEnd: (detail) => {
          const windowHeight = window.innerHeight;
          card.style.transition =
            "0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          if (detail.deltaY > windowHeight / 5) {
            card.style.transform = `translateY(${windowHeight * 1.5}px)`;
          } else if (detail.deltaY < -windowHeight / 5) {
            card.style.transform = `translateY(${-windowHeight * 1.5}px)`;
          } else {
            card.style.transform = "";
            setNoMoreOp(0);
            setOneMoreOp(0);
          }
        },
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
          {/* //Front Negative */}
          <FrontNegativeIndicator negativeOpacity={negativeOpacity} />

          {/* Front Positive */}
          <FrontPositiveIndicator positiveOpacity={positiveOpacity} />

          {/* Front OneMore */}
          <FrontOneMoreIndicator onemoreOpacity={onemoreOpacity} />

          {/* Front Nomore */}
          <FrontNoMoreIndicator nomoreOpacity={nomoreOpacity} />

          {/* Front QuestionText */}
          <IonText className="qaquestion-text">{question}</IonText>

          {/* Back AnswerText */}
          <IonText className="qaanswer-text">{answer}</IonText>

          {/* Back Negative */}
          <BackNegativeIndicator negativeOpacity={negativeOpacity} />

          {/* Back Positive */}
          <BackPositiveIndicator positiveOpacity={positiveOpacity} />

          {/* Back OneMore */}
          <BackOneMoreIndicator onemoreOpacity={onemoreOpacity} />

          {/* Back NoMore */}
          <BackNoMoreIndicator nomoreOpacity={nomoreOpacity} />
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default QACard;
