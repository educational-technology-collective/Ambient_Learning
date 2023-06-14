import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css'


const Home : React.FC = () => {

  return(
    <IonPage>
      <IonHeader color='tertiary'>
        <IonToolbar>
          <IonTitle>Space Repetition Learner</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  )
};

export default Home;