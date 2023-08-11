import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import {TbSettings} from 'react-icons/tb'
import './AppNameHeader.css'
import { useState } from "react";
// The ToolBar header with App Name
const AppNameHeader: React.FC<{isHome?: boolean}> = ({isHome=false}) => {
  const [toggle, setToggle] = useState(false);

  const switchToggle = () => {
    setToggle(!toggle);
  }
  return (
    <IonHeader color="tertiary">
      <IonToolbar className="header-container">
        <IonTitle className="title">Ambient</IonTitle>
        {isHome? <TbSettings className="settings-icon" onClick={switchToggle}/>: null}
      </IonToolbar>
    </IonHeader>
  );
};

export default AppNameHeader;
