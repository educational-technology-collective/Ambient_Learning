import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import "./TutorialPortal.css";
import { diamond } from "ionicons/icons";
import { MdQuestionMark } from "react-icons/md";
import { useHistory } from "react-router";
import logo from '../../assets/logo.png'
// Tutorial Portal Question Mark
const TutorialPortal: React.FC = () => {
  const history = useHistory();

  const navigateToTutorialScreen = () => {
    history.push("/tutorial");
  };
  return (
    <div className="top-container">
      <img src={logo} alt="logo" className="logo-img"/>
      <IonCard className="tutorial-card" onClick={navigateToTutorialScreen}>
        <IonCardContent className="tutorial-card-content">
          <MdQuestionMark size="1.5em" />
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default TutorialPortal;
