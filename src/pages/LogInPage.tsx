import { IonPage, IonHeader, IonContent, IonTitle, IonToolbar } from '@ionic/react'
import './LogInPage.css'

const LogInPage: React.FC = () => {
  return(
    <IonPage>
      {/* Header and ToolBar */}
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">Log In</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false} className="home-content">
        <div></div>
      </IonContent>
    </IonPage>
  )
}

export default LogInPage;