import { IonText } from "@ionic/react";
import Choices from "../MCQComponents/Choices";
import "./Card.css";

const MCQ: React.FC<{
  obj: flashCard;
  clicked: boolean;
  setClickStatus: () => void;
  setCorrectStatus: () => void;
}> = ({ obj, clicked, setClickStatus, setCorrectStatus }) => {
  const question = obj.content.question;
  const choice = obj.content.answer;
  const textStyle = !clicked
    ? "card-text front-text mcq-question"
    : "card-text back-text mcq-question";

  // Component Being Rendered
  return (
    <>
      {/* Question Text */}
      <IonText className={textStyle}>{question}</IonText>

      {/* Component for all the choices */}
      <Choices
        answer={choice}
        setClickStatus={setClickStatus}
        clicked={clicked}
        setCorrectStatus={setCorrectStatus}
      />
    </>
  );
};

export default MCQ;
