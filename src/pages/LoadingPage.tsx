import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonProgressBar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import "./LoadingPage.css";
import { useHistory } from "react-router-dom";

const LoadingPage: React.FC<{ handleCardScreen: () => void }> = ({
  handleCardScreen,
}) => {
  // State Variable for Loading Bar
  const [buffer, setBuffer] = useState(0.06);
  const [progress, setProgress] = useState(0);

  const history = useHistory();

  const navigateToCardScreen = () => {
    history.push("/cardscreen");
    handleCardScreen();
  };

  useEffect(() => {
    // Add 0.06 to the value every 0.1 second
    const interval = setInterval(() => {
      setBuffer((prevBuffer: number) => prevBuffer + 0.06);
      setProgress((prevProgress: number) => prevProgress + 0.06);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Set a timeout that will jump to the cardscreen
  // if (progress > 1) {
  //   setTimeout(() => navigateToCardScreen(), 200);
  // }
  

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
