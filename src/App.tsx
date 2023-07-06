import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  setupIonicReact,
  IonTabButton,
  IonLoading,
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
import { cardCollection } from "./utilities/exampleData";
import { markdownCollection } from "./utilities/markdownData";
import CardsTab from "./IndicationComp/CardsTab";
import LoadingPage from "./pages/LoadingPage";
import {
  logEnterCard,
  logEnterHome,
  logShakePhone,
} from "./utilities/logfunction";
import LogInPage from "./pages/LogInPage";

import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";

import { useAuth0 } from "@auth0/auth0-react";
import TutorialPage from "./pages/TutorialPage";
setupIonicReact({
  swipeBackEnabled: false,
});

const App: React.FC = () => {

  const {isAuthenticated, isLoading, user, getAccessTokenSilently} = useAuth0();

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
    user_id: "bigboss",
    start_time: Date(),
    end_time: "",
    number_shake: 0,
    action_container: [
      {
        event_name: "Initialize",
        event_time: Date(),
        card_id: null,
        self_eval: null,
        test_eval: null,
        isBuffer: null,
      },
    ],
  });

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

  console.log(logInfo);

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
    logEnterCard(logInfo, updateInfo);
  };

  // Home Screen will fold the cards
  const handleHomeScreen = () => {
    setCardScreen(false);
    logEnterHome(logInfo, updateInfo);
  };

  // Handler used to update logInfo
  const updateInfo = (newInfo: reviewInfo) => {
    setLog(newInfo);
  };

  // Handler that set the card-stacker back without shaking
  const handleShake = () => {
    // Set Shake to be true. Enables visual shaking and modal
    setShake(true);

    // Log Shaking Event
    logShakePhone(logInfo, finished, total, updateInfo);

    // Set Timeout of 2.2 seconds(consistent with animation time)
    setTimeout(() => setShake(false), 2200);
  };

  // Logic to Move On to Next Card
  const swipeNextCard = (tupleIndex: number, newInfo: reviewInfo) => {
    setFinished((prevFinished: number) => prevFinished + 1);
    setCounter((prevCounter: number) => prevCounter - 1);

    // If the current tuple is not the last one, reset the counter of tuple
    // to the next array's length
    if (tupleIndex > 0) {
      setTupleCounter(cardCol[tupleIndex - 1].length);
    }

    // Log Info for Positive/No More/Negative
    if (finished === total - 1) {
      newInfo.end_time = Date();
    }
    updateInfo(newInfo);
  };

  // Function that swipes for one more card
  const swipeOneMoreCard = (tupleIndex: number, newInfo: reviewInfo) => {
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
    // Log One More Info
    updateInfo(newInfo);
  };


 

  // Return the Log In Page if it's not authenticated and not loading
  console.log(user);
  console.log('Loading', isLoading);
  console.log('authen', isAuthenticated);
  // if(!isAuthenticated && !isLoading){
  //   return <LogInPage/>
  // }

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
                  logInfo={logInfo}
                  updateInfo={updateInfo}
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                />
              )}
            />

            <Route exact path="/login" render={() => <LogInPage />} />

            <Route exact path="/tutorial" render={() => <TutorialPage />} />
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
                {isAuthenticated ? <Redirect to='/loading'/> : <Redirect to='/login'/>}
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
