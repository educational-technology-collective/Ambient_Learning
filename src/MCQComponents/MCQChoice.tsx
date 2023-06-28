import { IonButton, IonText } from "@ionic/react";
import { useState } from "react";
import "./MCQChoice.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

// Incorrect Option Component
export const IncorrectChoice: React.FC<{
  option: string;
  clicked: boolean;
  setClickStatus: () => void;
}> = ({ option, clicked, setClickStatus }) => {
  const choiceText: string = option;

  const [isChosen, setChosen] = useState(false);

  // When the User Clicks Incorrect Option. We will highlight it red
  // and set correct one green
  const inCorrectClick = () => {
    setClickStatus();
    setChosen(true);
  };

  // Style for the button
  const buttonStyle: string = isChosen
    ? "choice-button incorrect-button"
    : "choice-button initial-button";

  // Component Being Rendered
  return (
    <IonButton
      className={buttonStyle}
      disabled={clicked}
      onClick={inCorrectClick}
    >
      <ReactMarkdown className="choice-text">{choiceText}</ReactMarkdown>
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

  // Style for the button
  const buttonStyle: string = clicked
    ? "chocie-button correct-button"
    : "choice-button initial-button";

  // Component Being Rendered
  return (
    <IonButton
      className={buttonStyle}
      disabled={clicked}
      onClick={correctClick}
    >
      <ReactMarkdown className="choice-text">{choiceText}</ReactMarkdown>
    </IonButton>
  );
};
