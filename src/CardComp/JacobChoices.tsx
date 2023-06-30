import { IncorrectChoice, CorrectChoice } from "./MCQChoice";
import "./Choices.css";

const Choices: React.FC<{
  answer: individualChoice[];
  clicked: boolean;
}> = ({
  answer,
  clicked,
 
}) => {
  const choices: individualChoice[] = answer;

  // Transform the Choices 180 degrees after clicking
  const containerStyle = clicked
    ? "choice-container back-side"
    : "choice-container front-side";

  // Component Being Rendered
  return (
    <div className={containerStyle}>
      {/* Mapping the Choices Based on Whether they are correct or not */}
      {randomArray.map((choice: individualChoice, index) =>
        choice.isCorrect ? (
          <CorrectChoice
            option={choice.option}
           
            key={index}
          
          />
        ) : (
          <IncorrectChoice
            option={choice.option}
           
           
            key={index}
          
          />
        )
      )}
    </div>
  );
};

export default Choices;
