import { IonContent, IonPage, IonIcon, IonCard, IonCardContent, IonText } from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { diamond } from "ionicons/icons";
import DashBoard from "../HomeComp/DashBoard";
import AppNameHeader from "./AppNameHeader";
import LogOutButton from "../ButtonComp/LogOutButton";
import {BiBookBookmark} from 'react-icons/bi'
import { useAuth0 } from "@auth0/auth0-react";

const Home: React.FC<{ cardsLeft: number; handleCardScreen: () => void }> = ({
  cardsLeft,
  handleCardScreen,
}) => {
  const history = useHistory();

  const {user} = useAuth0();

  // Used to jump to the card screen and spread cards
  const navigateToCardScreen = () => {
    history.push("/cardscreen");
    handleCardScreen();
  };

  const navigateToTutorialScreen = () => {
    history.push("/tutorial");
  }

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
          <div className="top-container">
          <IonIcon
            icon={diamond}
            style={{ fontSize: "3.5em"}}
          ></IonIcon>
           <IonCard className="tutorial-card" onClick={navigateToTutorialScreen}>
      <IonCardContent className="tutorial-card-content">
        <BiBookBookmark size='2em' />
        <IonText className="tutorial-text">Tutorial</IonText>
      </IonCardContent>
    </IonCard>
          </div>
          <h1 className="user-name">Hey, {user?.name}</h1>
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
