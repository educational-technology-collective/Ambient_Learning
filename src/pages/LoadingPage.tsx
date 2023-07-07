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

const LoadingPage: React.FC<{
  isFetched: boolean;
  handleCardScreen: () => void;
}> = ({ isFetched, handleCardScreen }) => {
  // Hide the Bottom Tabs for this Page
  useIonViewWillEnter(hideBar);

  // Reload the Bottom Tabs when leaving
  useIonViewWillLeave(showBar);

  // State Variable for Loading Bar
  const [buffer, setBuffer] = useState(0.05);
  const [progress, setProgress] = useState(0);

  const history = useHistory();

  // Turn loading down and jump to card screen
  const navigateToCardScreen = () => {
    history.push("/cardscreen");
    handleCardScreen();
  };

  const navigateToTutorialScreen = () => {
    history.push("/tutorial");
  };

  useEffect(() => {
    // Add 0.06 to the value every 0.1 second
    const interval = setInterval(() => {
      setBuffer((prevBuffer: number) => prevBuffer + 0.05);
      setProgress((prevProgress: number) => prevProgress + 0.05);
    }, 100);

    if (showLoad && isFetched && progress > 1) {
      setLoad(false);
      setTimeout(navigateToCardScreen, 100);
    }

    return () => clearInterval(interval);
  }, []);

  // Set a timeout that will jump to the cardscreen
  const [showLoad, setLoad] = useState(true);

  if (showLoad && isFetched && progress > 1) {
    setLoad(false);
    setTimeout(navigateToTutorialScreen, 100);
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
