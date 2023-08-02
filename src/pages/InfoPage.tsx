import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import "./InfoPage.css";
import { hideBar } from "../utilities/showTabBar";
import logo from '../../assets/logo.png'

const InfoPage: React.FC = () => {
  // Hide the bottom tabs whene entering the page
  useIonViewWillEnter(hideBar);

  return (
    <IonPage>
      <IonContent fullscreen className="info-content">
        <div className="info-container">
          <img src={logo} alt="logo"/>
          <h1>Hi! It looks like you are new!</h1>
          <h2>Here are some ways to get cards!</h2>
          <a
            className="grad-button"
            href="https://github.com/educational-technology-collective/srs-chrome-extension"
            style={{ color: "black", textDecoration: "none" }}
          >
            Click me for Chrome
          </a>
          <a
            className="grad-button"
            href="https://github.com/educational-technology-collective/srs-jupyterlab-extension"
            style={{ color: "black", textDecoration: "none" }}
          >
            Click me for Jupyter
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InfoPage;
