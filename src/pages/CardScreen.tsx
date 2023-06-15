import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
 IonIcon,
 IonProgressBar
} from "@ionic/react";
import "./CardScreen.css";
import QACard from "../QAComponents/QACard";
import { cardCollection} from "../components/exampleData";
import { useState } from "react";
import MCQCard from "../MCQComponents/MCQCard";
import { homeOutline } from "ionicons/icons";
const CardScreen: React.FC = () => {
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
        scrollY={false}
      >
        <IonProgressBar className='bar' value={0.8}>

        </IonProgressBar>
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
        <IonButton className='home-button' routerLink="/home" routerDirection="back">
            <IonIcon icon={homeOutline} style={{fontSize: '2.5em'}}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CardScreen;
