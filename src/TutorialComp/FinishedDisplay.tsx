import { useHistory } from "react-router";
import { IonButton, IonText } from "@ionic/react";
import "./FinishedDisplay.css";

const FinishedDisplay: React.FC<{
  isTutorial: boolean;
  enterScreen: () => void;
}> = ({ isTutorial, enterScreen }) => {
  let screenText: string, buttonText: string, navigateScreen: () => void;
  const history = useHistory();

  // If the message is after tutorial is done
  if (isTutorial) {
    screenText = "You Completed Tutorial!";
    buttonText = "Start Reviewing";
    // Navigate to the CardScreen
    navigateScreen = () => {
      setTimeout(enterScreen, 300);
      history.push("/cardscreen", { from: "tutorial" });
    };
  }
  // If the message is after cards are done a day
  else {
    screenText = "You Finished Cards Today!!!";
    buttonText = "Return to Home";
    // Navigate to the HomeScreen
    navigateScreen = () => {
      enterScreen();
      history.push("/home", { from: "tutorial" });
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
