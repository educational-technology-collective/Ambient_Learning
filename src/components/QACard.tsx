import React, { useEffect, useRef, useState } from "react";
import { IonCard, IonCardContent, IonText, createGesture } from "@ionic/react";
import "./QACard.css";

const QACard: React.FC<{ obj: flashCard}> = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const style = isClicked
    ? { transform: "rotateY(180deg)", backgroundColor: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };
  const clickHandler = () => {
    setIsClicked(!isClicked);
  };
  const question = props.obj.content.question;
  const answer = props.obj.content.answer;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initGesture();
  }, []);

  const initGesture = () => {
    const card = ref.current;
    if (card) {
      const gestureX = createGesture({
        el: card,
        direction: "x",
        gestureName: "swipe-x",
        onMove: (detail) => {
          card.style.transform = `translateX(${detail.deltaX}px) rotate(${
            detail.deltaX / 20
          }deg)`;
        },
        onEnd: (detail) => {
          const windowWidth = window.innerWidth;
          card.style.transition =
            "0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          if (detail.deltaX > windowWidth / 2) {
            card.style.transform = `translateX(${windowWidth * 1.5}px)`;
            // props.moveCard();
            
            // card.style.transition =
            // "0s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            // card.style.transform = `translateX(${0}px)`;
          } else if (detail.deltaX < -windowWidth / 2) {
           card.style.transform = `translateX(${-windowWidth * 1.5}px)`;
           
          } else {
            card.style.transform = "";
          }
        },
      });

      const gestureY = createGesture({
        el: card,
        direction: "y",
        gestureName: "swipe-y",
        onMove: (detail) => {
          card.style.transform = `translateY(${detail.deltaY}px)`;
        },

        onEnd: (detail) => {
          const windowHeight = window.innerHeight;
          card.style.transition =
            "0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          if (detail.deltaY > windowHeight / 4) {
            card.style.transform = `translateY(${windowHeight * 1.5}px)`;
          } else if (detail.deltaY < -windowHeight / 4) {
            card.style.transform = `translateY(${-windowHeight * 1.5}px)`;
          } else {
            card.style.transform = "";
          }
        },
      });

      gestureY.enable(true);
      gestureX.enable(true);
    }
  };

  return (
    <div className="card-wrapper" ref={ref}>
      <IonCard
        button
        className="card-container"
        style={{ height: "100%", display: "flex" }}
        onClick={clickHandler}
      >
        <IonCardContent class="card-content" style={style}>
          <IonText class="question-text">{question}</IonText>
          <IonText class="answer-text">{answer}</IonText>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default QACard;
