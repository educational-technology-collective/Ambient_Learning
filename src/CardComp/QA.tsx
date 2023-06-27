import { IonText } from "@ionic/react";
import parse from 'html-react-parser'
import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const QA: React.FC<{ obj: flashCard }> = ({ obj }) => {
  
  const question = obj.content.question;
 
  
  

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
      {/* <html className="card-text front-text">{question}</html> */}
      <>
      <ReactMarkdown className='card-text front-text qa-question'>{question}</ReactMarkdown>
      </>
      
      {/* Back Question Text */}
      <ReactMarkdown className={backQuestionStyle}>{question}</ReactMarkdown>
      {/* Back Answer Text */}
      <ReactMarkdown className={answerStyle}>{answer}</ReactMarkdown>
    </>
  );
};

export default QA;
