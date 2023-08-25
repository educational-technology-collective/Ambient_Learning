import { IonContent, IonPage, isPlatform, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import DashBoard from "../HomeComp/DashBoard";
import AppNameHeader from "./AppNameHeader";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import logo from "../../assets/logo.png";
import {
  TbAlertTriangle,
  TbBook,
  TbQuestionMark,
  TbWalk,
  TbInfoSquareRoundedFilled,
} from "react-icons/tb";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import Settings from "../PageComp/Settings";
import { hideBar, showBar } from "../utilities/showTabBarAndButtons";

const Home: React.FC<{
  cardsLeft: number;
  handleCardScreen: () => void;
  accessToken: string;
}> = ({ cardsLeft, handleCardScreen, accessToken }) => {
  // Show the bottom tabs when entering home screen
  useIonViewWillEnter(showBar)

  // Hide the bottom tabs when leaving home screen
  useIonViewWillLeave(hideBar)
  
  const history = useHistory();

  const { user } = useAuth0();

  // Used to jump to the card screen and spread cards
  const navigateToCardScreen = () => {
    setTimeout(handleCardScreen, 300);
    history.push("/cardscreen", { from: "home" });
  };

  const [showFeedback, setFeedback] = useState("translateY(-120%)");

  const switchFeedback = (event: any) => {
    event.stopPropagation();
    showFeedback === "translateY(-120%)"
      ? setFeedback("translateY(0)")
      : setFeedback("translateY(-120%)");
  };

  const [toggle, setToggle] = useState("translateY(-120%)");
  const switchToggle = (event: any) => {
    event.stopPropagation();
    toggle === "translateY(-120%)"
      ? setToggle("translateY(0)")
      : setToggle("translateY(-120%)");
  };

  // Close the settings icon when clicking outside
  document.addEventListener("click", (event) => {
    if (toggle === "translateY(0)") {
      setToggle("translateY(-120%)");
    }
    if (showFeedback === "translateY(0)") {
      setFeedback("translateY(-120%)");
    }
  });

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
      <AppNameHeader isHome={true} switchSettings={switchToggle} />

      <IonContent scrollY={false} className="home-content">
        <Settings
          openQuestion={switchFeedback}
          toggle={toggle}
          isHome={true}
          switchToggle={switchToggle}
        />

        <div className="home-loaded-wrapper">
          {/* Icon and Tutorial Portal */}
          <div className="top-container">
            <img src={logo} alt="logo" className="logo-img" />
          </div>

          {/* Welcome User */}
          <h1 className="user-name">Hey, {user?.name}</h1>

          {/* Dashbord of today's task */}
          <DashBoard
            cardsLeft={cardsLeft}
            shadow={shadow}
            navigateToCardScreen={navigateToCardScreen}
          />
        </div>
        <FeedbackModal
          identifier="Home Screen"
          closeQuestion={switchFeedback}
          accessToken={accessToken}
          showFeedback={showFeedback}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
