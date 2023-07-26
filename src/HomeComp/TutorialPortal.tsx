import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import "./TutorialPortal.css";
import { diamond } from "ionicons/icons";
import { MdQuestionMark } from "react-icons/md";
import { useHistory } from "react-router";

// Tutorial Portal Question Mark
const TutorialPortal: React.FC = () => {
  const history = useHistory();

  const navigateToTutorialScreen = () => {
    history.push("/tutorial");
  };
  return (
    <div className="top-container">
      <IonIcon icon={diamond} style={{ fontSize: "3.5em" }}></IonIcon>
      <IonCard className="tutorial-card" onClick={navigateToTutorialScreen}>
        <IonCardContent className="tutorial-card-content">
          <MdQuestionMark size="1.5em" />
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default TutorialPortal;
