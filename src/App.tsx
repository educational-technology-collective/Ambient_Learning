import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, setupIonicReact, IonTabButton, IonIcon } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import CardScreen from "./pages/CardScreen";
import Home from './pages/Home'
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
import { homeOutline, radio, save } from "ionicons/icons";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path = '/cardscreen' component={CardScreen} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot='bottom'>
        <IonTabButton tab="home" href='/home'>
            <IonIcon icon={homeOutline}></IonIcon>
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

export default App;
