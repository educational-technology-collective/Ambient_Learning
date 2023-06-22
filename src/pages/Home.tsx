import {
  IonText,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { cardCollection } from "../components/exampleData";
import { diamond } from "ionicons/icons";

const Home: React.FC<{ finished: number; total: number }> = ({
  finished,
  total,
}) => {
  const history = useHistory();

  const navigateToCardScreen = () => {
    history.push("/cardscreen");
  };

  // Determine The Box-Shadow Effect based on cards remaining
  let shadow;
  //When the remaining cards are larget than or equal to 3
  if (cardCollection.length - finished >= 3) {
    shadow = "wrapped-card-3";
  }
  //When the remaining cards equal to 2
  else if (cardCollection.length - finished === 2) {
    shadow = "wrapped-card-2";
  }
  //Only one card remaining
  else {
    shadow = "wrapped-card-1";
  }

  // Screen Being Rendered
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">StorMind</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} className="home-content">
        <IonIcon
          icon={diamond}
          style={{ fontSize: "3em", left: "45%", position: "relative" }}
        ></IonIcon>
        <IonCard className="task-card">
          <IonCardContent className="remaining-content">
            <IonText className="today-task">Today's Task:</IonText>

            {/* Determine if the cards are done */}
            {finished !== total ? (
              <IonCard className={shadow} onClick={navigateToCardScreen}>
                <IonCardContent className="wrapped-card-content">
                  <IonText className="today-task">{total - finished}</IonText>
                </IonCardContent>
              </IonCard>
            ) : (
              <IonText>You are done with cards. Go touch grass, bravo!</IonText>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
