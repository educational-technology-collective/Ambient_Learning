import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css'


const Home : React.FC = () => {

  return(
    <IonPage>
      <IonHeader color='tertiary'>
        <IonToolbar>
          <IonTitle className='title'>Eidetic</IonTitle>
        </IonToolbar>
        <IonContent fullscreen scrollY={false}>
          <IonButton routerLink='/cardscreen'>Check</IonButton>
        </IonContent>
      </IonHeader>
    </IonPage>
  )
};

export default Home;