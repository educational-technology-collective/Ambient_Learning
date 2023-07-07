import {
  IonPage,
  IonContent,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import "./LogInPage.css";
import LogInButton from "../LogInComp/LogInButton";
import { hideBar, showBar } from "../utilities/showTabBar";
import AppNameHeader from "./AppNameHeader";

const LogInPage: React.FC = () => {
  // Hide the bottom tabs when entering the login page
  useIonViewWillEnter(hideBar);

  // Display the bottom tabs when leaving the login page
  useIonViewWillLeave(showBar);

  return (
    <IonPage>
      <IonContent scrollY={false} className="login-content">
        <div className="login-page-container">
        <h1>Hi, Welcome<span></span></h1>
        <LogInButton />
        </div>   
      </IonContent>
    </IonPage>
  );
};

export default LogInPage;
