import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./CardScreen.css";
import QACard from "../QAComponents/QACard";
import { cardCollection } from "../components/exampleData";
import MCQCard from "../MCQComponents/MCQCard";
import React from "react";

const CardScreen: React.FC<{
  finished: number;
  cardCol: any[];
  swipeNextCard: (id: number) => void;
}> = React.memo(({ finished, cardCol, swipeNextCard }) => {
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
          {cardCol.map((card) =>
            card.type === "q" ? (
              <QACard obj={card} key={card.index} moveOn={swipeNextCard} />
            ) : (
              <MCQCard obj={card} key={card.index} moveOn={swipeNextCard} />
            )
          )}
        </div>
      </IonContent>
    </IonPage>
  );
});

export default CardScreen;
