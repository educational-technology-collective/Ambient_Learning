import React, { useState } from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import "./QACard.css";

const QACard: React.FC<{ content: { question: string; answer: string } }> = (
  props
) => {
  const [isClicked, setIsClicked] = useState(false);

  const style = isClicked
    ? { transform: "rotateY(180deg)", backgroundColor: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };
  const clickHandler = () => {
    setIsClicked(!isClicked);
  };
  const question = props.content.question;
  const answer = props.content.answer;
  return (
    <IonCard
      button
      className="card-container"
      style={{ height: "60%", display: "flex" }}
      onClick={clickHandler}
    >
      <IonCardContent class="card-content" style={style}>
        <IonText class="question-text">{question}</IonText>
        <IonText class="answer-text">{answer}</IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default QACard;
