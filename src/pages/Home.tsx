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
  const f1 = cardCollection[0];
  console.log(f1.content.question);
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ background: "rgba(215,224,255,1)" }}>
        <QACard content={f1.content} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
