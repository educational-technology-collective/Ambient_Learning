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
  cardStackClass: string;
  cardCol: any[];
  swipeNextCard: (id: number) => void;
  swipeOneMoreCard: (key: number, id: number) => void;
  setClassBack: () => void
}> = ({
  finished,
  total,
  counter,
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
            if (index === counter - 1 || index === counter - 2) {
              return (
                <FlashCardList
                  array={array}
                  key={index}
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                  tupleIndex={index}
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
