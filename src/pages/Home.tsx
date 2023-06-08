import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import QACard from "../components/QACard";
import { cardCollection } from "../components/exampleData";

const Home: React.FC = () => {
  const cardEvent = {
    positive: () => {},
    negative: () => {},
  };

  let index = 0;

  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        style={{ background: "rgba(215,224,255,1)" }}
        fullscreen
        class="overall"
        scrollY={false}
      >
        <div className="card-stacker">
          {index < cardCollection.length - 1 ? (
            <QACard obj={cardCollection[index + 1]} />
          ) : null}
          <QACard obj={cardCollection[index]} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
