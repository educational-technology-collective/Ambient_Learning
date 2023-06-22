import { IonText } from "@ionic/react";
import Choices from "../MCQComponents/Choices";

const MCQ : React.FC<{obj: flashCard}> = ({obj}) => {
  const question = obj.content.question;
  const choice = obj.content.answer;
  return(
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
  )
};

export default MCQ;