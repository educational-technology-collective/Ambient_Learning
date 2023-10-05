import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import { isPlatform } from "@ionic/react";
import "./Settings.css";
import {
  TbAlertTriangle,
  TbBook,
  TbInfoSquareRoundedFilled,
  TbQuestionMark,
  TbWalk,
} from "react-icons/tb";
import { useHistory } from "react-router";

const Settings: React.FC<{
  toggle: string;
  isHome: boolean;
  openQuestion: (event: any) => void;
  handleHome?: () => void;
  switchToggle: (event: any) => void;
}> = ({ toggle, isHome, openQuestion, handleHome, switchToggle }) => {
  const history = useHistory();
  const isPhone: boolean = isPlatform("hybrid");
  const logoutUri = isPhone
    ? "com.etc.ambientlearning://login"
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
    // On Mobile, we would navigate to the login page ourself and reload the window to refresh
    if (isPhone) {
      // history.push("/login");
      window.location.reload();
    }
    // Clear localStorage to allow next time user potential tutorial page loading
    localStorage.clear();
  };

  const navigateToTutorial = () => {
    history.push("/tutorial", { from: "home" });
  };


  const feedbackClick = (event: any) => {
    openQuestion(event);
    switchToggle(event);
  };

  const deleteAccountClick = async () => {
    if (confirm("Are you sure you want to delete your account")) {
      await alert(
        "We have received your delete request. It will take us at most 2 hours to delete your information form the database. If you have further questions, please email ambientlearning@umich.edu"
      );
      doLogout();
    }
  };

  const link =
    Capacitor.getPlatform() === "ios"
      ? `https://apps.apple.com/us/app/ambient-learning/id6456572536`
      : `https://play.google.com/store/apps/details?id=com.etc.ambientlearning&pcampaignid=APPU_1_ZdnbZNTTL4mfptQPq-ef6A0&pli=1`;
  return (
    <div
      className="dropdown-settings"
      style={{ transform: toggle }}
      id="settings-box"
    >
      <a
        className="column-container"
        href={link}
        style={{ textDecoration: "none" }}
      >
        <TbInfoSquareRoundedFilled size="1.5rem" color="darkgrey" />
        <h4 className="texts">Version: 1.7.1</h4>
      </a>

      {isHome ? (
        <div className="column-container" onClick={navigateToTutorial}>
          <TbBook size="1.5rem" color="darkgrey" />
          <h4 className="texts">Tutorial</h4>
        </div>
      ): null}
      <div className="column-container" onClick={feedbackClick}>
        <TbQuestionMark size="1.5rem" color="darkgrey" />{" "}
        <h4 className="texts">Feedback</h4>
      </div>
      <div className="column-container" onClick={doLogout}>
        <TbWalk size="1.5rem" color="darkgrey" />
        <h4 className="texts">Log Out</h4>
      </div>
      <div className="column-container" onClick={deleteAccountClick}>
        <TbAlertTriangle size="1.5rem" color="red" />
        <h4 className="texts">Delete Account</h4>
      </div>
    </div>
  );
};

export default Settings;
