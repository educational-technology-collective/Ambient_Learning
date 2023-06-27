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
import { diamond } from "ionicons/icons";

const Home: React.FC<{ cardsLeft: number; handleCardScreen: () => void }> = ({
  cardsLeft,
  handleCardScreen,
}) => {
  const history = useHistory();

  const navigateToCardScreen = () => {
    history.push("/cardscreen");
    handleCardScreen();
  };

  // Determine The Box-Shadow Effect based on cards remaining
  let shadow: string;
  //When the remaining cards are larget than or equal to 3
  if (cardsLeft >= 3) {
    shadow = "wrapped-card left-3";
  }
  //When the remaining cards equal to 2
  else if (cardsLeft === 2) {
    shadow = "wrapped-card left-2";
  }
  //Only one card remaining
  else {
    shadow = "wrapped-card";
  }

  // Screen Being Rendered
  return (
    <IonPage>
      {/* Header and ToolBar */}
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">StorMind</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false} className="home-content">
        <div className="home-loaded-wrapper">
          <IonIcon
            icon={diamond}
            style={{ fontSize: "3em", left: "45%", position: "relative" }}
          ></IonIcon>
          <IonCard className="task-card">
            <IonCardContent className="remaining-content">
              <IonText className="today-task">Today's Task:</IonText>

              {/* Determine if the cards are done */}
              {cardsLeft !== 0 ? (
                <IonCard className={shadow} onClick={navigateToCardScreen}>
                  <IonCardContent className="wrapped-card-content">
                    <IonText className="today-task">{cardsLeft}</IonText>
                  </IonCardContent>
                </IonCard>
              ) : (
                <IonText>
                  You are done with cards. Go touch grass, bravo!
                </IonText>
              )}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
