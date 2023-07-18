import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import "./LogButton.css";
const LogInButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
        await Browser.open({ url, windowName: "_self" });
      },
    });
  };

  return (
    <>
      <button onClick={login} className="log-button login-button">
        Sign In
      </button>
    </>
  );
};

export default LogInButton;
