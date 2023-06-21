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
  swipeNextCard: (tuple: number, id: number) => void;
  swipeOneMoreCard: (key: number, id: number) => void;
  setClassBack: () => void
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
          {cardCol.map((array, index) => {
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
            else if(index === counter - 2){
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
