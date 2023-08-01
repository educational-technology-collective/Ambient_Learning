import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

// The ToolBar header with App Name
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
