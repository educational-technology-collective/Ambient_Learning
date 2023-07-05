import { useHistory } from "react-router";
import { IonButton, IonText } from "@ionic/react";
import "./FinishedDisplay.css";

const FinishedDisplay: React.FC<{ isTutorial: boolean }> = ({ isTutorial }) => {
  const history = useHistory();
  let screenText, buttonText, navigateScreen;

  if (isTutorial) {
    screenText = "You Completed Tutorial!";
    buttonText = "Start Reviewing";
    navigateScreen = () => {
      history.push("/cardscreen");
    };
  } else {
    screenText = "You Finished Cards Today!!!";
    buttonText = "Return to Home";
    navigateScreen = () => {
      history.push("/home");
    };
  }
  return (
    <div className="finished-container">
      <IonText className="compliment-text">Great Job!</IonText>
      <IonText className="compliment-text">{screenText}</IonText>
      <IonButton className="button-for-home" onClick={navigateScreen}>
        {buttonText}
      </IonButton>
    </div>
  );
};

export default FinishedDisplay;
