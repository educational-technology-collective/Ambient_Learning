import { IonButton} from "@ionic/react";
import { useState } from "react";
import "./MCQChoice.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

// Incorrect Option Component
export const IncorrectChoice: React.FC<{
  option: string;
  clicked: boolean;
}> = ({ option, clicked }) => {
  const choiceText: string = option;

  const [isChosen, setChosen] = useState(false);

  // Style for the button
  const buttonStyle: string = isChosen
    ? "choice-button incorrect-button"
    : "choice-button initial-button";

  // Component Being Rendered
  return (
    <IonButton
      className={buttonStyle}
      disabled={clicked}
    >
      <ReactMarkdown
        className="choice-text"
        children={choiceText}
      ></ReactMarkdown>
    </IonButton>
  );
};

// Correct Option Component
export const CorrectChoice: React.FC<{
  option: string;
  clicked: boolean;
}> = ({
  option,
  clicked,
}) => {
  const choiceText = option;

  // Style for the button
  const buttonStyle: string = clicked
    ? "chocie-button correct-button"
    : "choice-button initial-button";

  // Component Being Rendered
  return (
    <IonButton
      className={buttonStyle}
      disabled={clicked}
    >
      <ReactMarkdown
        className="choice-text"
        children={choiceText}
      ></ReactMarkdown>
    </IonButton>
  );
};
