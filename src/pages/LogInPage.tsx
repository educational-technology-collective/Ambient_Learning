import {
  IonPage,
  IonContent,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import "./LogInPage.css";
import LogInButton from "../LogInComp/LogInButton";
import { hideBar, showBar } from "../utilities/showTabBar";
import spacecraft from '../../spacecraft.svg'

const LogInPage: React.FC = () => {
  // Hide the bottom tabs when entering the login page
  useIonViewWillEnter(hideBar);

  // Display the bottom tabs when leaving the login page
  useIonViewWillLeave(showBar);

  return (
    <IonPage>
      <IonContent scrollY={false} className="login-content">
        <div className="login-page-container">
          <img src={spacecraft} alt='Spacecraft' className="space-craft"/>
        <div className='welcome-container'>
        <h1 className="welcome-text">Hi, Welcome<span className="welcome-covering"></span></h1>
        </div>
        <div>
        <h2 className='description-text'>Enlarge Brain Through <i>Flashcards</i></h2>
        </div>
        <LogInButton />
        </div>   
      </IonContent>
    </IonPage>
  );
};

export default LogInPage;
