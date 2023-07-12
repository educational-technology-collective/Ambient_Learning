import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./CardScreen.css";
import React from "react";
import FlashCardList from "../FlashCardComp/FlashCardList";
import OneMoreFailMessage from "../IndicationComp/OneMoreFailMessage";
import FinishedDisplay from "../TutorialComp/FinishedDisplay";

const CardScreen: React.FC<{
  finished: number;
  total: number;
  counter: number;
  tupleCounter: number;
  isShake: boolean;
  cardCol: flashCard[][];
  logInfo: reviewInfo;
  pushLogInfo: (event: action) => void
  swipeNextCard: (tupleIndex: number, event: action) => void;
  swipeOneMoreCard: (tupleIndex: number, newInfo: reviewInfo) => void;
  handleHomeScreen: () => void;
}> = ({
  finished,
  total,
  counter,
  tupleCounter,
  isShake,
  cardCol,
  logInfo,
  pushLogInfo,
  swipeNextCard,
  swipeOneMoreCard,
  handleHomeScreen,
}) => {
  const stackClass: string = isShake
    ? "card-stacker card-stacker-animate"
    : "card-stacker";

  // Screen Being Rendered
  return (
    <IonPage>
      {/* Header and ToolBar */}
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">
            {finished} / {total}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="page-content" scrollY={false}>
        <div className={stackClass}>
          {/* We display two tuples at one time */}
          {cardCol.map((array: flashCard[], index) => {
            // If the tuple is displayed on top
            if (index === counter - 1) {
              return (
                <FlashCardList
                  array={array}
                  key={index}
                  isFrontTuple={true}
                  logInfo={logInfo}
                  pushLogInfo={pushLogInfo}
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                  tupleIndex={index}
                  tupleCounter={tupleCounter}
                />
              );
            }
            // If the tuple is displayed below
            else if (index === counter - 2) {
              return (
                <FlashCardList
                  array={array}
                  key={index}
                  isFrontTuple={false}
                  logInfo={logInfo}
                  pushLogInfo={pushLogInfo}
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                  tupleIndex={index}
                  tupleCounter={tupleCounter}
                />
              );
            }
          })}
          {/* Give alert message if it's shaking due to OneMore */}
          {isShake ? <OneMoreFailMessage /> : null}

          {/* Display the "Statistics/Finished Message" When Cards are done */}
          {finished === total ? (
            <FinishedDisplay
              isTutorial={false}
              enterScreen={handleHomeScreen}
            />
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardScreen;
