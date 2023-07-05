import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

const AppNameHeader: React.FC = () => {
  return (
    <IonHeader color="tertiary">
      <IonToolbar>
        <IonTitle className="title">StorMind</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppNameHeader;
