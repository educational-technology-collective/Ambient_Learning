import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonIcon,
  IonProgressBar,
} from "@ionic/react";
import "./CardScreen.css";
import QACard from "../QAComponents/QACard";
import { cardCollection } from "../components/exampleData";
import { useState } from "react";
import MCQCard from "../MCQComponents/MCQCard";

const CardScreen: React.FC = () => {
  const [index, setIndex] = useState(0);

  const swipeNextCard = () => {
    setIndex(index + 1);
  };
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">20 / 35</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="page-content" scrollY={false}>
        <div className="card-stacker">
          {/* {index < cardCollection.length - 1 ? (
            <QACard obj={cardCollection[index + 1]} moveCard={swipeNextCard}/>
          ) : null}
          {<QACard obj={cardCollection[index]} moveCard={swipeNextCard}/>} */}

          {cardCollection.map((card) =>
            card.type === "q" ? (
              <QACard obj={card} key={card.index} />
            ) : (
              <MCQCard obj={card} key={card.index} />
            )
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardScreen;
