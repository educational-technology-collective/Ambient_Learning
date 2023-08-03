import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import "./InfoPage.css";
import { hideBar } from "../utilities/showTabBar";
import logo from '../../assets/logo.png'
import {SiJupyter, SiGooglechrome} from 'react-icons/si'
import LogOutButton from "../ButtonComp/LogOutButton";
const InfoPage: React.FC = () => {
  // Hide the bottom tabs whene entering the page
  useIonViewWillEnter(hideBar);

  return (
    <IonPage>
      <IonContent fullscreen className="info-content">
        <div className="info-container">
          <img src={logo} alt="logo" className="maple-img"/>
          <h1>Hi! It looks like you are new!</h1>
          <h2 className="h2-text">Here are some ways to get cards!</h2>
          <SiGooglechrome className="extension-icon"/>
          <a
            className="grad-button"
            href="https://github.com/educational-technology-collective/srs-chrome-extension"
            style={{ color: "black", textDecoration: "none", backgroundColor: 'snow' }}
          >
            Click me for Chrome
          </a>
          <SiJupyter className="extension-icon"/>
          <a
            className="grad-button"
            href="https://github.com/educational-technology-collective/srs-jupyterlab-extension"
            style={{ color: "black", textDecoration: "none", background: 'snow' }}
          >
            Click me for Jupyter
          </a>
          <LogOutButton />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InfoPage;
