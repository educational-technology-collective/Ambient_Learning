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
import Message from "../components/OneMoreFailMessage";

const CardScreen: React.FC<{
  finished: number;
  total: number;
  counter: number;
  tupleCounter: number;
  isShake: boolean;
  cardCol: any[];
  swipeNextCard: (tupleIndex: number) => void;
  swipeOneMoreCard: (tupleIndex: number) => void;
}> = ({
  finished,
  total,
  counter,
  tupleCounter,
  isShake,
  cardCol,
  swipeNextCard,
  swipeOneMoreCard,
}) => {
  const stackClass = isShake
    ? "card-stacker card-stacker-animate"
    : "card-stacker";

  // Screen Being Rendered
  return (
    <IonPage>
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
          {cardCol.map((array, index) => {
            // If the tuple is displayed on top
            if (index === counter - 1) {
              return (
                <FlashCardList
                  array={array}
                  key={index}
                  isFrontTuple={true}
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
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                  tupleIndex={index}
                  tupleCounter={tupleCounter}
                />
              );
            }
          })}
          {isShake ? <Message /> : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardScreen;
