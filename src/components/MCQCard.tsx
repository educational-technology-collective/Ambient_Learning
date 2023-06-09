import {IonItem, IonCard, IonText, IonCardContent, IonButton} from '@ionic/react'
import {useRef, useState} from 'react'
import './QACard.css'

const MCQCard : React.FC<{obj: flashCard}> = (props) => {

    const question = props.obj.content.question;
    const choices = props.obj.content.answer;

    const [showChoice, setShowChoice] = useState(true);

    const ref = useRef<HTMLInputElement>(null);

    

    return(
      <div className="card-wrapper" ref={ref}>
      <IonCard
        className="card-container"
        style={{ height: "100%", display: "flex" }}
      >
      <IonCardContent>
          {/* Front QuestionText */}
          <IonText class="question-text">{question}</IonText>
          {choices.map((choice : any) => (<IonButton>{choice.option}</IonButton>))}
        </IonCardContent>
      </IonCard>
      
    </div>
  )
  
}

export default MCQCard;