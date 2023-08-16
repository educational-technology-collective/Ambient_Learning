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
import React from "react";
import FlashCardList from "../FlashCardComp/FlashCardList";
import OneMoreFailMessage from "../IndicationComp/OneMoreFailMessage";
import Statistics from "../StatisticsComp/Statistics";
import { TbHomeEdit } from "react-icons/tb";
import { useHistory } from "react-router";
import { hideBar, showBar } from "../utilities/showTabBarAndButtons";
import {App as CapApp} from '@capacitor/app'
import CardsTab from "../IndicationComp/CardsTab";

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
}) => {
  useIonViewWillEnter(hideBar);

  useIonViewWillLeave(showBar);

  // Set the className of cardstack if it's shaking or not
  const stackClass: string = isShake
    ? "card-stacker card-stacker-animate"
    : "card-stacker";

  const history = useHistory();
  const navigateToHome = () => {
    history.push("/home");
    handleHomeScreen();
  };

  CapApp.addListener('backButton', () => {
    history.push('/home');
  })
  // Screen Being Rendered
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          {finished === total ? (
            <IonTitle className="stats-title">Session Overview</IonTitle>
          ) : (
            <CardsTab cardsLeft={total - finished} isCardScreen={true}/>
          )}
          <TbHomeEdit className="home-icon" onClick={navigateToHome} />
        </IonToolbar>
      </IonHeader>
      {finished !== total ? (
        <>
          {/* Header and ToolBar */}
          <IonContent className="page-content" scrollY={false}>
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
                    />
                  );
                }
              })}
              {/* Give alert message if it's shaking due to OneMore */}
              {isShake ? <OneMoreFailMessage /> : null}
            </div>
            {/* <ActionButtons animateDontKnow={true} animateKnow={true} animateOneMore={true} animatePoorCard={true} /> */}
          </IonContent>{" "}
        </>
      ) : (
        <Statistics stats={stats} />
      )}
    </IonPage>
  );
};

export default CardScreen;
