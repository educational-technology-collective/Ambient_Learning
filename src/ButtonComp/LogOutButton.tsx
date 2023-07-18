import { isPlatform } from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { useHistory } from "react-router";
import "./Button.css";
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
    // On Mobile, we would navigate to the login page ourself and reload the window
    if (isPhone) {
      history.push("/login");
      window.location.reload();
    }
    // Clear localstorage to allow next time user potential tutorial page loading
    localStorage.clear();
  };

  return (
    <button className="grad-button log-button logout-button" onClick={doLogout}>
      Log Out
    </button>
  );
};

export default LogOutButton;
