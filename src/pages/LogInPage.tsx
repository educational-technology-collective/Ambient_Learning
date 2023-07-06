import { IonPage, IonHeader, IonContent, IonTitle, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useEffect } from 'react';
import { User, useAuth0 } from '@auth0/auth0-react';
import './LogInPage.css'
import LogInButton from '../LogInComp/LogInButton';
import { useHistory } from 'react-router';
import { hideBar, showBar } from '../utilities/showTabBar';
import AppNameHeader from './AppNameHeader';

const LogInPage: React.FC = () => {

  // Hide the bottom tabs when entering the login page
  useIonViewWillEnter(hideBar);

  // Display the bottom tabs when leaving the login page
  useIonViewWillLeave(showBar);

  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();



  return(
    <IonPage>
      <AppNameHeader />
      <IonContent scrollY={false} >
      <LogInButton />
      </IonContent>
    </IonPage>
  )
}

export default LogInPage;