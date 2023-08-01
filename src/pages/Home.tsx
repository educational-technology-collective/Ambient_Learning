import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import DashBoard from "../HomeComp/DashBoard";
import AppNameHeader from "./AppNameHeader";
import LogOutButton from "../ButtonComp/LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";
import TutorialPortal from "../HomeComp/TutorialPortal";

const Home: React.FC<{ cardsLeft: number; handleCardScreen: () => void }> = ({
  cardsLeft,
  handleCardScreen,
}) => {
  const history = useHistory();

  const { user } = useAuth0();

  // Used to jump to the card screen and spread cards
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
      <AppNameHeader />

      <IonContent scrollY={false} className="home-content">
        <div className="home-loaded-wrapper">
          {/* Icon and Tutorial Portal */}
          <TutorialPortal />

          {/* Welcome User */}
          <h1 className="user-name">Hey, {user?.name}</h1>

          {/* Dashbord of today's task */}
          <DashBoard
            cardsLeft={cardsLeft}
            shadow={shadow}
            navigateToCardScreen={navigateToCardScreen}
          />

          <LogOutButton />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
