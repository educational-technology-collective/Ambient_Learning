import { IonButton, IonText } from "@ionic/react";
import {useState} from 'react'
import './MCQChoice.css'
export const IncorrectChoice : React.FC<{option: string, clicked: boolean, setClickStatus: () => void}> = (props) => {

  const choiceText = props.option;

  const [isChosen, setChosen] = useState(false);

  
  const inCorrectClick = () => {
      props.setClickStatus();
      setChosen(true);
  }

  return(
    <IonButton className = {isChosen ? 'incorrect-button' : 'initial-button'} disabled={props.clicked} onClick={inCorrectClick}>
      <IonText className={props.clicked && !isChosen ? 'hide-text' : 'choice-text'}>
        {choiceText}
      </IonText>
    </IonButton>
  )
};

export const CorrectChoice : React.FC<{option: string, clicked:boolean, setClickStatus : () => void}> = (props) => {

  const choiceText = props.option;

  const correctClick = () => {
    props.setClickStatus();
  }
  
  return(
    <IonButton className = {props.clicked ? 'correct-button' : 'initial-button'} disabled={props.clicked} onClick={correctClick}>
      <IonText className= 'choice-text'>
        {choiceText}
      </IonText>
    </IonButton>
  )
};






