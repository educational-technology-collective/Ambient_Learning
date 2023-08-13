import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useState } from "react";
import { hideBar, showBar } from "../utilities/showTabBar";
import "../pages/CardScreen.css";
import "./TutorialPage.css";
import FlashCardList from "../FlashCardComp/FlashCardList";
import FinishedDisplay from "../TutorialComp/FinishedDisplay";
import AppNameHeader from "./AppNameHeader";
import { cards } from "../utilities/tutorialpagedata";
import OneMoreTutorialModal from "../TutorialComp/OneMoreTutorialModal";

const TutorialPage: React.FC<{ handleCardScreen: () => void }> = ({
  handleCardScreen,
}) => {
  // Hide the bottom tabs for the tutorial page
  useIonViewWillEnter(hideBar);

  // Display the bottom tabs after
  useIonViewWillLeave(showBar);

  // Static Cards length of 4
  const [tutorialCounter, setTutorialCounter] = useState(cards.length);

  // Increment the counter of card to move to next
  const swipeDummyNext = () => {
    setTutorialCounter((prevTutorialCounter) => prevTutorialCounter - 1);
  };

  // Reset the counter back for next time tutorial
  const leaveTimeOut = () => {
    setTutorialCounter(cards.length);
  };

  // Leave the tutorial screen and set the counter back
  const leaveTutorialScreen = () => {
    handleCardScreen();
    setTimeout(leaveTimeOut, 1000);
  };

  return (
    <IonPage>
      {/* Header for the App Name */}
      <AppNameHeader />

      <IonContent scrollY={false} className="tutorialpage-content">
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
                  isFrontTuple={true}
                  putLogInfo={() => {}}
                  swipeNextCard={swipeDummyNext}
                  swipeOneMoreCard={swipeDummyNext}
                  tupleIndex={index}
                  tupleCounter={1}
                  handleStatisticsUpdate={() => {}}
                />
              );
            }
          })}
        </div>

        {/* Display the modal of how one more card works */}
        {tutorialCounter === 3 ? <OneMoreTutorialModal /> : null}

        {/* Display the message of tutorial finished and prompt them to jump to cards */}
        {tutorialCounter === 0 ? (
          <FinishedDisplay
            isTutorial={true}
            enterScreen={leaveTutorialScreen}
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default TutorialPage;
