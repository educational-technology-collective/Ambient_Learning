import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  setupIonicReact,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { TbHomeEdit } from "react-icons/tb";
import { useState } from "react";
import CardScreen from "./pages/CardScreen";
import Home from "./pages/Home";
import "./App.css";

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
import { radio, save } from "ionicons/icons";
import { cardCollection } from "./components/exampleData";
setupIonicReact({
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  // The Card Array
  const [cardCol, setCards] = useState(cardCollection);

  // How Many Cards Finished
  const [finished, setFinished] = useState(0);

  // How Many Cards in total
  const [total, setTotal] = useState(cardCol.length);

  // Logic to Move On to Next Card
  const swipeNextCard = (id: number) => {
    setFinished((prevFinished) => prevFinished + 1);
    setCards((cards) => {
      return cards.filter((tuple) => id !== tuple[tuple.length - 1].id);
    });
  };

  // Function that swipes for one more card
  const swipeOneMoreCard = (tupleIndex: number, id: number) => {
    if (cardCol[tupleIndex].length === 1) {
      alert("No More Simmilar Card!");
      setFinished((prevFinished) => prevFinished + 1);
     
      setCards((cards) => {
        return cards.filter((tuple) => id !== tuple[tuple.length - 1].id);
      });
     
    } else {
      setFinished((prevFinished) => prevFinished + 1);
      setTotal((prevTotal) => prevTotal + 1);
     
      setCards((cards) => {
        return cards.map((tuple) => tuple.filter((card) => card.id !== id));
      });
    }
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              exact
              path="/home"
              render={() => <Home finished={finished} total={total}/>}
            />
            <Route
              exact
              path="/cardscreen"
              render={() => (
                <CardScreen
                  finished={finished}
                  total={total}
                  cardCol={cardCol}
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                />
              )}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="tab-bar">
            <IonTabButton tab="home" href="/home" className="icons">
              <TbHomeEdit size="3em" />
            </IonTabButton>
            <IonTabButton className="icons">
              <IonIcon icon={save}></IonIcon>
            </IonTabButton>
            <IonTabButton className="icons">
              <IonIcon icon={radio}></IonIcon>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
