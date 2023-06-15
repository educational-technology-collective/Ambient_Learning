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
  
  const [finished, setFinished] = useState(0);
  const [cardCol, setCards] = useState(cardCollection);
  

  const swipeNextCard = (id : number ) => {
    setFinished((finished) => finished + 1);
    console.log(id);
    setCards((cards) => {return cards.filter(card => id !== card.index)})
   
  };
  
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">{finished} / {cardCollection.length}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="page-content" scrollY={false}>
        <div className="card-stacker">
          {/* {index < cardCollection.length - 1 ? (
            <QACard obj={cardCollection[index + 1]} moveCard={swipeNextCard}/>
          ) : null}
          {<QACard obj={cardCollection[index]} moveCard={swipeNextCard}/>} */}

          {cardCol.map((card) =>
            card.type === "q" ? (
              <QACard obj={card} key={card.index} moveOn={swipeNextCard}/>
            ) : (
              <MCQCard obj={card} key={card.index} moveOn={swipeNextCard}/>
            )
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CardScreen;
