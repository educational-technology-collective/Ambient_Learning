import rehypeRaw from "rehype-raw";
import Choices from "../MCQComponents/Choices";
import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

// Component for a MCQ Card
const MCQ: React.FC<{
  obj: flashCard;
  clicked: boolean;
  setClickStatus: () => void;
  handleTestEvaluation: (result: string) => void;
}> = ({ obj, clicked, setClickStatus, handleTestEvaluation }) => {
  // Get the question and choice from obj.content and pass it down
 
  const choice: individualChoice[] = obj.content.answer;

  let frontQuestionStyle: string, backQuestionStyle: string;

  frontQuestionStyle = "front-text mcq-question card-text";
  backQuestionStyle = "card-text  back-text mcq-question";

  const tutorial2BackText = `The correct option will be highlighted with ***green*** color. If you select an incorrect option, it will be highlighted with ***red*** color. Swipe right to get another card.👉`;
  let question: string = obj.content.question;
  if(obj._id === 'tutorial2' && clicked){
    question = tutorial2BackText;
  }

  // Component Being Rendered
  return (
    <>
      {/* Question Text Front */}
      <div className={!clicked? frontQuestionStyle : backQuestionStyle} >
      <ReactMarkdown
        children={question}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>
      </div>

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
