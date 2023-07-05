import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton } from '@ionic/react';

const LogInButton: React.FC = () => {
  const {loginWithRedirect, loginWithPopup} = useAuth0();
  const login = async () => {
    await loginWithRedirect({
      async openUrl(url){
        await Browser.open(
          {url, windowName: '_self'}
        )
      }
    })
  }

  const { logout } = useAuth0();

  const logoutUri = 'http://localhost:8100';
  const doLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: logoutUri,
      },
      async openUrl(url) {
         // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self"
        });
      }
    });
  };

  return(
    <>
    <IonButton onClick={login}>Log In</IonButton>
    <IonButton onClick={doLogout}>Log Out</IonButton>
    </>
  )
};

export default LogInButton;