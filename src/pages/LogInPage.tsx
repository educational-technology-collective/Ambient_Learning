import { IonPage, IonHeader, IonContent, IonTitle, IonToolbar } from '@ionic/react'
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useEffect } from 'react';
import { User, useAuth0 } from '@auth0/auth0-react';
import './LogInPage.css'
import LogInButton from '../LogInComp/LogInButton';
import { useHistory } from 'react-router';

const LogInPage: React.FC = () => {

  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();

  console.log(isAuthenticated);
  console.log(user)

  return(
    <IonPage>
      <IonContent scrollY={false} fullscreen className="home-content">
       <LogInButton />
      </IonContent>
    </IonPage>
  )
}

export default LogInPage;