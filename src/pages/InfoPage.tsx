import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import './InfoPage.css'
import { hideBar } from "../utilities/showTabBar";
const InfoPage: React.FC = () => {

  // Hide the bottom tabs whene entering the page
  useIonViewWillEnter(hideBar);

  return(
    <IonPage>
      <IonContent scrollY={false} className="info-content">

      </IonContent>
    </IonPage>
  )
};

export default InfoPage;