import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useState } from "react";
import { hideBar, showBar } from "../utilities/showTabBarAndButtons";
import "../pages/CardScreen.css";
import "./TutorialPage.css";
import FlashCardList from "../FlashCardComp/FlashCardList";
import FinishedDisplay from "../TutorialComp/FinishedDisplay";
import AppNameHeader from "./AppNameHeader";
import { cards } from "../utilities/tutorialpagedata";
import OneMoreTutorialModal from "../TutorialComp/OneMoreTutorialModal";
import { App as CapApp } from "@capacitor/app";
import { useHistory } from "react-router";

const TutorialPage: React.FC<{ handleCardScreen: () => void }> = ({
  handleCardScreen,
}) => {
  const history = useHistory();
  CapApp.addListener("backButton", () => {
    history.push("/home");
  });

  // Hide the bottom tabs for the tutorial page
  useIonViewWillEnter(hideBar);

  // Display the bottom tabs after
  useIonViewWillLeave(showBar);

  // Static Cards length of 4
  const [tutorialCounter, setTutorialCounter] = useState(cards.length);

  const [tutorialTupleCounter, setTutorialTupleCounter] = useState(
    cards[cards.length - 1].length
  );

  const swipeNextTutorial = (tupleIndex: number) => {
    setTutorialCounter((prevTutorialCounter) => prevTutorialCounter - 1);
    if (tupleIndex > 0) {
      setTutorialTupleCounter(cards[tupleIndex - 1].length);
    }
  };

  const swipeOneMoreTutorial = () => {
    setTutorialTupleCounter(
      (prevTutorialTupleCounter) => prevTutorialTupleCounter - 1
    );
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
            if (index === tutorialCounter - 1) {
              return (
                <FlashCardList
                  array={array}
                  key={index}
                  isFrontTuple={true}
                  putLogInfo={() => {}}
                  swipeNextCard={swipeNextTutorial}
                  swipeOneMoreCard={swipeOneMoreTutorial}
                  tupleIndex={index}
                  tupleCounter={tutorialTupleCounter}
                  handleStatisticsUpdate={() => {}}
                />
              );
            } else if (index === tutorialCounter - 2) {
              return (
                <FlashCardList
                  array={array}
                  key={index}
                  isFrontTuple={false}
                  putLogInfo={() => {}}
                  swipeNextCard={swipeNextTutorial}
                  swipeOneMoreCard={swipeOneMoreTutorial}
                  tupleIndex={index}
                  tupleCounter={tutorialTupleCounter}
                  handleStatisticsUpdate={() => {}}
                />
              );
            }
          })}
        </div>

        {/* Display the modal of how one more card works */}
        {tutorialCounter === 2 ? <OneMoreTutorialModal /> : null}

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
