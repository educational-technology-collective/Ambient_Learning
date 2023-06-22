import React, { useEffect, useRef, useState } from "react";
import { IonCard, IonCardContent, IonText, createGesture } from "@ionic/react";
import "./QACard.css";
import "../components/Indicators";
import FrontIndicator from "../components/FrontIndicator";
import BackIndicator from "../components/BackIndicator";

const QACard: React.FC<{
  obj: flashCard;
  tupleIndex: number;
  moveOn: (tupleIndex: number) => void;
  oneMore: (tupleIndex: number) => void;
  refTuple: React.RefObject<HTMLInputElement>;
}> = ({ obj, tupleIndex, moveOn, oneMore, refTuple }) => {
  const [isClicked, setIsClicked] = useState(false);
  const style = isClicked
    ? { transform: "rotateY(180deg)", background: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };
  const clickHandler = () => {
    setIsClicked(!isClicked);
  };
  const question = obj.content.question;
  const answer = obj.content.answer;

  // Function that times out for swiping
  const timeOutFunc = () => {
    moveOn(tupleIndex);
  };

  // Funcion that times out for One More Swiping
  const oneMoreTimeOut = () => {
    oneMore(tupleIndex);
  };

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initGesture();
  });

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
      setPosOp(detail.deltaX / 100);
    }
    // Swiping Left. Indicate Negative
    else {
      setPosOp(0);
      setNegOp(-detail.deltaX / 100);
    }
  };

  // Horizontal Swiping Function
  const HorizontalMove = (detail: any, stuff: any) => {
    // Set the Rotation as Swiping Cards Horizontally
    // Move the whole tuple
    stuff.style.transform = `translateX(${detail.deltaX}px) rotate(${
      detail.deltaX / 20
    }deg)`;

    // Setting the Indicators' opacity based on the Direction
    showHorizontalInd(detail);
  };

  // Horizontal Swipe End Function Determination
  const HorizontalEnd = (detail: any, stuff: any) => {
    const windowWidth = window.innerWidth;
    stuff.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Swipe Right fast
    if (detail.velocityX > 0.3) {
      stuff.style.transform = `translateX(${windowWidth * 1.5}px)`;
      setTimeout(timeOutFunc, 100);
    }
    // Swiping Right more than half of window length. Move Card to Right
    else if (detail.deltaX > windowWidth / 3) {
      stuff.style.transform = `translateX(${windowWidth * 1.5}px)`;
      setTimeout(timeOutFunc, 100);
    }
    // Swipe Left fast
    else if (detail.velocityX < -0.3) {
      stuff.style.transform = `translateX(${windowWidth * -1.5}px)`;
      setTimeout(timeOutFunc, 100);
    }
    // Swiping Left More than half of window length. Move Card to Left
    else if (detail.deltaX < -windowWidth / 3) {
      stuff.style.transform = `translateX(${windowWidth * -1.5}px)`;
      setTimeout(timeOutFunc, 100);
    }
    // Not Swiping Enough. Reset the Card to its position
    else {
      stuff.style.transform = "";
      setNegOp(0);
      setPosOp(0);
    }
  };

  // Function that shows OneMore and NoMore Indicators
  const showVerticalInd = (detail: any) => {
    // Swiping Down. Indicates No More This Card
    if (detail.deltaY > 0) {
      setOneMoreOp(0);
      setNoMoreOp(detail.deltaY / 100);
    }
    // Clicked and Swiping Up. Indicates One More Simmilar Card
    else if (isClicked && detail.deltaY < 0) {
      setNoMoreOp(0);
      setOneMoreOp(-detail.deltaY / 100);
    }
    // Not Clicked But Swiping Up. Reset NoMore Opacity
    else {
      setNoMoreOp(0);
    }
  };

  // Vertical Swiping onMove Function
  const VerticalMove = (detail: any, card: any, stuff: any) => {
    // Before Flipping. Move Down will move the whole tuple
    if (!isClicked) {
      stuff.style.transform = `translateY(${detail.deltaY}px) rotate(${
        detail.deltaY / 90
      }deg)`;
    }
    // After Flipping.
    else {
      // Move Down will move the whole tuple
      if (detail.deltaY > 0) {
        stuff.style.transform = `translateY(${detail.deltaY}px) rotate(${
          detail.deltaY / 90
        }deg)`;
      }
      // Move up will move the top card
      else {
        stuff.style.transform = "";
        card.style.transform = `translateY(${detail.deltaY}px) rotate(${
          detail.deltaY / 90
        }deg)`;
      }
    }
    showVerticalInd(detail);
  };

  // Vertical Swiping onEnd Function
  const VerticalEnd = (detail: any, card: any, stuff: any) => {
    const windowHeight = window.innerHeight;
    stuff.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    card.style.transition = "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    // Before clicking
    if (!isClicked) {
      // Swipe Down fast, move the whole tuple
      if (detail.velocityY > 0.3) {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Swipe Down enough, move the whole tuple
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
      // Swipe Up fast, move the top card
      if (detail.velocityY < -0.3) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(oneMoreTimeOut, 100);

        // Set all the style/className/isClicked back

        stuff.style.transform = "";

        setIsClicked(false);
      }
      // Swipe Up enough, move the top card
      else if (detail.deltaY < -windowHeight / 4) {
        card.style.transform = `translateY(${windowHeight * -1.5}px)`;
        setTimeout(oneMoreTimeOut, 100);

        // Set all the style/className/isClicked back
        stuff.style.trasnform = "";

        setIsClicked(false);
      }
      // Swipe down fast, move the whole tuple
      else if (detail.velocityY > 0.3) {
        stuff.style.transform = `translateY(${windowHeight * 1.5}px)`;
        setTimeout(timeOutFunc, 100);
      }
      // Swipe down enough, mvoe the whole tuple
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

  // Gesture Management
  const initGesture = () => {
    const card = ref.current;
    const stuff = refTuple.current;
    if (stuff && card) {
      const gestureX = createGesture({
        el: card,
        direction: "x",
        gestureName: "swipe-x",
        onMove: (detail) => HorizontalMove(detail, stuff),
        onEnd: (detail) => HorizontalEnd(detail, stuff),
      });

      const gestureY = createGesture({
        el: card,
        direction: "y",
        gestureName: "swipe-y",
        onMove: (detail) => VerticalMove(detail, card, stuff),
        onEnd: (detail) => VerticalEnd(detail, card, stuff),
      });

      gestureY.enable(true);
      gestureX.enable(isClicked);
    }
  };

  return (
    <div className="qacard-wrapper" ref={ref}>
      <IonCard
        button
        className="qacard-container"
        onClick={clickHandler}
        disabled={isClicked}
      >
        {/* Flipper Parent */}
        <IonCardContent className="qacard-content" style={style}>
          {/* Indicators For the Front Page */}
          <FrontIndicator nomoreOpacity={nomoreOpacity} />

          {/* Front QuestionText */}
          <IonText className="qaquestion-text">{question}</IonText>

          {/* Back AnswerText */}
          <IonText className="qabackquestion-text">{question}</IonText>
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
