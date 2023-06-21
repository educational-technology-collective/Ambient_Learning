import { IncorrectChoice, CorrectChoice } from "./MCQChoice";
import { useState, useEffect } from "react";
import "./Choices.css";

const Choices: React.FC<{
  answer: any;
  clicked: boolean;
  setClickStatus: () => void;
  setCorrectStatus: () => void;
}> = ({ answer, clicked, setClickStatus, setCorrectStatus }) => {
  const choices = answer;

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

  const [randomArray, setArray] = useState([]);

  // UseEffect makes sure that the choices are shuffled only once
  useEffect(() => {
    setArray(shuffleArray(choices));
  }, [choices]);

  return (
    <div className={!clicked ? "choice-container" : "choice-container-back"}>
      {/* Mapping the Choices Based on Whether they are correct or not */}
      {randomArray.map((choice: any, index) =>
        choice.isCorrect ? (
          <CorrectChoice
            option={choice.option}
            clicked={clicked}
            setClickStatus={setClickStatus}
            setCorrectStatus={setCorrectStatus}
            key={index}
          />
        ) : (
          <IncorrectChoice
            option={choice.option}
            clicked={clicked}
            setClickStatus={setClickStatus}
            key={index}
          />
        )
      )}
    </div>
  );
};

export default Choices;
