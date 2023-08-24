import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import "./CardScreen.css";
import React, { useEffect, useState } from "react";
import FlashCardList from "../FlashCardComp/FlashCardList";
import OneMoreFailMessage from "../IndicationComp/OneMoreFailMessage";
import Statistics from "../StatisticsComp/Statistics";
import { TbHomeEdit, TbSettings } from "react-icons/tb";
import { useHistory } from "react-router";
import { hideBar, showBar } from "../utilities/showTabBarAndButtons";
import { App as CapApp } from "@capacitor/app";
import CardsTab from "../IndicationComp/CardsTab";
import ActionButtons from "../IndicationComp/ActionButtons";
import Settings from "../PageComp/Settings";
import FeedbackModal from "./FeedbackModal";

const CardScreen: React.FC<{
  finished: number;
  total: number;
  counter: number;
  tupleCounter: number;
  isShake: boolean;
  stats: statistics;
  cardCol: flashCard[][];
  putLogInfo: (event: action, endTime: string | null) => void;
  swipeNextCard: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    isBuffer: boolean,
    latestRecord: latestResult
  ) => void;
  swipeOneMoreCard: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    isBuffer: boolean,
    latestRecord: latestResult
  ) => void;
  handleStatisticsUpdate: (testEval: string, selfEval: string) => void;
  handleHomeScreen: () => void;
  isCardScreen: boolean;
  accessToken: string;
}> = ({
  finished,
  total,
  counter,
  tupleCounter,
  isShake,
  stats,
  cardCol,
  putLogInfo,
  swipeNextCard,
  swipeOneMoreCard,
  handleStatisticsUpdate,
  handleHomeScreen,
  isCardScreen,
  accessToken,
}) => {

  // Set the className of cardstack if it's shaking or not
  const stackClass: string = isShake
    ? "card-stacker card-stacker-animate"
    : "card-stacker";

  const history = useHistory();

  const navigateToHome = () => {
    history.push('/home');
    handleHomeScreen();
  }

  CapApp.addListener("backButton", () => {
    history.push("/home");
    handleHomeScreen();
  });
  const [showFeedback, setFeedback] = useState("translateY(-120%)");
  const switchFeedback = (event: any) => {
    event.stopPropagation();
    showFeedback === "translateY(-120%)"
      ? setFeedback("translateY(0)")
      : setFeedback("translateY(-120%)");
  };

  const [toggle, setToggle] = useState("translateY(-120%)");
  const switchToggle = (event: any) => {
    event.stopPropagation();
    toggle === "translateY(-120%)"
      ? setToggle("translateY(0)")
      : setToggle("translateY(-120%)");
  };

  // Close the settings icon when clicking outside
  document.addEventListener("click", (event) => {
    if (toggle === "translateY(0)") {
      setToggle("translateY(-120%)");
    }
    if (showFeedback === "translateY(0)") {
      setFeedback("translateY(-120%)");
    }
  });

  let toolBar =
    finished !== total ? (
      <CardsTab cardsLeft={total - finished} isCardScreen={isCardScreen} />
    ) : (
      <IonTitle className="stats-title">Session Overview</IonTitle>
    );
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
    setAnimateDontKnow(false);
    setAnimateOneMore(false);
    setAnimatePoorCard(false);
    setAnimateKnow(true);
  };
  const handleAnimateDontKnow = () => {
    setAnimateOneMore(false);
    setAnimatePoorCard(false);
    setAnimateKnow(false);
    setAnimateDontKnow(true);
  };

  const handleAnimateOneMore = () => {
    setAnimateDontKnow(false);
    setAnimateKnow(false);
    setAnimatePoorCard(false);
    setAnimateOneMore(true);
  };

  const handleAnimatePoorCard = () => {
    setAnimateDontKnow(false);
    setAnimateOneMore(false);
    setAnimateKnow(false);
    setAnimatePoorCard(true);
  };

  const handleNoAnimation = () => {
    setAnimatePoorCard(false);
    setAnimateDontKnow(false);
    setAnimateOneMore(false);
    setAnimateKnow(false);
  };

  // Show the tabs for statistics page
  useEffect(()=> {
    if(finished === total){
      showBar();
    }
  })

  // Screen Being Rendered
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <TbHomeEdit className="home-icon" onClick={navigateToHome} />
          {toolBar}
          <TbSettings
            className="settings-icon"
            onClick={switchToggle}
            id="settings-icon"
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="page-content" scrollY={false}>
        <Settings
          isHome={false}
          openQuestion={switchFeedback}
          handleHome={handleHomeScreen}
          toggle={toggle}
          switchToggle={switchToggle}
        />
        {finished !== total ? (
          <>
            {/* Header and ToolBar */}
            <div className={stackClass}>
              {/* We display two tuples at one time */}
              {cardCol.map((array: flashCard[], index) => {
                // If the tuple is displayed on top (isFrontTuple is true)
                if (index === counter - 1) {
                  return (
                    <FlashCardList
                      array={array}
                      key={index}
                      isFrontTuple={true}
                      putLogInfo={putLogInfo}
                      swipeNextCard={swipeNextCard}
                      swipeOneMoreCard={swipeOneMoreCard}
                      tupleIndex={index}
                      tupleCounter={tupleCounter}
                      handleStatisticsUpdate={handleStatisticsUpdate}
                      direction={direction}
                      directionHandler={directionHandler}
                      closeButton={closeButton}
                      openButton={openButton}
                      handleAnimateDontKnow={handleAnimateDontKnow}
                      handleAnimateKnow={handleAnimateKnow}
                      handleAnimateOneMore={handleAnimateOneMore}
                      handleAnimatePoorCard={handleAnimatePoorCard}
                      handleNoAnimation={handleNoAnimation}
                    />
                  );
                }
                // If the tuple is displayed below (isFrontTuple is false)
                else if (index === counter - 2) {
                  return (
                    <FlashCardList
                      array={array}
                      key={index}
                      isFrontTuple={false}
                      putLogInfo={putLogInfo}
                      swipeNextCard={swipeNextCard}
                      swipeOneMoreCard={swipeOneMoreCard}
                      tupleIndex={index}
                      tupleCounter={tupleCounter}
                      handleStatisticsUpdate={handleStatisticsUpdate}
                      direction={direction}
                      directionHandler={directionHandler}
                      openButton={openButton}
                      closeButton={closeButton}
                      handleAnimateDontKnow={handleAnimateDontKnow}
                      handleAnimateKnow={handleAnimateKnow}
                      handleAnimateOneMore={handleAnimateOneMore}
                      handleAnimatePoorCard={handleAnimatePoorCard}
                      handleNoAnimation={handleNoAnimation}
                    />
                  );
                }
              })}
              {/* Give alert message if it's shaking due to OneMore */}
              {isShake ? <OneMoreFailMessage /> : null}
            </div>
            <ActionButtons
              directionHandler={directionHandler}
              toOpenButton={toOpenButton}
              animateKnow={animateKnow}
              animateOneMore={animateOneMore}
              animatePoorCard={animatePoorCard}
              aniamteDontKnow={animateDontKnow}
            />
          </>
        ) : (
          <Statistics stats={stats} />
        )}
        <FeedbackModal
          identifier={
            finished !== total
              ? cardCol[counter - 1][tupleCounter - 1]._id
              : "Statistics"
          }
          closeQuestion={switchFeedback}
          showFeedback={showFeedback}
          accessToken={accessToken}
        />
      </IonContent>
    </IonPage>
  );
};

export default CardScreen;
