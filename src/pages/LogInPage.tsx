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
      <AppNameHeader />
      <IonContent scrollY={false}>
        <LogInButton />
      </IonContent>
    </IonPage>
  );
};

export default LogInPage;
