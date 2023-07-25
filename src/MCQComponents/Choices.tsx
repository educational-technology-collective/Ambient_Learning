import { IncorrectChoice, CorrectChoice } from "./MCQChoice";
import { useState, useEffect } from "react";
import "./Choices.css";

const Choices: React.FC<{
  answer: individualChoice[];
  clicked: boolean;
  setClickStatus: () => void;
  handleTestEvaluation: (result: string) => void;
}> = ({ answer, clicked, setClickStatus, handleTestEvaluation }) => {
  const choices: individualChoice[] = answer;

  // Function that Shuffles the Array of Choices
  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // State Variable that used for the shuffled choices
  const [randomArray, setArray] = useState([]);

  // UseEffect makes sure that the choices are shuffled only once
  useEffect(() => {
    setArray(shuffleArray(choices));
  }, []);

  // Transform the Choices 180 degrees after clicking
  const containerStyle: string = clicked
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
            clicked={clicked}
            setClickStatus={setClickStatus}
            key={index}
            handleTestEvaluation={handleTestEvaluation}
          />
        ) : (
          <IncorrectChoice
            option={choice.option}
            clicked={clicked}
            setClickStatus={setClickStatus}
            key={index}
            handleTestEvaluation={handleTestEvaluation}
          />
        )
      )}
    </div>
  );
};

export default Choices;
