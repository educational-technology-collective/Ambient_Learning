import "./Card.css";
import { MdQuestionMark } from "react-icons/md";
// Component for the indicator of number of same concept cards
const QuestionMark: React.FC<{ openQuestion: () => void }> = ({
  openQuestion,
}) => {
  return (
    <>
      {/* Front Side Indicator */}
      <a
        onClick={(e) => {
          openQuestion();
          e.stopPropagation();
        }}
        className="onemore-mark front-text front-mark"
        id="frontMark"
      >
        <MdQuestionMark className="question-mark" />
      </a>
    </>
  );
};
export default QuestionMark;
