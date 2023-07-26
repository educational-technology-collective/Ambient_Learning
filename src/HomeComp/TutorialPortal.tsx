import { IonCard, IonCardContent, IonIcon, IonText } from '@ionic/react';
import './TutorialPortal.css'
import { diamond } from 'ionicons/icons';
import { BiBookBookmark } from 'react-icons/bi';
import { useHistory } from 'react-router';

const TutorialPortal: React.FC = () => {
  const history = useHistory();
  
  const navigateToTutorialScreen = () => {
    history.push("/tutorial");
  };
  return(
    <div className="top-container">
    <IonIcon icon={diamond} style={{ fontSize: "3.5em" }}></IonIcon>
    <IonCard
      className="tutorial-card"
      onClick={navigateToTutorialScreen}
    >
      <IonCardContent className="tutorial-card-content">
        <BiBookBookmark size="2em" />
        <IonText className="tutorial-text">Tutorial</IonText>
      </IonCardContent>
    </IonCard>
  </div>
  )
};

export default TutorialPortal;