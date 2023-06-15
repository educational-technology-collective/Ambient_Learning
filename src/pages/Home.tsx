import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  const navigateToCardScreen = () => {
    history.push("/cardscreen");
  };
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">EiDetic</IonTitle>
        </IonToolbar>
        <IonContent fullscreen scrollY={false}>
          <IonButton onClick={navigateToCardScreen}>Check</IonButton>
        </IonContent>
      </IonHeader>
    </IonPage>
  );
};

export default Home;
