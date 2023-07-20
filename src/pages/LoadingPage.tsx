import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonText,
} from "@ionic/react";
import "./LoadingPage.css";
import { useHistory } from "react-router-dom";
import { hideBar, showBar } from "../utilities/showTabBar";
import { FiUser } from "react-icons/fi";
import { BiServer } from "react-icons/bi";
import { TbCards, TbPlugConnected } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import AppNameHeader from "./AppNameHeader";

const LoadingPage: React.FC<{
  total: number;
  isFetched: boolean;
  isError: boolean;
  readyLog: boolean;
  handleCardScreen: () => void;
}> = ({ total, isFetched, isError, readyLog, handleCardScreen }) => {
  // Hide the Bottom Tabs for this Page
  useIonViewWillEnter(hideBar);

  // Reload the Bottom Tabs when leaving
  useIonViewWillLeave(showBar);

  const history = useHistory();

  const { user } = useAuth0();

  // Turn loading down and jump to card screen
  const navigateToCardScreen = () => {
    history.push("/cardscreen");
    handleCardScreen();
  };

  const navigateToTutorialScreen = () => {
    history.push("/tutorial");
  };

  const navigateToErrorPage = () => {
    history.push("/error");
  };

  // Set a timeout that will jump to the cardscreen
  const [showLoad, setLoad] = useState(true);

  // Used to keep track of a 4.5s of loading screen at least
  const [timeElapsed, setTimeElapsed] = useState(false);

  const animationTimeOut = () => {
    setTimeElapsed(true);
  };

  console.log(timeElapsed);

  useEffect(() => {
    // When still showing loading component, set a timeout of 4.5s
    if (showLoad) {
      setTimeout(animationTimeOut, 4500);
    } else {
      // If there is error
      if (isError) {
        setTimeout(navigateToErrorPage, 100);
      }
      // Check there is user. User is first time and there is no local storage
      else if (
        user !== undefined &&
        user["mobile_first_time"] &&
        localStorage.getItem("mobile_first_time") === null
      ) {
        // Set Local Storage so it won't jump to tutorial screen when refreshing
        localStorage.setItem("mobile_first_time", "false");
        setTimeout(navigateToTutorialScreen, 150);
      }
      // If the user is not first time, navigate to card screen.
      else {
        //  setTimeout(navigateToCardScreen, 250);
      }
    }
  }, [showLoad]);

  // Check to see if the retrieval is complete:
  // (1) When fetching is succesful(isFetched is true): we then check if there
  // is no card available or if there is card and readyLog is true(this means either POST and Iinitialize or PUT RESUME is complete)
  // (2) When we have a fetching error
  let retrievalComplete = (isFetched && (!total || readyLog)) || isError;

  // Check to see if navigating to the card screen:
  // First Time of Loading Page, the progress bar has reached 1, and retrieval is complete
  let finishLoading = showLoad && timeElapsed && retrievalComplete;

  // Set showLoad to be false to trigger useEfect
  if (finishLoading) {
    setLoad(false);
  }

  return (
    <IonPage>
      {/* Header and ToolBar */}
      <AppNameHeader />

      <IonContent scrollY={false} className="loading-content">
        <div className="wrapper">
          <div className="walking">
            <div className="head"></div>
            <div className="body"></div>
            <div className="firstLeg"></div>
            <div className="secondLeg"></div>
            <div className="shadow"></div>
          </div>
          <div className="segment-container">
            <div className="dot-bricks user-bricks"></div>
            <AiOutlineCheck size="3em" className="check user-check" />
            <FiUser size="3em" className="segment-icon" />
            <IonText className="segment-text">Authenticating User</IonText>
          </div>
          <div className="segment-container server-container">
            <div className="dot-bricks server-bricks"></div>
            <AiOutlineCheck size="3em" className="check server-check" />
            <BiServer className="segment-icon" size="3em" />
            <IonText className="segment-text">Connecting to Server</IonText>
          </div>
          <div className="segment-container cards-container">
            <div className="dot-bricks cards-bricks"></div>
            <AiOutlineCheck size="3em" className="check cards-check" />
            <TbCards className="segment-icon" size="3em" />
            <IonText className="segment-text">Retrieving Cards</IonText>
          </div>
          <div className="segment-container deck-container">
            {showLoad ? (
              <div className="dot-bricks deck-bricks"></div>
            ) : (
              <AiOutlineCheck size="3em" className="check" />
            )}
            <TbPlugConnected className="segment-icon" size="3em" />
            <IonText className="segment-text">Configurating Deck</IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default LoadingPage;
