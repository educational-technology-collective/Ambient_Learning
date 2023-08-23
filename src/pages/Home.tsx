import { IonContent, IonPage, isPlatform } from "@ionic/react";
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

const Home: React.FC<{ cardsLeft: number; handleCardScreen: () => void }> = ({
  cardsLeft,
  handleCardScreen,
}) => {
  const history = useHistory();

  const { user } = useAuth0();

  // Used to jump to the card screen and spread cards
  const navigateToCardScreen = () => {
    setTimeout(handleCardScreen, 300);
    history.push("/cardscreen", { from: "home" });
  };

  const [showFeedBack, setFeedBack] = useState(false);
  const openQuestion = () => {
    setFeedBack(true);
  };

  const closeQuestion = () => {
    setFeedBack(false);
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
        <Settings openQuestion={openQuestion} toggle={toggle} isHome={true} />

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
      </IonContent>
      {showFeedBack ? (
        <FeedbackModal identifier="Home Screen" closeQuestion={closeQuestion} />
      ) : null}
    </IonPage>
  );
};

export default Home;
