import { IonText } from "@ionic/react";
import Choices from "../MCQComponents/Choices";
import "./Card.css";

const MCQ: React.FC<{
  obj: flashCard;
  clicked: boolean;
  setClickStatus: () => void;
  setCorrectStatus: () => void;
}> = ({ obj, clicked, setClickStatus, setCorrectStatus }) => {
  const question: string = obj.content.question;
  const choice: individualChoice[] = obj.content.answer;

  // Component Being Rendered
  return (
    <>
      {/* Question Text Front */}
      <IonText className="card-text front-text mcq-question">
        {question}
      </IonText>

      {/* Question Text Back */}
      <IonText className="card-text back-text mcq-question">{question}</IonText>

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
