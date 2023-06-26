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

  const questionLength: number = question.length;

  let frontQuestionStyle: string, backQuestionStyle: string;

  // When there are less than or equal to 110 characters: 2em
  if (questionLength <= 110) {
    frontQuestionStyle = "card-text front-text mcq-question back-text-2em";
    backQuestionStyle = "card-text  back-text mcq-question back-text-2em";
  } 
  // When there are less than or equal to 190 characters: 1.6em
  else if (questionLength <= 190) {
    frontQuestionStyle = "card-text front-text mcq-question back-text-1d6em";
    backQuestionStyle = "card-text  back-text mcq-question back-text-1d6em";
  } 
  // When there are more than: 1.3em
  else {
    frontQuestionStyle = "card-text front-text mcq-question back-text-1d3em";
    backQuestionStyle = "card-text  back-text mcq-question back-text-1d3em";
  }

  // Component Being Rendered
  return (
    <>
      {/* Question Text Front */}
      <IonText className={frontQuestionStyle}>{question}</IonText>

      {/* Question Text Back */}
      <IonText className={backQuestionStyle}>{question}</IonText>

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
