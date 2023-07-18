import { IonButton, IonContent, IonPage, IonText, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import './ErrorPage.css'
import errorPic from "../../error.png"
import { hideBar, showBar } from "../utilities/showTabBar";
import LogOutButton from "../LogComp/LogOutButton";

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
        <button className="try-again-button">Try Again</button>
        <a href='https://github.com/educational-technology-collective/Space-Repetition-Ionic/issues' className="report-issue-button">Report Issue</a>
        </div>
        <LogOutButton/>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default ErrorPage;