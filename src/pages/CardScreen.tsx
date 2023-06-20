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
  total: number
  cardCol: any[];
  swipeNextCard: (id: number) => void;
  swipeOneMoreCard: (key: number, id: number) => void;
}> = React.memo(({ finished, total, cardCol, swipeNextCard, swipeOneMoreCard }) => {
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
        <div className="card-stacker">
          {cardCol.map((array, index) => (
            <FlashCardList
              array={array}
              key={index}
              swipeNextCard={swipeNextCard}
              swipeOneMoreCard={swipeOneMoreCard}
              tupleIndex={index}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
});

export default CardScreen;
