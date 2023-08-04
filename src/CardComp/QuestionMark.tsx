import "./Card.css";
import { MdQuestionMark } from "react-icons/md";
// Component for the indicator of number of same concept cards
const QuestionMark: React.FC<{openQuestion: () => void}> = ({
 openQuestion
}) => {
  // document.getElementById('frontMark')?.addEventListener('click', function(event){
  //   console.log('Tryi')
  //   event.stopImmediatePropagation();
  //   openQuestion();
  // })

  // console.log(document.getElementById('backMark'))
  // document.getElementById('backMark')?.addEventListener('click', function(event){
  //   console.log('Trying');
  //   event.stopImmediatePropagation();
  //   openQuestion();
  // })
  
  return (
    <>
      {/* Front Side Indicator */}
      <a onClick={(e) => {openQuestion(); e.stopPropagation(); }} className="onemore-mark front-text front-mark" id="frontMark">
        <MdQuestionMark className="question-mark"/>
      </a>
      {/* Back Side Indicator
      <a onClick={(e) => {console.log('clicking'); e.stopPropagation(); openQuestion()}} className="onemore-mark back-text back-mark" id="backMark"><MdQuestionMark className="question-mark"/></a> */}
    </>
  );
};
export default QuestionMark;
