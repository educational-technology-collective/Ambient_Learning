import {IonCard, IonText, IonCardContent, createGesture} from '@ionic/react'
import {useRef, useState, useEffect} from 'react'
import './MCQCard.css'
import Choices from './Choices'

const MCQCard : React.FC<{obj: flashCard}> = ({obj}) => {

    const question = obj.content.question;
    const choices = obj.content.answer;

    const ref = useRef<HTMLInputElement>(null);

    const [clicked, setClick] = useState(false);



    useEffect(() => {
      enableGesture();
    }, [clicked]);

    const setClickStatus = () => {
      setClick(true);
    }

    const enableGesture = () => {
      const card = ref.current;
      if(card)
      {
        const gestureX = createGesture(
          {
            el: card,
            gestureName: 'swipe-mcq',
            direction: 'x',
            onMove: (detail) => {
              card.style.transform = `translateX(${detail.deltaX}px) rotate(${detail.deltaX / 20}deg)`;
            },
            onEnd: (detail) => {
              const windowWidth = window.innerWidth;
              card.style.transition = '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
              if(detail.deltaX > windowWidth / 2)
              {
                card.style.transform =  `translateX(${windowWidth * 1.5}px)`;
              }else if(detail.deltaX < -windowWidth / 2){
                card.style.transform = `translateX(${windowWidth * -1.5}px)`;
              }else{
                card.style.transform = '';
              }

            }
          }
          
        )
        gestureX.enable(clicked);
      }
    }


    return(
      <div className="mcqcard-wrapper" ref={ref}>
      <IonCard
        className='mcqcard-container'
      >
      <IonCardContent className='mcqcard-content'>
          <IonText className='mcqquestion-text'>{question}</IonText>
        </IonCardContent>
        <Choices answer = {choices} setClickStatus={setClickStatus} clicked={clicked}/>
      </IonCard>
      
    </div>
  )
  
}

export default MCQCard;