import { useHistory } from "react-router";
import { IonButton, IonText } from "@ionic/react";
import './FinishedDisplay.css'

const FinishedDisplay: React.FC = () => {
  const history = useHistory();
  const navigateToHome = () => {
    history.push('/home');
  }
  return(
    <div className='finished-container'>
      <IonText className="compliment-text">
        Great Job!
      </IonText>
      <IonText className="compliment-text">You Finished Cards Today!!!</IonText>
      <IonButton className="button" onClick={navigateToHome}>Return to Home Screen</IonButton>
    </div>
  )
};

export default FinishedDisplay;