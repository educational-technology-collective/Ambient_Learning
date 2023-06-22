import { IonText } from "@ionic/react";
import Choices from "../MCQComponents/Choices";
import "../MCQComponents/MCQCard.css";

const MCQ: React.FC<{
  obj: flashCard;
  clicked: boolean;
  setClickStatus: () => void;
  setCorrectStatus: () => void;
}> = ({ obj, clicked, setClickStatus, setCorrectStatus }) => {
  const question = obj.content.question;
  const choice = obj.content.answer;
  return (
    <>
      <IonText
        className={!clicked ? "mcqquestion-text" : "mcqquestion-text-back"}
      >
        {question}
      </IonText>
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
