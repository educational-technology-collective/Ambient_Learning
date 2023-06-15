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

  // Logic to Move On to Next Card
  const swipeNextCard = (id: number) => {
    setFinished((prevFinished) => prevFinished + 1);
    setCards((cards) => {
      return cards.filter((card) => id !== card.index);
    });
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/cardscreen"
              render={() => (
                <CardScreen
                  finished={finished}
                  cardCol={cardCol}
                  swipeNextCard={swipeNextCard}
                />
              )}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <TbHomeEdit size="3em" />
            </IonTabButton>
            <IonTabButton>
              <IonIcon icon={save}></IonIcon>
            </IonTabButton>
            <IonTabButton>
              <IonIcon icon={radio}></IonIcon>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
