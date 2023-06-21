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

const CardScreen: React.FC<{
  finished: number;
  total: number;
  counter: number;
  tupleCounter: number;
  cardStackClass: string;
  cardCol: any[];
  swipeNextCard: (tupleIndex: number) => void;
  swipeOneMoreCard: (tupleIndex: number) => void;
  setClassBack: () => void;
}> = ({
  finished,
  total,
  counter,
  tupleCounter,
  cardStackClass,
  cardCol,
  swipeNextCard,
  swipeOneMoreCard,
  setClassBack,
}) => {
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
        <div className={cardStackClass}>
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
                  setClassBack={setClassBack}
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
                  setClassBack={setClassBack}
                />
              );
            }
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardScreen;
