import {
  IonContent,
  IonPage,
  IonText,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import "./ErrorPage.css";
import "../ButtonComp/Button.css";
import errorPic from "../../error.png";
import { hideBar, showBar } from "../utilities/showTabBar";
import LogOutButton from "../ButtonComp/LogOutButton";
import TryAgainButton from "../ButtonComp/TryAgainButton";

const ErrorPage: React.FC = () => {
  // Hide the Bottom Tabs when entering the page
  useIonViewWillEnter(hideBar);

  // Show the bottom tabs when leaving the page
  useIonViewWillLeave(showBar);
  return (
    <IonPage>
      <IonContent scrollY={false} className="error-content">
        <div className="error-container">
          <img src={errorPic} className="error-image" />
          <IonText className="error-message">
            Ooops...<br></br>An Error Occured:({" "}
          </IonText>

          {/* TryAgainButton and ReportIssueButton */}
          <div className="two-button-container">
            <TryAgainButton />
            <a
              href="https://github.com/educational-technology-collective/Space-Repetition-Ionic/issues"
              className="grad-button report-issue-button"
            >
              Report Issue
            </a>
          </div>

          {/* Log Out Button */}
          <LogOutButton />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;
