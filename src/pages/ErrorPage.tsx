import { IonButton, IonContent, IonPage, IonText, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import './ErrorPage.css'
import errorPic from "../../error.png"
import { hideBar, showBar } from "../utilities/showTabBar";

const ErrorPage : React.FC = () => {
  useIonViewWillEnter(hideBar)
  useIonViewWillLeave(showBar)
  return(
    <IonPage>
      <IonContent scrollY={false} className="error-content">
        <div className="error-container">
        <img src={errorPic} className='error-image'/>
        <IonText className="error-message">Ooops...<br></br>An Error Occured:( </IonText>
        <button className="btn-grad">Try Again</button>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default ErrorPage;