import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">EiDetic</IonTitle>
        </IonToolbar>
        <IonContent fullscreen scrollY={false}>
          <IonButton routerLink="/cardscreen" routerDirection="forward">Check</IonButton>
        </IonContent>
      </IonHeader>
    </IonPage>
  );
};

export default Home;
