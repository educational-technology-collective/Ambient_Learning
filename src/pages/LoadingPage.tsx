import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonProgressBar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import "./LoadingPage.css";
import { useHistory } from "react-router-dom";
import { hideBar, showBar } from "../utilities/showTabBar";
import { useAuth0 } from "@auth0/auth0-react";

const LoadingPage: React.FC<{
  isFetched: boolean;
  isError: boolean;
  readyLog: boolean;
  handleCardScreen: () => void;
}> = ({ isFetched, isError, readyLog, handleCardScreen }) => {
  // Hide the Bottom Tabs for this Page
  useIonViewWillEnter(hideBar);

  // Reload the Bottom Tabs when leaving
  useIonViewWillLeave(showBar);

  // State Variable for Loading Bar
  const [buffer, setBuffer] = useState(0.04);
  const [progress, setProgress] = useState(0);

  const history = useHistory();

  const { user } = useAuth0();

  // Turn loading down and jump to card screen
  const navigateToCardScreen = () => {
    history.push("/cardscreen");
    handleCardScreen();
  };

  const navigateToTutorialScreen = () => {
    history.push("/tutorial");
  };

  const navigateToErrorPage = () => {
    history.push("/error");
  };

  // Set a timeout that will jump to the cardscreen
  const [showLoad, setLoad] = useState(true);

  useEffect(() => {
    // When showLoad is initially true, grow the progress bar
    if (showLoad) {
      // Add 0.06 to the value every 0.1 second
      const interval = setInterval(() => {
        setBuffer((prevBuffer: number) => prevBuffer + 0.04);
        setProgress((prevProgress: number) => prevProgress + 0.04);
      }, 100);
      return () => clearInterval(interval);
    }
    // When showLoad is set to false. Jump to the cardScreen with 150ms delay
    else {
      // If there is error
      if (isError) {
        setTimeout(navigateToErrorPage, 100);
      }
      // Check there is user. User is first time and there is no local storage
      else if (
        user !== undefined &&
        user["mobile_first_time"] &&
        localStorage.getItem("mobile_first_time") === null
      ) {
        // Set Local Storage so it won't jump to tutorial screen when refreshing
        localStorage.setItem("mobile_first_time", "false");
        setTimeout(navigateToTutorialScreen, 150);
      }
      // If the user is not first time, navigate to card screen.
      else {
        setTimeout(navigateToCardScreen, 250);
      }
    }
  }, [showLoad]);

  let retrievalComplete = (isFetched && readyLog) || isError;
  let finishLoading = showLoad && progress > 1 && retrievalComplete;

  if (finishLoading) {
    setLoad(false);
  }

  return (
    <IonPage>
      {/* Header and ToolBar */}
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">StorMind</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false} className="loading-content">
        <div className="wrapper">
          <h1 className="retrieving-text">Retrieving Cards...</h1>
          <IonProgressBar
            buffer={buffer}
            value={progress}
            className="bar"
          ></IonProgressBar>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default LoadingPage;
