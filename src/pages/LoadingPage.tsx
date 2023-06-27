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
  const [buffer, setBuffer] = useState(0.05);
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  const navigateToCardScreen = () => {
    history.push("/cardscreen");
    handleCardScreen();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBuffer((prevBuffer) => prevBuffer + 0.05);
      setProgress((prevProgress) => prevProgress + 0.05);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (progress > 1) {
    setTimeout(() => navigateToCardScreen(), 200);
  }

  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">StorMind</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false} className="loading-content">
        <div className="wrapper">
          <h1 className="retrieving-text">Retrieving Cards</h1>
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
