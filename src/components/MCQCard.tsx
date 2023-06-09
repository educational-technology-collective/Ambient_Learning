import {IonItem, IonCard, IonText, IonCardContent, IonButton} from '@ionic/react'
import {useRef, useState} from 'react'
import './QACard.css'
import Choices from './Choices'

const MCQCard : React.FC<{obj: flashCard}> = (props) => {

    const question = props.obj.content.question;
    const choices = props.obj.content.answer;

    const ref = useRef<HTMLInputElement>(null);

    const [clicked, setClick] = useState(false);

    const setClickStatus = () => {
      setClick(true);
    }

    return(
      <div className="card-wrapper" ref={ref}>
      <IonCard
        className="card-container"
        style={{ height: "100%", display: "flex", flexDirection: 'column' }}
      >
      <IonCardContent style={{height: '65%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          {/* Front QuestionText */}
          <IonText class="question-text">{question}</IonText>
        </IonCardContent>
        <Choices answer = {choices} setClickStatus={setClickStatus} clicked={clicked}/>
      </IonCard>
      
    </div>
  )
  
}

export default MCQCard;