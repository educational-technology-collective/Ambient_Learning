import { IncorrectChoice, CorrectChoice } from "./MCQChoice";
import {useState} from 'react'

const Choices : React.FC<{answer: any, clicked: boolean, setClickStatus : () => void}> = (props) => {

  const choices = props.answer;
  
  return(
    <div style={{flexDirection: 'column', display: 'flex'}}>
    {choices.map((choice : any) => (choice.isCorrect ?  <CorrectChoice option = {choice.option} clicked={props.clicked} setClickStatus={props.setClickStatus}/> : <IncorrectChoice option = {choice.option} clicked={props.clicked} setClickStatus={props.setClickStatus}/>))}
    </div>
  )
};

export default Choices;