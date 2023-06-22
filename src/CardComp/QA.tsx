import { IonText } from "@ionic/react";
import './Card.css'

const QA : React.FC<{obj: flashCard}> = ({obj}) => {
  const question = obj.content.question;
  const answer = obj.content.answer;
    return(
      <>
        {/* Front QuestionText */}
        <IonText className="card-text front-text">{question}</IonText>
      {/* Back AnswerText */}
      <IonText className="card-text back-text qaquestion-back">{question}</IonText>
      <IonText className="card-text back-text qaanswer">{answer}</IonText>

      </>
    )
};

export default QA;