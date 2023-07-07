import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useState } from "react";
import { hideBar, showBar } from "../utilities/showTabBar";
import "../pages/CardScreen.css";
import FlashCardList from "../FlashCardComp/FlashCardList";
import FinishedDisplay from "../TutorialComp/FinishedDisplay";
import AppNameHeader from "./AppNameHeader";
import { cards, dummyInfo } from "../utilities/tutorialpagedata";

const TutorialPage: React.FC<{handleCardScreen: () => void;}> = ({handleCardScreen}) => {
  // Hide the bottom tabs for the tutorial page
  useIonViewWillEnter(hideBar);

  // Display the bottom tabs after
  useIonViewWillLeave(showBar);

  const [tutorialCounter, setTutorialCounter] = useState(cards.length);

  const swipeDummyNext = () => {
    setTutorialCounter((prevTutorialCounter) => prevTutorialCounter - 1);
  };

  return (
    <IonPage>
      {/* Header for the App Name */}
      <AppNameHeader />

      <IonContent scrollY={false} className="home-content">
        <div className="card-stack">
          {cards.map((array: flashCard[], index) => {
            // Display the cards two at a time
            if (
              index === tutorialCounter - 1 ||
              index === tutorialCounter - 2
            ) {
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
        {/* Display the message of tutorial finished and prompt them to jump to cards */}
        {tutorialCounter === 0 ? <FinishedDisplay isTutorial={true} enterScreen={handleCardScreen}/> : null}
      </IonContent>
    </IonPage>
  );
};

export default TutorialPage;
