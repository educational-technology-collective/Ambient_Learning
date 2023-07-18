import { IonContent, IonPage, IonText, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import './ErrorPage.css'
import '../ButtonComp/Button.css'
import errorPic from "../../error.png"
import { hideBar, showBar } from "../utilities/showTabBar";
import LogOutButton from "../ButtonComp/LogOutButton";
import TryAgainButton from "../ButtonComp/TryAgainButton";

const ErrorPage : React.FC = () => {
  useIonViewWillEnter(hideBar)
  useIonViewWillLeave(showBar)
  return(
    <IonPage>
      <IonContent scrollY={false} className="error-content">
        <div className="error-container">
        <img src={errorPic} className='error-image'/>
        <IonText className="error-message">Ooops...<br></br>An Error Occured:( </IonText>
        <div className="two-button-container">
        <TryAgainButton/>
        <a href='https://github.com/educational-technology-collective/Space-Repetition-Ionic/issues' className="grad-button report-issue-button">Report Issue</a>
        </div>
        <LogOutButton/>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default ErrorPage;