import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import QACard from "../components/QACard";
import { cardCollection, MCQs } from "../components/exampleData";
import { useState } from "react";
import MCQCard from "../components/MCQCard";
const Home: React.FC = () => {
  const cardEvent = {
    positive: () => {},
    negative: () => {},
  };

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
        className='page-content'
        fullscreen
        class="overall"
        scrollY={false}
      >
        <div className="card-stacker">
          {/* {index < cardCollection.length - 1 ? (
            <QACard obj={cardCollection[index + 1]} moveCard={swipeNextCard}/>
          ) : null}
          {<QACard obj={cardCollection[index]} moveCard={swipeNextCard}/>} */}


          {cardCollection.map((card) => (
            <QACard obj={card} key={card.index} />
          ))}

          {/* {MCQs.map((card) => (<MCQCard obj = {card} key = {card.index} />))} */}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
