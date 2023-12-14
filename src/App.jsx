import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  setupIonicReact,
  IonTabButton,
  isPlatform,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { TbHomeEdit } from "react-icons/tb";
import { Haptics } from "@capacitor/haptics";
import React, { useEffect, useState } from "react";
import CardScreen from "./pages/CardScreen";
import Home from "./pages/Home";
import "./pages/Home.css";
import "./App.css";
import { CapacitorHttp } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { Toast } from "@capacitor/toast";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import CardsTab from "./IndicationComp/CardsTab";
import LoadingPage from "./pages/LoadingPage";
import { getLatestRecord, putSessionFinished } from "./utilities/logfunction";
import LogInPage from "./pages/LogInPage";

import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";

import { useAuth0 } from "@auth0/auth0-react";
import TutorialPage from "./pages/TutorialPage";
import ErrorPage from "./pages/ErrorPage";
import InfoPage from "./pages/InfoPage";
import { cardWrite, collectionCard } from "./utilities/initialCardsAmbientDev";
setupIonicReact({
  swipeBackEnabled: false,
});

import { AuthStore } from "./state"

const App = () => {
  console.log('RENDERING APP')
  const { isAuthenticated, isLoading, user, getAccessTokenSilently, logout } =
    useAuth0();
  const { handleRedirectCallback } = useAuth0();

  // For Auth0 login and close
  useEffect(() => {
    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    CapApp.addListener("appUrlOpen", async ({ url }) => {
      if (
        url.includes("state") &&
        (url.includes("code") || url.includes("error"))
      ) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  }, [handleRedirectCallback]);

  // User_Id and Time State Variable used for Quary
  // const [userId, setUser] = useState("");
  const userId = AuthStore.userId.value;
  const [startTime, setTime] = useState("");

  // State Variable used for session stats
  const [stats, setStatistics] = useState({
    total: 0,
    duration: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    know: 0,
    dontKnow: 0,
    oneMore: 0,
    poorCard: 0,
  });

  // Update the stats variable if user swipes
  const handleStatisticsUpdate = (testEval, selfEval) => {
    if (
      testEval === "correct" ||
      testEval === "incorrect" ||
      testEval === "skipped"
    ) {
      if (
        selfEval === "know" ||
        selfEval === "dontKnow" ||
        selfEval === "oneMore" ||
        selfEval === "poorCard"
      )
        setStatistics((stats) => ({
          ...stats,
          total: stats.total + 1,
          [testEval]: stats[testEval] + 1,
          [selfEval]: stats[selfEval] + 1,
        }));
    } else {
      if (
        selfEval === "know" ||
        selfEval === "dontKnow" ||
        selfEval === "oneMore" ||
        selfEval === "poorCard"
      )
        setStatistics((stats) => ({
          ...stats,
          total: stats.total + 1,
          [selfEval]: stats[selfEval] + 1,
        }));
    }
  };

  // Update the session duration when it finishes
  const handleDuration = (minutes) => {
    setStatistics((stats) => ({ ...stats, duration: minutes }));
  };

  // readyLog used to determine if initialize/resume is logged so we can navigate to card screen
  const [readyLog, setReadyLog] = useState(false);

  // Handler that sets readyLog variable to be true
  const handleReadyLog = () => {
    setReadyLog(true);
  };

  // Handler that sets the start time
  const handleStartTime = (givenTime) => {
    setTime(givenTime);
  };

  // PUT Request that push information to the action_container
  const putLogInfo = async (event, endTime ) => {
    const dataStream = {
      action: event,
      endTime: endTime,
    };
    const response = await CapacitorHttp.put({
      url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?userId=${user.email}&startTime=${startTime}`,
      data: dataStream,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Put Response", response);
  };

  // State Variable to indicate whether data is fetched
  const [isFetched, setFetched] = useState(false);

  // The Card Array
  const [cardCol, setCards] = useState([[]]);

  // How Many Cards in total
  const [total, setTotal] = useState(0);

  // How Many Cards Finished
  const [finished, setFinished] = useState(0);

  // Number of Cards Remaining
  let cardsLeft = total - finished;

  // Counter used to display certain cards(different tuples)
  const [counter, setCounter] = useState(0);

  // Tuple Counter for One More Cards(within one tuple)
  const [tupleCounter, setTupleCounter] = useState(0);

  // AccessToken used for authorization requests
  // const [accessToken, setToken] = useState("");
  const accessToken = AuthStore.accessToken.value;

  const isPhone = isPlatform("hybrid");
  const logoutUri = isPhone
    ? "com.etc.ambientlearning://login"
    : "http://localhost:8100/login";

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

  // Handler Function that get accessToken
  const tokenHandler = async () => {
    try {
      const token = await getAccessTokenSilently();
      // if (token !== "" && token !== undefined) setToken(token);
      if (token !== "" && token !== undefined) {
        AuthStore.updateAccessToken(token);
        return token;
      } else {
        doLogout();
      }
    } catch (e) {
      doLogout();
    }
  };
  // Run useEffect to get token and set user_id as long as isAuthenticated is changed
  useEffect(() => {

    const init = async () => {
      const token = await tokenHandler();
      const cardsLength = await getCards(
        `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/${user.email}/fcs/now`
      );
      await getLatestRecord(
        user.email,
        token,
        cardsLength,
        handleStartTime,
        handleReadyLog,
        handleDuration,
        handleStatisticsUpdate
      );
    }
    if (isAuthenticated && user !== undefined && user.email !== undefined) {
      console.log('AUTH0 USER OBJECT:', user)

      // setUser(user.email);
      AuthStore.updateUser(user.email)
      init();
    }
  }, [isAuthenticated]);

  // Initialize the Log Info if the user is signed and cardcollection is not empty
  // useEffect(() => {
  //   if (isAuthenticated && cardCol[0].length && accessToken !== "" && user.email !== "") {
  //     console.log('INITIALIZING LOG INFO')
  //     getLatestRecord(
  //       user.email,
  //       accessToken,
  //       total,
  //       handleStartTime,
  //       handleReadyLog,
  //       handleDuration,
  //       handleStatisticsUpdate
  //     );
  //   }
  // }, [isAuthenticated, cardCol[0].length, accessToken]);

  // State Variable to check if there is error fetching and flagging for redirecting to error page
  const [isError, setError] = useState(false);

  // State Variabke to check if there is no this user in the DataBase
  // const [noUser, setNoUser] = useState(false);

  // State Variable to check if the user never has any cards in the DataBase
  const [noCardsInDb, setNoCardsInDb] = useState(false);

  // GET Function for fetching cards
  const getCards = async (url) => {
    let cardsLen = 0;
    try {
      let response = await CapacitorHttp.get({ url: url });
      console.log(response);
      let data = await JSON.parse(response.data);

      // Set Fetched Status to be True
      setFetched(true);

      // If fetching successfully(status not equal to 500)
      if (response.status !== 500) {
        // See how many cards in total the user has in the database
        // If there is card available. Update the info
        let cards = data;
        cardsLen = cards.length;
        // Randomize cards within each LM
        if (cards.length !== 0) {
          for (let i = cards.length - 1; i > 0; i--) {
            for (let j = cards[i].length - 1; j > 0; j--) {
              let k = Math.floor(Math.random() * (j + 1));
              let temp = cards[i][j];
              cards[i][j] = cards[i][k];
              cards[i][k] = temp;
            }
          }

          setCards(cards);
          setTotal(cards.length);
          setCounter(cards.length);
          setTupleCounter(cards[cards.length - 1].length);
        }
      }
      // If ther is no this user in the database
      else if (data === "no user found") {
        const postResponse = await CapacitorHttp.post({
          url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/${user.email}`,
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(postResponse)
        response = await CapacitorHttp.get({url: url})
        console.log(response)
        let cards = await JSON.parse(response.data)
        if (cards.length !== 0) {
          for (let i = cards.length - 1; i > 0; i--) {
            for (let j = cards[i].length - 1; j > 0; j--) {
              let k = Math.floor(Math.random() * (j + 1));
              let temp = cards[i][j];
              cards[i][j] = cards[i][k];
              cards[i][k] = temp;
            }
          }

          setCards(cards);
          setTotal(cards.length);
          setCounter(cards.length);
          setTupleCounter(cards[cards.length - 1].length);
        }

      } else if (data === "user has no lms") {
        setNoCardsInDb(true);
      } else {
        console.log("There is Error");
        setError(true);
      }
    } catch (error) {
      console.log("There is Error");
      setError(true);
    }
    return cardsLen;
  };

  // ISSUE: useEffect not needed if we just use the getCards during the isAuthenticated useEffect above
  // UseEffect to fetch the cards as long as user_Id is updated
  // useEffect(() => {
  //   if (user.email !== "") {
  //     getCards(
  //       `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/${user.email}/fcs/now`
  //     );
  //   }
  // }, [user]);

  // Card-Stacker Visual Effect. Will shake screen when it's true
  const [isShake, setShake] = useState(false);

  // State Variable used to track if the current tab is cardscreen
  const [isCardScreen, setCardScreen] = useState(false);

  // Card Screen will spread the cards
  const handleCardScreen = () => {
    setCardScreen(true);
  };

  // Home Screen will fold the cards
  const handleHomeScreen = () => {
    setCardScreen(false);
  };

  // Handler that set the card-stacker back without shaking
  const handleShake = () => {
    // Set Shake to be true. Enables visual shaking and modal
    setShake(true);

    // Log Session is Finished. 350ms delay so session finished is logged last
    if (finished === total - 1) {
      setTimeout(
        () => putSessionFinished(startTime, handleDuration, putLogInfo),
        350
      );
    }

    // Set Timeout of 2.2 seconds(consistent with animation time)
    setTimeout(() => setShake(false), 2200);
  };

  // Function that update the card information
  const putCardInfo = async (lm_id, latestRecord) => {
    // Pass the card's id and the latest review result including tapResult and swipeResult
    const dataStream = {
      lm_id: lm_id,
      latestRecord: latestRecord,
    };
    const response = await CapacitorHttp.put({
      url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/${user.email}/${lm_id}`,
      data: dataStream,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Update Card Response", response);
  };

  // Logic to Move On to Next Card
  const swipeNextCard = (
    tupleIndex,
    event,
    lm_id,
    isBuffer,
    latestRecord
  ) => {
    // Increment the number of finished cards and the counter of displaying card
    setFinished((prevFinished) => prevFinished + 1);
    setCounter((prevCounter) => prevCounter - 1);
    // If the current tuple is not the last one, reset the counter of tuple
    // to the next array's length
    if (tupleIndex > 0) {
      setTupleCounter(cardCol[tupleIndex - 1].length);
    }

    // Log Info for Positive/No More/Negative
    putLogInfo(event, null);

    // Log Info for swiping cards
    if (!isBuffer) {
      putCardInfo(lm_id, latestRecord);
    }

    // Log Session is Finished. 350ms delay so it's logged last
    if (finished === total - 1) {
      setTimeout(
        () => putSessionFinished(startTime, handleDuration, putLogInfo),
        350
      );
    }
  };

  // Function that swipes for one more card
  const swipeOneMoreCard = (
    tupleIndex,
    event,
    lm_id,
    isBuffer,
    latestRecord
  ) => {
    // Log One More Info
    putLogInfo(event, null);

    if (!isBuffer) {
      putCardInfo(lm_id, latestRecord);
    }
    // If there is no more card available for this card
    if (tupleCounter === 1) {
      // If the current tuple is not the last one, reset the counter of tuple
      // to the next array's length
      if (tupleIndex > 0) {
        setTupleCounter(cardCol[tupleIndex - 1].length);
      }
      // Physical Vibration of device
      Haptics.vibrate({ duration: 500 });

      // Visual Vibration
      handleShake();
      setFinished((prevFinished) => prevFinished + 1);
      setCounter((prevCounter) => prevCounter - 1);
    } else {
      setFinished((prevFinished) => prevFinished + 1);
      setTotal((prevTotal) => prevTotal + 1);

      // Decrement the Tuple Counter to access the next card within same tuple
      setTupleCounter((prevTupleCounter) => prevTupleCounter - 1);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      PushNotifications.checkPermissions().then((res) => {
        if (res.receive !== "granted") {
          PushNotifications.requestPermissions().then((res) => {
            if (res.receive === "denied") {
              showToast("Notification Disabled");
            } else {
              showToast("Notification Enabled");
              register();
            }
          });
        } else {
          register();
        }
      });
    }
  }, [isAuthenticated]);

  // Return the Log In Page if it's not authenticated and not loading
  // Technically "Buggy", but works as intended
  if (!isAuthenticated && !isLoading) {
    return <LogInPage />;
  }

  const register = () => {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener("registration", (token) => {
      console.log(token);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error) => {
      showToast("Error on registration: " + JSON.stringify(error));
    });
  };

  const showToast = async (message) => {
    await Toast.show({ text: message, position: "center" });
  };
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* Home Page Path */}
            <Route
              exact
              path="/home"
              render={() => (
                <Home
                  cardsLeft={cardsLeft}
                  handleCardScreen={handleCardScreen}
                  accessToken={accessToken}
                />
              )}
            />

            {/* Card Page Path */}
            <Route
              exact
              path="/cardscreen"
              render={() => (
                <CardScreen
                  finished={finished}
                  total={total}
                  counter={counter}
                  tupleCounter={tupleCounter}
                  cardCol={cardCol}
                  stats={stats}
                  isShake={isShake}
                  putLogInfo={putLogInfo}
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                  handleStatisticsUpdate={handleStatisticsUpdate}
                  handleHomeScreen={handleHomeScreen}
                  isCardScreen={isCardScreen}
                  accessToken={accessToken}
                />
              )}
            />

            {/* Login Page Path */}
            <Route exact path="/login">
              {isAuthenticated ? <Redirect to="/loading" /> : <LogInPage />}
            </Route>

            {/* Error Page Path */}
            <Route exact path="/error">
              <ErrorPage accessToken={accessToken} />
            </Route>

            {/* Tutorial Page Path */}
            <Route
              exact
              path="/tutorial"
              render={() => (
                <TutorialPage handleCardScreen={handleCardScreen} />
              )}
            />

            {/* Info Page Path */}
            <Route exact path="/info">
              <InfoPage />
            </Route>

            {/* Loading Page Path */}
            <Route exact path="/loading">
              <LoadingPage
                total={total}
                isFetched={isFetched}
                isError={isError}
                noCardsInDb={noCardsInDb}
                readyLog={readyLog}
                handleCardScreen={handleCardScreen}
              />
            </Route>

            {/* Root Path Redirects to Loading Page */}
            <Route exact path="/">
              <Redirect to="/loading" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="tab-bar" id="bottom-tab-bar">
            <IonTabButton
              tab="home"
              href="/home"
              className="icons"
              onClick={handleHomeScreen}
            >
              <TbHomeEdit size="3em" />
            </IonTabButton>

            <IonTabButton
              tab="card"
              href="/cardscreen"
              className="hand spread icons"
              onClick={handleCardScreen}
            >
              <CardsTab cardsLeft={cardsLeft} isCardScreen={isCardScreen} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
