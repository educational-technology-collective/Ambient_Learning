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
import { hideBar, showBar } from "../utilities/showTabBarAndButtons";
import LogOutButton from "../ButtonComp/LogOutButton";
import TryAgainButton from "../ButtonComp/TryAgainButton";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

const ErrorPage: React.FC<{accessToken: string}> = ({accessToken}) => {
  const [showFeedback, setFeedback] = useState("translateY(-120%)");

  const switchFeedback = (event: any) => {
    event.stopPropagation();
    showFeedback === "translateY(-120%)"
      ? setFeedback("translateY(0)")
      : setFeedback("translateY(-120%)");
  };
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

            <button
              className="grad-button report-issue-button"
              onClick={switchFeedback}
            >
              Report Issue
            </button>
          </div>

          {/* Log Out Button */}
          <LogOutButton />
        </div>
        <FeedbackModal showFeedback={showFeedback} closeQuestion={switchFeedback} accessToken={accessToken} identifier="Error Page"/>
      </IonContent>
     
    </IonPage>
  );
};

export default ErrorPage;
