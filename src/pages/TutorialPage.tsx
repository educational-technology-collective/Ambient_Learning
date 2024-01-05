import {
  IonContent,
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { hideBar, showBar } from "../utilities/showTabBarAndButtons";
import "../pages/CardScreen.css";
import "./TutorialPage.css";
import FlashCardList from "../FlashCardComp/FlashCardList";
import FinishedDisplay from "../TutorialComp/FinishedDisplay";
import AppNameHeader from "./AppNameHeader";
import { cards } from "../utilities/tutorialpagedata";
import OneMoreTutorialModal from "../TutorialComp/OneMoreTutorialModal";
import { App as CapApp } from "@capacitor/app";
import { useHistory} from "react-router";
import TutorialButton from "../IndicationComp/TutorialButton";

const TutorialPage: React.FC<{ handleCardScreen: () => void }> = ({
  handleCardScreen,
}) => {
  const history = useHistory();

  // Hide the bottom tabs for the tutorial page
  useIonViewWillEnter(hideBar);


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

  const switchFeedback = () => {};

  const [direction, setDirection] = useState(0);

  // Set directions that will trigger swiping/loging of each direction
  // 1 - Poor Card
  // 2 - Know
  // 3 - One More
  // 4 - Dont Know
  const directionHandler = (direction: number) => {
    setDirection(direction);
  };

  // State Variable used to check if to open the buttons
  const [toOpenButton, setOpenButton] = useState(false);

  // Handler that will show the buttons as user taps the card
  const openButton = () => {
    setOpenButton(true);
  };

  // Handler that will hide the buttons as user swipes a card
  const closeButton = () => {
    setOpenButton(false);
  };

  const [animateKnow, setAnimateKnow] = useState(true);
  const [animateDontKnow, setAnimateDontKnow] = useState(true);
  const [animateOneMore, setAnimateOneMore] = useState(true);
  const [animatePoorCard, setAnimatePoorCard] = useState(true);

  const handleAnimateKnow = () => {
    setAnimateKnow(true);
    setAnimateDontKnow(false);
    setAnimateOneMore(false);
    setAnimatePoorCard(false);
  };
  const handleAnimateDontKnow = () => {
    setAnimateDontKnow(true);
    setAnimateOneMore(false);
    setAnimatePoorCard(false);
    setAnimateKnow(false);
  };

  const handleAnimateOneMore = () => {
    setAnimateOneMore(true);
    setAnimateDontKnow(false);
    setAnimateKnow(false);
    setAnimatePoorCard(false);
  };

  const handleAnimatePoorCard = () => {
    setAnimatePoorCard(true);
    setAnimateDontKnow(false);
    setAnimateOneMore(false);
    setAnimateKnow(false);
  };

  const handleNoAnimation = () => {
    setAnimatePoorCard(false);
    setAnimateDontKnow(false);
    setAnimateOneMore(false);
    setAnimateKnow(false);
  };

  CapApp.addListener('backButton', () => {
    history.push('/home');
  })
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
                  direction={direction}
                  directionHandler={directionHandler}
                  closeButton={closeButton}
                  openButton={openButton}
                  handleAnimateDontKnow={handleAnimateDontKnow}
                  handleAnimateKnow={handleAnimateKnow}
                  handleAnimateOneMore={handleAnimateOneMore}
                  handleAnimatePoorCard={handleAnimatePoorCard}
                  handleNoAnimation={handleNoAnimation}
                  switchFeedback={switchFeedback}
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
                  direction={direction}
                  directionHandler={directionHandler}
                  closeButton={closeButton}
                  openButton={openButton}
                  handleAnimateDontKnow={handleAnimateDontKnow}
                  handleAnimateKnow={handleAnimateKnow}
                  handleAnimateOneMore={handleAnimateOneMore}
                  handleAnimatePoorCard={handleAnimatePoorCard}
                  handleNoAnimation={handleNoAnimation}
                  switchFeedback={switchFeedback}
                />
              );
            }
          })}
        </div>
        {tutorialCounter !== 0 ?
        <TutorialButton
          toOpenButton={toOpenButton}
          animateKnow={animateKnow}
          animateOneMore={animateOneMore}
          animatePoorCard={animatePoorCard}
          aniamteDontKnow={animateDontKnow}
          directionHandler={directionHandler}
        /> : null}
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
