import {
  IonContent,
  IonPage,
  IonIcon,
  IonButton,
  isPlatform,
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { diamond } from "ionicons/icons";
import DashBoard from "../HomeComp/DashBoard";
import AppNameHeader from "./AppNameHeader";
import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";

const Home: React.FC<{ cardsLeft: number; handleCardScreen: () => void }> = ({
  cardsLeft,
  handleCardScreen,
}) => {
  const history = useHistory();
  // Used to jump to the card screen and spread cards
  const navigateToCardScreen = () => {
    history.push("/cardscreen");
    handleCardScreen();
  };

  // Determine The Box-Shadow Effect based on cards remaining
  let shadow: string;
  //When the remaining cards are larget than or equal to 3
  if (cardsLeft >= 3) {
    shadow = "wrapped-card left-3";
  }
  //When the remaining cards equal to 2
  else if (cardsLeft === 2) {
    shadow = "wrapped-card left-2";
  }
  //Only one card remaining
  else {
    shadow = "wrapped-card";
  }

  const isPhone = isPlatform('hybrid')
const logoutUri = isPhone ? 'ionic.srs://dev-cra0zttj8xlwi6sh.us.auth0.com/capacitor/ionic.srs/callback/' : 'http://localhost:8100/login'

  const { logout } = useAuth0();

  const doLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: logoutUri,
        federated: true
      },
      async openUrl(url) {
         // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self"
        });
      }
    });
    history.push('/login');
    if(isPhone){
      window.location.reload();
    }
  };

  // Screen Being Rendered
  return (
    <IonPage>

      {/* Header and ToolBar */}
      <AppNameHeader/>

      <IonContent scrollY={false} className="home-content">
        <div className="home-loaded-wrapper">
          <IonIcon
            icon={diamond}
            style={{ fontSize: "3em", left: "45%", position: "relative" }}
          ></IonIcon>
          <DashBoard
            cardsLeft={cardsLeft}
            shadow={shadow}
            navigateToCardScreen={navigateToCardScreen}
          />
          <IonButton onClick={doLogout}>Log Out</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
