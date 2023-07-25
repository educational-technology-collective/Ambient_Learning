import Choices from "../MCQComponents/Choices";
import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const MCQ: React.FC<{
  obj: flashCard;
  clicked: boolean;
  setClickStatus: () => void;
  handleTestEvaluation: (result: string) => void;
}> = ({ obj, clicked, setClickStatus, handleTestEvaluation }) => {

  // Get the question and choice from obj.content and pass it down
  const question: string = obj.content.question;
  const choice: individualChoice[] = obj.content.answer;

  let frontQuestionStyle: string, backQuestionStyle: string;

  frontQuestionStyle = "front-text mcq-question card-text";
  backQuestionStyle = "card-text  back-text mcq-question";

  // Component Being Rendered
  return (
    <>
      {/* Question Text Front */}
      <ReactMarkdown
        className={frontQuestionStyle}
        children={question}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>

      {/* Question Text Back */}
      <ReactMarkdown
        className={backQuestionStyle}
        children={question}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>

      {/* Component for all the choices */}
      <Choices
        answer={choice}
        setClickStatus={setClickStatus}
        clicked={clicked}
        handleTestEvaluation={handleTestEvaluation}
      />
    </>
  );
};

export default MCQ;
