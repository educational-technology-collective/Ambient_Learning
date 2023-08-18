import { IonPage, IonContent, useIonViewWillEnter } from "@ionic/react";
import "./LogInPage.css";
import LogInButton from "../ButtonComp/LogInButton";
import { hideBar } from "../utilities/showTabBarAndButtons";
import logo from "../../assets/logo.png";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

const LogInPage: React.FC = () => {
  // Hide the bottom tabs when entering the login page
  useIonViewWillEnter(hideBar);

  return (
    <IonPage>
      <IonContent scrollY={false} className="login-content">
        {/* <IonCard className="tutorial-card" onClick={openQuestion}>
          <IonCardContent className="tutorial-card-content">
            <MdQuestionMark size="1.5em" />
          </IonCardContent>
        </IonCard> */}
        <div className="login-page-container">
          <img src={logo} alt="logo" className="login-logo" />

          {/* Welcome Text and the Rectangle Span */}
          {/* <div className="welcome-container">
            <h1 className="welcome-text">
              Hi, Welcome<span className="welcome-covering"></span>
            </h1>
          </div> */}

          {/* Desciption Text and the Login Button appears with changing opacity */}
          {/* <div>
            <h2 className="description-text">
              Enlarge Brain Through <i>Flashcards</i>
            </h2>
          </div> */}
          <LogInButton />

          <h3 className="version">V.1.6.3</h3>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LogInPage;
