import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton, isPlatform } from '@ionic/react';
import { useHistory } from 'react-router';

const LogInButton: React.FC = () => {
  const history = useHistory();
  const {loginWithRedirect} = useAuth0();
  const login = async () => {
    await loginWithRedirect({
      async openUrl(url){
        await Browser.open(
          {url, windowName: '_self'}
        )
      }
    })
    history.push('/loading');
  }

  return(
    <>
    <IonButton onClick={login}>Log In</IonButton>
    </>
  )
};

export default LogInButton;