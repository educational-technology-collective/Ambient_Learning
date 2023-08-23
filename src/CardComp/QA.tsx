import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// Component for a QA Card
const QA: React.FC<{ obj: flashCard, isClicked: boolean }> = ({ obj, isClicked }) => {
  // Get the question and answer based on obj.content
  const question: string = obj.content.question;

  const answer: string = obj.content.answer;

  // For the font-size
  let backQuestionStyle: string, answerStyle: string;

  let frontQuestionStyle: string = "card-text front-text qa-question"

  backQuestionStyle = "card-text back-text qa-question";

  answerStyle = "card-text back-text qa-answer";

  // Coponent Being Rendered
  return (
    <>
      {/* Front Question Text */}
      <div className={isClicked? backQuestionStyle: frontQuestionStyle}>
      <ReactMarkdown
        children={question}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>
      </div>

      {/* Back Question Text
      <ReactMarkdown
        className={backQuestionStyle}
        children={question}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown> */}
      {/* Back Answer Text */}
      <ReactMarkdown
        className={answerStyle}
        children={answer}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>
    </>
  );
};

export default QA;
