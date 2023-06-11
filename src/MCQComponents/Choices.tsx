import { IncorrectChoice, CorrectChoice } from "./MCQChoice";
import { useState, useEffect } from "react";
import './Choices.css'

const Choices: React.FC<{
  answer: any;
  clicked: boolean;
  setClickStatus: () => void;
}> = (props) => {
  const choices = props.answer;


  const shuffleArray = (array : any) => {
    for(let i = array.length - 1; i > 0; i--)
    {
      let j = Math.floor(Math.random() * (i+1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const [randomArray, setArray] = useState([]);

  useEffect(() => {
    setArray(shuffleArray(choices));
  }, [choices]);


  return (
    <div className="choice-container">
      {randomArray.map((choice: any) =>
        choice.isCorrect ? (
          <CorrectChoice
            option={choice.option}
            clicked={props.clicked}
            setClickStatus={props.setClickStatus}
          />
        ) : (
          <IncorrectChoice
            option={choice.option}
            clicked={props.clicked}
            setClickStatus={props.setClickStatus}
          />
        )
      )}
    </div>
  );
};

export default Choices;
