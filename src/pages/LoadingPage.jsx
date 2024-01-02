import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonText,
} from "@ionic/react";
import "./LoadingPage.css";
import { useHistory } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { BiServer } from "react-icons/bi";
import { TbCards, TbPlugConnected } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import AppNameHeader from "./AppNameHeader.tsx";
import logo from "../../assets/logo.png";

import LoadingSegement from "../LoadingComp/LoadingSegment.jsx";

const segments = [
  {icon: <FiUser size="3em" className="segment-icon" />, text: "Authenticating User", type: "user"},
  {icon: <BiServer className="segment-icon" size="3em" />, text: "Connecting to Server", type: "server"},
  {icon: <TbCards className="segment-icon" size="3em" />, text: "Retrieving Cards", type: "cards"},
]

const LoadingPage = ({
  total,
  isFetched,
  isError, 
  noCardsInDb,
  readyLog,
  handleCardScreen,
}) => {
 

  const history = useHistory();

  const { user } = useAuth0();

  const navigateTo = (path) => {
    history.push(path, { from: "loading" });
  };

  // Navigate to cardscreen and spread the cards icon
  const navigateToCardScreen = () => {
    history.push("/cardscreen", { from: "loading" });
    setTimeout(handleCardScreen, 300);
  };

  // Set a timeout that will jump to the cardscreen
  const [showLoad, setLoad] = useState(true);

  // State Variable used to keep track of a 4.5s of loading screen at least
  const [timeElapsed, setTimeElapsed] = useState(false);

  // Handler that sets the timeElapsed variable to be true
  const animationTimeOut = () => {
    setTimeElapsed(true);
  };

  useEffect(() => {
    // When still showing loading component, set a timeout of 4.5s
    if (isError) {
      setTimeout(navigateTo('/error'), 100);
    } else if (showLoad) {
      setTimeout(animationTimeOut, 4500);
      return;
    } else if (noCardsInDb) {
      setTimeout(navigateTo('/tutorial'), 100);
    } else if (
      user !== undefined &&
      user["mobile_first_time"] &&
      localStorage.getItem("mobile_first_time") === null
    ) {
      // Set Local Storage so it won't navigate to tutorial screen when refreshing next time
      localStorage.setItem("mobile_first_time", "false");
      setTimeout(navigateTo('/tutorial'), 150);
    } else {
      setTimeout(navigateToCardScreen, 250);
    }
    
  }, [showLoad]);

  // Check to see if the retrieval is complete:
  // (1) When fetching is succesful(isFetched is true): we then check if there
  // is no card available or if there is card and readyLog is true(this means either POST and Iinitialize or PUT RESUME is complete)
  // (2) When we have a fetching error
  let retrievalComplete = (isFetched && (!total || readyLog)) || isError;

  // Check to see if ready to navigate:
  // First Time of Loading Page, time has reached at least 4.5s, and retrieval is complete
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
          {/* Walking Person Component */}
          {/* <WalkingPerson /> */}
          <img src={logo} alt="logo-pic" className="logo-pic" />

          {segments.map((segment, index) => {
            return (
              <LoadingSegement
                key={index}
                icon={segment.icon}
                text={segment.text}
                type={segment.type}
                showLoad={showLoad}
              />
            );
          })}

          

          {/* Segment for Configurating Deck.  */}
          <div className="segment-container deck-container">
            {/* If not ready yet, keeps loading the dots, loading the check otherwise */}
            {showLoad ? (
              <div className="dot-bricks deck-bricks"></div>
            ) : (
              <AiOutlineCheck size="3em" className="check" />
            )}
            <TbPlugConnected className="segment-icon" size="3em" />
            <IonText className="segment-text">Shuffling Deck</IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default LoadingPage;
