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

  const isPhone: boolean = isPlatform("hybrid");
  const logoutUri = isPhone
    ? "com.etc.ambientlearning://login"
    : "http://localhost:8100/login";

  const { logout } = useAuth0();

  const doLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: logoutUri,
        federated: true,
      },
      async openUrl(url) {
        // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self",
        });
      },
    });
    // On Mobile, we would navigate to the login page ourself and reload the window to refresh
    if (isPhone) {
      // history.push("/login");
      window.location.reload();
    }
    // Clear localStorage to allow next time user potential tutorial page loading
    localStorage.clear();
  };
  const [toggle, setToggle] = useState("translateY(-120%)");
  const switchToggle = (event: any) => {
    event.stopPropagation();
    toggle === "translateY(-120%)"
      ? setToggle("translateY(0)")
      : setToggle("translateY(-120%)");
  };
  const navigateToTutroial = () => {
    history.push("/tutorial", { from: "home" });
  };

  const feedbackClick = () => {
    if (openQuestion) {
      openQuestion();
    }
  };

  const deleteAccountClick = async () => {
    if (confirm("Are you sure you want to delete your account")) {
      await alert(
        "We have received your delete request. It will take us at most 2 hours to delete your information form the database. If you have further questions, please email ambientlearning@umich.edu"
      );
      doLogout();
    }
  };

  // Close the settings icon when clicking outside
  document.addEventListener("click", (event) => {
    if (toggle === "translateY(0)") {
      setToggle("translateY(-120%)");
    }
  });

  const link =
    Capacitor.getPlatform() === "ios"
      ? `https://apps.apple.com/us/app/ambient-learning/id6456572536`
      : `https://play.google.com/store/apps/details?id=com.etc.ambientlearning&pcampaignid=APPU_1_ZdnbZNTTL4mfptQPq-ef6A0&pli=1`;
  // Screen Being Rendered
  return (
    <IonPage>
      {/* Header and ToolBar */}
      <AppNameHeader isHome={true} switchSettings={switchToggle} />

      <IonContent scrollY={false} className="home-content">
        <div
          className="dropdown-settings"
          style={{ transform: toggle }}
          id="settings-box"
        >
          <a
            className="column-container"
            href={link}
            style={{ textDecoration: "none" }}
          >
            <TbInfoSquareRoundedFilled size="1.5rem" color="darkgrey" />
            <h4 className="texts">Version: 1.6.3</h4>
          </a>

          <div className="column-container" onClick={navigateToTutroial}>
            <TbBook size="1.5rem" color="darkgrey" />
            <h4 className="texts">Tutorial</h4>
          </div>
          <div className="column-container" onClick={feedbackClick}>
            <TbQuestionMark size="1.5rem" color="darkgrey" />{" "}
            <h4 className="texts">Feedback</h4>
          </div>
          <div className="column-container" onClick={doLogout}>
            <TbWalk size="1.5rem" color="darkgrey" />
            <h4 className="texts">Log Out</h4>
          </div>
          <div className="column-container" onClick={deleteAccountClick}>
            <TbAlertTriangle size="1.5rem" color="red" />
            <h4 className="texts">Delete Account</h4>
          </div>
        </div>
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
