import { IonButton } from "@ionic/react";
import { useState } from "react";
import "./MCQChoice.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

// Incorrect Option Component
export const IncorrectChoice: React.FC<{
  option: string;
  clicked: boolean;
  setClickStatus: () => void;
  handleTestEvaluation: (result: string) => void;
}> = ({ option, clicked, setClickStatus, handleTestEvaluation }) => {
  const choiceText: string = option;

  // State variable to indicate if this option is clicked by the user
  const [isChosen, setChosen] = useState(false);

  // When the User Clicks Incorrect Option. We will highlight it red
  // and set correct one green
  const inCorrectClick = () => {
    setClickStatus();
    setChosen(true);

    // Set the machine evaluation to be incorrect
    handleTestEvaluation("incorrect");
  };

  // Style for the button based on whether it's clicked or not
  const buttonStyle: string = isChosen
    ? "choice-button incorrect-button"
    : "choice-button";

  // Component Being Rendered
  return (
    <IonButton
      className={buttonStyle}
      disabled={clicked}
      onClick={inCorrectClick}
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
  setClickStatus: () => void;
  handleTestEvaluation: (result: string) => void;
}> = ({ option, clicked, setClickStatus, handleTestEvaluation }) => {
  const choiceText: string = option;

  const correctClick = () => {
    setClickStatus();

    // Set machine evaluation to be correct
    handleTestEvaluation("correct");
  };

  // Style for the button based on whether user has clicked anything
  const buttonStyle: string = clicked
    ? "choice-button correct-button"
    : "choice-button";

  // Component Being Rendered
  return (
    <IonButton
      className={buttonStyle}
      disabled={clicked}
      onClick={correctClick}
    >
      <ReactMarkdown
        className="choice-text"
        children={choiceText}
        rehypePlugins={[rehypeRaw]}
      ></ReactMarkdown>
    </IonButton>
  );
};
