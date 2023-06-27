import { IonText } from "@ionic/react";
import "./Card.css";

const QA: React.FC<{ obj: flashCard }> = ({ obj }) => {
  const question: string = obj.content.question;
  const answer: string = obj.content.answer;

  const questionLength: number = question.length;
  const answerLength: number = answer.length;
  console.log(questionLength);
  
  // For the font-size
  let backQuestionStyle: string, answerStyle: string;

  // When there are less than or equal to 110 characters: 2em
  if (questionLength <= 110) {
    backQuestionStyle = "card-text back-text qa-question-back back-text-2em";
  } 
  // When there are less than or equak to 190 characters: 1.6em
  else if (questionLength <= 190) {
    backQuestionStyle = "card-text back-text qa-question-back back-text-1d6em";
  } 
  // When there are more than 190 characters: 1.3em
  else {
    backQuestionStyle = "card-text back-text qa-question-back back-text-1d3em";
  }

  // When there are less than or equal to 110 characters: 2em
  if (answerLength <= 110) {
    answerStyle = "card-text back-text qa-answer back-text-2em";
  } 
  // When there are less than or equal to 190 characters: 1.6em
  else if (answerLength <= 190) {
    answerStyle = "card-text back-text qa-answer back-text-1d6em";
  } 
  // When there are mroe than 190 characters: 1.3em
  else {
    answerStyle = "card-text back-text qa-answer back-text-1d3em";
  }

  // Coponent Being Rendered
  return (
    <>
      {/* Front Question Text */}
      <IonText className="card-text front-text">{question}</IonText>
      {/* Back Question Text */}
      <IonText className={backQuestionStyle}>{question}</IonText>
      {/* Back Answer Text */}
      <IonText className={answerStyle}>{answer}</IonText>
    </>
  );
};

export default QA;
