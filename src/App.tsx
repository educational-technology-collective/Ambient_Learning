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
import { cardCollection } from "./components/exampleData";
import { markdownCollection } from "./components/markdownData";
import CardsTab from "./components/CardsTab";
import LoadingPage from "./pages/LoadingPage";
setupIonicReact({
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  // Initialize the Logging Info as app is open
  const [logInfo, setLog] = useState<reviewInfo>({
    user_id: "bigboss",
    start_time: Date(),
    end_time: "",
    number_shake: 0,
    action_container: [
      {
        event_name: "Initialize",
        card_id: null,
        flip_time: null,
        swipe_time: null,
        self_eval: null,
        test_eval: null,
        isBuffer: null,
      },
    ],
  });

  console.log(logInfo);

  // The Card Array
  const [cardCol, setCards] = useState([[]]);

  // GET Function for fetching cards
  const getCards = async (url: string) => {
    const response = await CapacitorHttp.get({ url: url });
    const data = await JSON.parse(response.data);
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
    logEnterCard();
  };

  // Home Screen will fold the cards
  const handleHomeScreen = () => {
    setCardScreen(false);
    logEnterHome();
  };

  // Function to Log the Event of Shaking
  const logShakePhone = () => {
    // Increase the Number of Shake
    const event: action = {
      event_name: "shake",
      card_id: null,
      flip_time: null,
      swipe_time: null,
      self_eval: null,
      test_eval: null,
      isBuffer: null,
    };

    // Create a copy of logInfo
    let newInfo = logInfo;

    // Check to see if this is the last card(remember states are updated after)
    if (finished === total - 1) {
      newInfo.end_time = Date();
    }
    newInfo.number_shake = newInfo.number_shake + 1;
    newInfo.action_container.push(event);
    setLog(newInfo);
  };

  // Function to Log the Event of Entering Home Screen
  const logEnterHome = () => {
    const event: action = {
      event_name: "EnterHomeScreen",
      card_id: null,
      flip_time: null,
      swipe_time: null,
      self_eval: null,
      test_eval: null,
      isBuffer: null,
    };
    let newInfo = logInfo;
    newInfo.action_container.push(event);
    setLog(newInfo);
  };

  // Function to Log the Event of Entering Card Screen
  const logEnterCard = () => {
    if (
      logInfo.action_container[logInfo.action_container.length - 1]
        .event_name !== "EnterCardScreen"
    ) {
      const event: action = {
        event_name: "EnterCardScreen",
        flip_time: null,
        card_id: null,
        swipe_time: null,
        self_eval: null,
        test_eval: null,
        isBuffer: null,
      };
      let newInfo = logInfo;
      newInfo.action_container.push(event);
      setLog(newInfo);
    }
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
    logShakePhone();

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

            <Route
              exact
              path="/loading"
              render={() => <LoadingPage handleCardScreen={handleCardScreen} />}
            />

            <Route exact path="/">
              <Redirect to="/loading" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="tab-bar">
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
