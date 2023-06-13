import { IonButton, IonText } from "@ionic/react";
import { useState } from "react";
import "./MCQChoice.css";

// Incorrect Option Component
export const IncorrectChoice: React.FC<{
  option: string;
  clicked: boolean;
  setClickStatus: () => void;
}> = ({ option, clicked, setClickStatus }) => {
  const choiceText = option;

  const [isChosen, setChosen] = useState(false);

  // When the User Clicks Incorrect Option. We will highlight it red
  // and set correct one green
  const inCorrectClick = () => {
    setClickStatus();
    setChosen(true);
  };

  return (
    <IonButton
      className={isChosen ? "incorrect-button" : "initial-button"}
      disabled={clicked}
      onClick={inCorrectClick}
    >
      <IonText className={clicked && !isChosen ? "hide-text" : "choice-text"}>
        {choiceText}
      </IonText>
    </IonButton>
  );
};

// Correct Option Component
export const CorrectChoice: React.FC<{
  option: string;
  clicked: boolean;
  setClickStatus: () => void;
  setCorrectStatus: () => void;
}> = ({ option, clicked, setClickStatus, setCorrectStatus }) => {
  const choiceText = option;

  const correctClick = () => {
    setClickStatus();
    setCorrectStatus();
  };

  return (
    <IonButton
      className={clicked ? "correct-button" : "initial-button"}
      disabled={clicked}
      onClick={correctClick}
    >
      <IonText className="choice-text">{choiceText}</IonText>
    </IonButton>
  );
};
