import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./CardScreen.css";
import { cardCollection } from "../components/exampleData";
import React from "react";
import FlashCard from "../FlashCardComp/FlashCard";

const CardScreen: React.FC<{
  finished: number;
  cardCol: any[];
  swipeNextCard: (id: number) => void;
  swipeOneMoreCard: (id: number) => void;
}> = React.memo(({ finished, cardCol, swipeNextCard, swipeOneMoreCard }) => {
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">
            {finished} / {cardCollection.length}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="page-content" scrollY={false}>
        <div className="card-stacker">
          {cardCol.map((array, index) => (
            <FlashCard
              array={array}
              key={index}
              swipeNextCard={swipeNextCard}
              swipeOneMoreCard={swipeOneMoreCard}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
});

export default CardScreen;
