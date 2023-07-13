import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  setupIonicReact,
  IonTabButton,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { TbHomeEdit } from "react-icons/tb";
import { Haptics } from "@capacitor/haptics";
import { useEffect, useState } from "react";
import CardScreen from "./pages/CardScreen";
import Home from "./pages/Home";
import "./pages/Home.css";
import "./App.css";
import { CapacitorHttp } from "@capacitor/core";

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
import {
  logEnterCard,
  logEnterHome,
  logInitialize,
  logSessionFinished,
} from "./utilities/logfunction";
import LogInPage from "./pages/LogInPage";

import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";

import { useAuth0 } from "@auth0/auth0-react";
import TutorialPage from "./pages/TutorialPage";
import { algorithmTester, srsAlgorithm } from "./utilities/algorithm";
import {
  evaluationSet1,
  evaluationSet10,
  evaluationSet11,
  evaluationSet12,
  evaluationSet2,
  evaluationSet3,
  evaluationSet4,
  evaluationSet5,
  evaluationSet6,
  evaluationSet7,
  evaluationSet8,
  evaluationSet9,
} from "./utilities/algorithmData";
setupIonicReact({
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  const { handleRedirectCallback } = useAuth0();

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

  // Initialize the Logging Info as app is open
  const [logInfo, setLog] = useState<reviewInfo>({
    user_id: "",
    start_time: null,
    end_time: null,
    action_container: [],
  });

  // This will push the event to the action container
  const pushLogInfo = (event: action) => {
    setLog({
      ...logInfo,
      action_container: [...logInfo.action_container, event],
    });
  };

  // To initalize the session. Push the event and set user_id and start time
  const pushSessionInitialize = (event: action, user_id: string) => {
    setLog((logInfo) => ({
      ...logInfo,
      action_container: [...logInfo.action_container, event],
      user_id: user_id,
      start_time: new Date(),
    }));
  };

  // To end the session. Push the event and set the end time
  const pushSessionFinished = (event: action) => {
    setLog((logInfo) => ({
      ...logInfo,
      action_container: [...logInfo.action_container, event],
      end_time: new Date(),
    }));
  };

  const putLogInfo = async (event: action, end_time: Date | null) => {
    const dataStream = {
      action: event,
      end_time: end_time
    };
    const response = await CapacitorHttp.put({url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/telemetry/mobile?user_id=${userId}&start_time=${start_time}`, data: dataStream});
    console.log("Put Response", response);
  }

  const [userId, setUserId] = useState('');

  const [start_time, setTime] = useState(new Date());

  const postInitialize = async (userId: string) => {
    setUserId(userId);
    setTime(new Date());
    const log: reviewInfo = {
      user_id: userId,
      start_time: new Date(),
      end_time: null,
      action_container: [{
        event_name: 'Initialize',
        event_time: new Date(),
        card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null
      }]
    }
    const response = await CapacitorHttp.post({url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/telemetry/mobile`, data: log});
    console.log("Post Response", response);
  }

  useEffect(() => {
    // Initialize the Log Info as the user is signed
    if (isAuthenticated && user !== undefined && user.sub !== undefined) {
      postInitialize(user.sub);
    }
  }, [isAuthenticated]);

  // State Variable to indicate whether data is fetched
  const [isFetched, setFetched] = useState(false);

  // The Card Array
  const [cardCol, setCards] = useState([[]]);

  // GET Function for fetching cards
  const getCards = async (url: string) => {
    const response = await CapacitorHttp.get({ url: url });
    const data = await JSON.parse(response.data);
    setFetched(true);
    setCards(data);
    setTotal(data.length);
    setCounter(data.length);
    setTupleCounter(data[data.length - 1].length);
  };

  // UseEffect to fetch the cards
  useEffect(() => {
    getCards(
      "https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/users/srsdevteam@gmail.com/flashcards/all"
    );
  }, []);

  // How Many Cards Finished
  const [finished, setFinished] = useState(0);

  // How Many Cards in total
  const [total, setTotal] = useState(0);

  // Number of Cards Remaining
  let cardsLeft: number = total - finished;

  // Counter used to display certain cards
  const [counter, setCounter] = useState(0);

  // Tuple Counter for One More Cards
  const [tupleCounter, setTupleCounter] = useState(0);

  // Card-Stacker Visual Effect
  const [isShake, setShake] = useState(false);

  // State Variable used to track if the current tab is cardscreen
  const [isCardScreen, setCardScreen] = useState(false);

  // Card Screen will spread the cards
  const handleCardScreen = () => {
    setCardScreen(true);
    logEnterCard(pushLogInfo);
  };

  // Home Screen will fold the cards
  const handleHomeScreen = () => {
    setCardScreen(false);
    logEnterHome(pushLogInfo);
  };

  // Handler that set the card-stacker back without shaking
  const handleShake = () => {
    // Set Shake to be true. Enables visual shaking and modal
    setShake(true);

    // Log Session is Finished
    if (finished === total - 1) {
      logSessionFinished(pushSessionFinished);
    }

    // Set Timeout of 2.2 seconds(consistent with animation time)
    setTimeout(() => setShake(false), 2200);
  };

  // Logic to Move On to Next Card
  const swipeNextCard = (tupleIndex: number, event: action) => {
    setFinished((prevFinished: number) => prevFinished + 1);
    setCounter((prevCounter: number) => prevCounter - 1);

    // If the current tuple is not the last one, reset the counter of tuple
    // to the next array's length
    if (tupleIndex > 0) {
      setTupleCounter(cardCol[tupleIndex - 1].length);
    }

    // Log Info for Positive/No More/Negative
    pushLogInfo(event);

    // Log Session is Finished
    if (finished === total - 1) {
      logSessionFinished(pushSessionFinished);
    }
  };

  // Function that swipes for one more card
  const swipeOneMoreCard = (tupleIndex: number, event: action) => {
    // Log One More Info
    pushLogInfo(event);

    // Check if there is no onemore card for this card
    if (tupleCounter === 1) {
      // If the current tuple is not the last one, reset the counter of tuple
      // to the next array's length
      if (tupleIndex > 0) {
        setTupleCounter(cardCol[tupleIndex - 1].length);
      }
      // Vibration of device
      Haptics.vibrate({ duration: 500 });

      // Visual Vibration
      handleShake();
      setFinished((prevFinished: number) => prevFinished + 1);
      setCounter((prevCounter: number) => prevCounter - 1);
    } else {
      setFinished((prevFinished: number) => prevFinished + 1);
      setTotal((prevTotal: number) => prevTotal + 1);

      // Decrement the Counter
      setTupleCounter((prevTupleCounter: number) => prevTupleCounter - 1);
    }
  };

  // Return the Log In Page if it's not authenticated and not loading
  // Technically "Buggy"
  if (!isAuthenticated && !isLoading) {
    return <LogInPage />;
  }

  let previous = null;
  let data1 = [];
  for (let i = 0; i < evaluationSet1.length; i++) {
    previous = algorithmTester(previous, evaluationSet1[i]);
    data1.push(previous.interval);
  }
  console.log("set 1", JSON.stringify(data1));

  let previous2 = null;
  let data2 = [];
  for (let i = 0; i < evaluationSet2.length; i++) {
    previous2 = algorithmTester(previous2, evaluationSet2[i]);
    data2.push(previous2.interval);
  }
  console.log("set 2", JSON.stringify(data2));

  let previous3 = null;
  let data3 = [];
  for (let i = 0; i < evaluationSet3.length; i++) {
    previous3 = algorithmTester(previous3, evaluationSet3[i]);
    data3.push(previous3.interval);
  }
  console.log("set 3", JSON.stringify(data3));

  let previous4 = null;
  let data4 = [];
  for (let i = 0; i < evaluationSet4.length; i++) {
    previous4 = algorithmTester(previous4, evaluationSet4[i]);
    data4.push(previous4.interval);
  }
  console.log("set 4", JSON.stringify(data4));

  let previous5 = null;
  let data5 = [];
  for (let i = 0; i < evaluationSet5.length; i++) {
    previous5 = algorithmTester(previous5, evaluationSet5[i]);
    data5.push(previous5.interval);
  }
  console.log("set 5", JSON.stringify(data5));

  let previous6 = null;
  let data6 = [];
  for (let i = 0; i < evaluationSet6.length; i++) {
    previous6 = algorithmTester(previous6, evaluationSet6[i]);
    data6.push(previous6.interval);
  }
  console.log("set 6", JSON.stringify(data6));

  let previous7 = null;
  let data7 = [];
  for (let i = 0; i < evaluationSet7.length; i++) {
    previous7 = algorithmTester(previous7, evaluationSet7[i]);
    data7.push(previous7.interval);
  }
  console.log("set 7", JSON.stringify(data7));

  let previous8 = null;
  let data8 = [];
  for (let i = 0; i < evaluationSet8.length; i++) {
    previous8 = algorithmTester(previous8, evaluationSet8[i]);
    data8.push(previous8.interval);
  }
  console.log("set 8", JSON.stringify(data8));

  let previous9 = null;
  let data9 = [];
  for (let i = 0; i < evaluationSet9.length; i++) {
    previous9 = algorithmTester(previous9, evaluationSet9[i]);
    data9.push(previous9.interval);
  }
  console.log("set 9", JSON.stringify(data9));

  let previous10 = null;
  let data10 = [];
  for (let i = 0; i < evaluationSet10.length; i++) {
    previous10 = algorithmTester(previous10, evaluationSet10[i]);
    data10.push(previous10.interval);
  }
  console.log("Set 10", JSON.stringify(data10));

  let previous11 = null;
  let data11 = [];
  for (let i = 0; i < evaluationSet11.length; i++) {
    previous11 = algorithmTester(previous11, evaluationSet11[i]);
    data11.push(previous11.interval);
  }
  console.log("Set 11", JSON.stringify(data11));

  let previous12 = null;
  let data12 = [];
  for (let i = 0; i < evaluationSet12.length; i++) {
    previous12 = algorithmTester(previous12, evaluationSet12[i]);
    data12.push(previous12.interval);
  }
  console.log("Set 12", JSON.stringify(data12));

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              exact
              path="/home"
              render={() => (
                <Home
                  cardsLeft={cardsLeft}
                  handleCardScreen={handleCardScreen}
                />
              )}
            />
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
                  isShake={isShake}
                  pushLogInfo={pushLogInfo}
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                  handleHomeScreen={handleHomeScreen}
                />
              )}
            />

            <Route exact path="/login">
              {isAuthenticated ? <Redirect to="/loading" /> : <LogInPage />}
            </Route>

            <Route
              exact
              path="/tutorial"
              render={() => (
                <TutorialPage handleCardScreen={handleCardScreen} />
              )}
            />
            <Route
              exact
              path="/loading"
              render={() => (
                <LoadingPage
                  isFetched={isFetched}
                  handleCardScreen={handleCardScreen}
                />
              )}
            />
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
