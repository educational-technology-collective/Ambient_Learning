import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

// Component for a QA Card
const QA: React.FC<{ obj: flashCard }> = ({ obj }) => {
  // Get the question and answer based on obj.content
  const question: string = obj.content.question;

  const answer: string = obj.content.answer;

  // For the font-size
  let backQuestionStyle: string, answerStyle: string;

  backQuestionStyle = "card-text back-text qa-question-back ";

  answerStyle = "card-text back-text qa-answer";

  // Coponent Being Rendered
  return (
    <>
      {/* Front Question Text */}
      <ReactMarkdown
        className="card-text front-text qa-question"
        children={question}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>

      {/* Back Question Text */}
      <ReactMarkdown
        className={backQuestionStyle}
        children={question}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>
      {/* Back Answer Text */}
      <ReactMarkdown
        className={answerStyle}
        children={answer}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>
    </>
  );
};

export default QA;
