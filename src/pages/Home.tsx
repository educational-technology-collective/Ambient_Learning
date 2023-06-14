import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css'
import { homeOutline } from 'ionicons/icons';


const Home : React.FC = () => {

  return(
    <IonPage>
      <IonHeader color='tertiary'>
        <IonToolbar>
          <IonTitle>Space Repetition Learner</IonTitle>
        </IonToolbar>
        <IonContent fullscreen scrollY={false}>
          <IonButton routerLink='/cardscreen'>Check</IonButton>
        </IonContent>
      </IonHeader>
    </IonPage>
  )
};

export default Home;