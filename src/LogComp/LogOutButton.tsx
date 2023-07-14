import { IonButton, isPlatform } from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { useHistory } from "react-router";
import "./LogButton.css";
const LogOutButton: React.FC = () => {
  const history = useHistory();

  const isPhone = isPlatform("hybrid");
  const logoutUri = isPhone
    ? "ionic.srs://login"
    : "http://localhost:8100/login";

  const { logout } = useAuth0();

  const doLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: logoutUri,
        federated: true,
      },
      async openUrl(url) {
        // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self",
        });
      },
    });
    if (isPhone) {
      history.push("/login");
      window.location.reload();
    }
    localStorage.clear();
  };

  return (
    <IonButton className="log-button logout-button" onClick={doLogout}>
      Log Out
    </IonButton>
  );
};

export default LogOutButton;
