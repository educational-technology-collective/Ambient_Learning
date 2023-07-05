import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonicSlides, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import { useRef, useState } from "react";
import { hideBar, showBar } from "../utilities/showTabBar";
import '../pages/CardScreen.css'
import Card from "../CardComp/Card";
import FlashCardList from "../FlashCardComp/FlashCardList";
import FinishedDisplay from "../TutorialComp/FinishedDisplay";

const TutorialPage: React.FC = () => {

  const cards = [[{
    _id: 'sdjdiaj',
    lmid: 's12najdn',
    type: 'm',
    content: {
      question: "Which direction to indicate this card is bad?",
      answer: [
        {option: 'Swipe Left', isCorrect: false},
        {option: 'Swipe Right', isCorrect: false},
        {option: 'Swipe Up', isCorrect: false},
        {option: 'Swipe Down', isCorrect: true}
      ]
    }
  }], [{
    _id: 'ssdajsiodusda',
    lmid: 'jjsjaodja',
    type: 'q',
    content: {
      question: 'How do I get one more card of the same concept?',
      answer: 'Simly Swipe Up!!!'
    }
  }],[{
    _id: 'sdj',
    lmid: 'sdnajdn',
    type: 'm',
    content: {
      question: "What if I don't know the card?",
      answer: [
        {option: 'Swipe Left', isCorrect: true},
        {option: 'Swipe Right', isCorrect: false},
        {option: 'Swipe Up', isCorrect: false},
        {option: 'Swipe Down', isCorrect: false}
      ]
    }
  }],[{
    _id: 'sdaddusda',
    lmid: 'jjiajsid',
    type: 'q',
    content: {
      question: 'Hello there! Welocome to Tutorial! Tap the card to reveal the answer. Then Swipe!',
      answer: 'Great Job! Swipe Right to indicate you know the card!!!'
    }
  }]]

  const dummyInfo = {
    user_id: '',
    start_time: '',
    end_time: '',
    number_shake: 0,
    action_container: []
  }

  useIonViewWillEnter(hideBar);
  useIonViewWillLeave(showBar);

  const [tutorialCounter, setTutorialCounter] = useState(cards.length);

  const swipeDummyNext = () => {
    setTutorialCounter(prevTutorialCounter => prevTutorialCounter - 1);
  }

  console.log(tutorialCounter);
  return(
    <IonPage>

    <IonHeader>
      <IonToolbar>
        <IonTitle>StorMind</IonTitle>
      </IonToolbar>
    </IonHeader>


     <IonContent scrollY={false} className="home-content">
     <div className='card-stack'>
          {/* We display two tuples at one time */}
          {cards.map((array: flashCard[], index) => {
            // If the tuple is displayed on top
            if (index === tutorialCounter - 1 || index === tutorialCounter - 2) {
              return (
                <FlashCardList
                  array={array}
                  key={index}
                  isFrontTuple={false}
                  logInfo={dummyInfo}
                  updateInfo={() => {}}
                  swipeNextCard={swipeDummyNext}
                  swipeOneMoreCard={swipeDummyNext}
                  tupleIndex={index}
                  tupleCounter={1}
                />
              );
            }
          })}
         
        </div>
        {tutorialCounter === 0 ? <FinishedDisplay isTutorial={true} /> : null}
     </IonContent>
    </IonPage>
  )
};

export default TutorialPage;