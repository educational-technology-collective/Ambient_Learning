import React, { useEffect, useRef, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonText,
  createGesture,
  IonItem,
  IonIcon,
} from "@ionic/react";
import "./QACard.css";
import { sadOutline, happy, card, close } from "ionicons/icons";
const QACard: React.FC<{ obj: flashCard }> = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const style = isClicked
    ? { transform: "rotateY(180deg)", background: "rgba(251,255,236,1)" }
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

  const [negativeOpacity, setNegOp] = useState(0);
  const [positiveOpacity, setPosOp] = useState(0);
  const [onemoreOpacity, setOneMoreOp] = useState(0);
  const [nomoreOpacity, setNoMoreOp] = useState(0);

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
          if (detail.deltaX > 0) {
            setNegOp(0);
            setPosOp(detail.deltaX / 250);
          } else {
            setPosOp(0);
            setNegOp(-detail.deltaX / 250);
          }
        },
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
    <div className="card-wrapper" ref={ref}>
      <IonCard
        button
        className="card-container"
        style={{ height: "100%", display: "flex" }}
        onClick={clickHandler}
      >
        <IonCardContent class="card-content" style={style}>
          {/* //Front Negative */}
          <div
            className="front negative front-negative"
            style={{ opacity: negativeOpacity }}
          >
            <IonItem className="action-container negative-container">
              <IonText className="action-text negative-text">
                F O R G E T{" "}
              </IonText>
              <IonIcon
                icon={sadOutline}
                style={{ color: "#D63230", fontSize: "2em" }}
              ></IonIcon>
            </IonItem>
          </div>

          {/* Front Positive */}
          <div
            className="front positive front-positive"
            style={{ opacity: positiveOpacity }}
          >
            <IonItem className="action-container positive-container">
              <IonText className="action-text positive-text">K N O W</IonText>
              <IonIcon
                icon={happy}
                style={{ color: "#256D1B", fontSize: "2em" }}
              ></IonIcon>
            </IonItem>
          </div>

          {/* Front OneMore */}
          <div className="front onemore" style={{ opacity: onemoreOpacity }}>
            <IonItem className="action-container onemore-container">
              <IonText className="action-text onemore-text">ONE MORE</IonText>
              <IonIcon
                icon={card}
                style={{ color: "#7BB2D9", fontSize: "2em" }}
              ></IonIcon>
            </IonItem>
          </div>

          {/* Front Nomore */}
          <div className="front nomore" style={{ opacity: nomoreOpacity }}>
            <IonItem className="action-container nomore-container">
              <IonText className="action-text nomore-text">NO MORE</IonText>
              <IonIcon
                icon={close}
                style={{ color: "#E8871E", fontSize: "2em" }}
              ></IonIcon>
            </IonItem>
          </div>

          <IonText class="question-text">{question}</IonText>

          <IonText class="answer-text">{answer}</IonText>

          {/* Back Negative */}
          <div
            className="back negative back-negative"
            style={{ opacity: negativeOpacity }}
          >
            <IonItem className="action-container negative-container">
              <IonText className="action-text negative-text">
                F O R G E T{" "}
              </IonText>
              <IonIcon
                icon={sadOutline}
                style={{ color: "#D63230", fontSize: "2em" }}
              ></IonIcon>
            </IonItem>
          </div>

          {/* Back Positive */}
          <div
            className="back positive back-positive"
            style={{ opacity: positiveOpacity }}
          >
            <IonItem className="action-container positive-container">
              <IonText className="action-text positive-text">K N O W</IonText>
              <IonIcon
                icon={happy}
                style={{ color: "#256D1B", fontSize: "2em" }}
              ></IonIcon>
            </IonItem>
          </div>

          {/* Back OneMore */}
          <div className="back onemore" style={{ opacity: onemoreOpacity }}>
            <IonItem className="action-container onemore-container">
              <IonText className="action-text onemore-text">ONE MORE</IonText>
              <IonIcon
                icon={card}
                style={{ color: "#7BB2D9", fontSize: "2em" }}
              ></IonIcon>
            </IonItem>
          </div>

          {/* Back NoMore */}
          <div className="back nomore" style={{ opacity: nomoreOpacity }}>
            <IonItem className="action-container nomore-container">
              <IonText className="action-text nomore-text">NO MORE</IonText>
              <IonIcon
                icon={close}
                style={{ color: "#E8871E", fontSize: "2em" }}
              ></IonIcon>
            </IonItem>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default QACard;
