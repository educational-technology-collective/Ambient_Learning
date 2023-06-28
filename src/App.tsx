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
import { cardCollection } from "./components/exampleData";
import CardsTab from "./components/CardsTab";
import LoadingPage from "./pages/LoadingPage";
setupIonicReact({
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  // The Card Array

  const [cardCol, setCards] = useState([[]]);

  // Show loading initially true. Turn it off after first jump
  const [showLoading, setLoading] = useState(true);

  // Turn off loading so it won't constantly jumping to card screen
  const handleLoading = () => {
    setLoading(false);
  };

  const getCards = async (url: string) => {
    const response = await CapacitorHttp.get({ url: url });
    const data = await JSON.parse(response.data);
    setCards(data);
    setTotal(data.length);
    setCounter(data.length);
    setTupleCounter(data[data.length - 1].length);
  };

  useEffect(() => {
    getCards(
      "https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/users/srsdevteam@gmail.com/flashcards/all"
    );
  }, []);

  // How Many Cards Finished
  const [finished, setFinished] = useState(0);

  // How Many Cards in total
  const [total, setTotal] = useState(0);

  // Counter used to display certain cards
  const [counter, setCounter] = useState(0);

  // Tuple Counter for One More Cards
  const [tupleCounter, setTupleCounter] = useState(0);

  // Card-Stacker Visual Effect
  const [isShake, setShake] = useState(false);

  // Handler that set the card-stacker back without shaking
  const handleShake = () => {
    // Set Shake to be true. Enables visual shaking and modal
    setShake(true);

    // Set Timeout of 2.2 seconds(consistent with animation time)
    setTimeout(() => setShake(false), 2200);
  };

  // Logic to Move On to Next Card
  const swipeNextCard = (tupleIndex: number) => {
    setFinished((prevFinished: number) => prevFinished + 1);
    setCounter((prevCounter: number) => prevCounter - 1);

    // If the current tuple is not the last one, reset the counter of tuple
    // to the next array's length
    if (tupleIndex > 0) {
      setTupleCounter(cardCol[tupleIndex - 1].length);
    }
  };

  // Function that swipes for one more card
  const swipeOneMoreCard = (tupleIndex: number) => {
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

  let cardsLeft: number = total - finished;

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
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                />
              )}
            />

            <Route
              exact
              path="/loading"
              render={() => (
                <LoadingPage
                  showLoading={showLoading}
                  handleCardScreen={handleCardScreen}
                  handleLoading={handleLoading}
                />
              )}
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
