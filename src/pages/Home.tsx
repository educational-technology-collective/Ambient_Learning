import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import QACard from "../QAComponents/QACard";
import { cardCollection} from "../components/exampleData";
import { useState } from "react";
import MCQCard from "../MCQComponents/MCQCard";
const Home: React.FC = () => {
  const [index, setIndex] = useState(0);

  const swipeNextCard = () => {
    setIndex(index + 1);
  };
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle>Card</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="page-content"
        fullscreen
        class="overall"
        scrollY={false}
      >
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

export default Home;
