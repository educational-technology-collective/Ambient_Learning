import { IonText } from "@ionic/react";
import '../QAComponents/QACard.css'

const QA : React.FC<{obj: flashCard}> = ({obj}) => {
  const question = obj.content.question;
  const answer = obj.content.answer;
    return(
      <>
        {/* Front QuestionText */}
        <IonText className="qaquestion-text">{question}</IonText>
      {/* Back AnswerText */}
      <IonText className="qabackquestion-text">{question}</IonText>
      <IonText className="qaanswer-text">{answer}</IonText>

      </>
    )
};

export default QA;