import { IonContent, IonPage, IonText } from "@ionic/react";
import './ErrorPage.css'
import errorPic from "../../error.png"

const ErrorPage : React.FC = () => {
  return(
    <IonPage>
      <IonContent scrollY={false} className="home-content">
        <div className="error-container">
        <img src={errorPic} className='error-image'/>
        <IonText>Ooops... An Error Occured:( </IonText>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default ErrorPage;