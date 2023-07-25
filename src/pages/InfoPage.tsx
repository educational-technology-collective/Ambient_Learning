import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import "./InfoPage.css";
import { hideBar } from "../utilities/showTabBar";
const InfoPage: React.FC = () => {
  // Hide the bottom tabs whene entering the page
  useIonViewWillEnter(hideBar);

  return (
    <IonPage>
      <IonContent fullscreen className="info-content">
        <div className="info-container">
          <h1>Hi! It looks like you are new</h1>
          <a
            className="grad-button"
            href="https://github.com/educational-technology-collective/srs-chrome-extension"
            style={{ color: "black" }}
          >
            Click me for Chrome
          </a>
          <a
            className="grad-button"
            href="https://github.com/educational-technology-collective/srs-jupyterlab-extension"
            style={{ color: "black" }}
          >
            Click me for Jupyter
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InfoPage;
