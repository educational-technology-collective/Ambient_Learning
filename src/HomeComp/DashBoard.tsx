import { IonCard, IonCardContent, IonCardTitle, IonText } from "@ionic/react";
import "./DashBoard.css";

// Today's Task Dashboard
const DashBoard: React.FC<{
  cardsLeft: number;
  shadow: string;
  navigateToCardScreen: () => void;
}> = ({ cardsLeft, shadow, navigateToCardScreen }) => {
  return (
    <IonCard className="task-card">
      <IonCardContent className="remaining-content">
        <IonText className="today-task">Today's Task:</IonText>

        {/* Determine if the cards are done */}
        {cardsLeft !== 0 ? (
          <>
            <IonCardTitle className="cards-remaining">
              Cards Remaning:
            </IonCardTitle>
            <IonCard className={shadow} onClick={navigateToCardScreen}>
              <IonCardContent className="wrapped-card-content">
                <IonText className="today-task">{cardsLeft}</IonText>
              </IonCardContent>
            </IonCard>
          </>
        ) : (
          <IonText className="finish-task">
            You are done with cards. Go touch grass, bravo!
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default DashBoard;
