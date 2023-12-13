import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { TbSettings } from "react-icons/tb";
import "./AppNameHeader.css";

// The ToolBar header with App Name
const AppNameHeader: React.FC<{
  isHome?: boolean;
  switchSettings?: (event: any) => void;
}> = ({ isHome = false, switchSettings }) => {
  console.log('RENDERING APP NAME HEADER')
  return (
    <IonHeader color="tertiary">
      <IonToolbar className="header-container" id="header">
        <IonTitle className="title">Ambient Learning</IonTitle>
        {isHome ? (
          <TbSettings
            className="settings-icon"
            onClick={switchSettings}
            id="settings-icon"
          />
        ) : null}
      </IonToolbar>
    </IonHeader>
  );
};

export default AppNameHeader;
