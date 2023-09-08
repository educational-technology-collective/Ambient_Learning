import { IonPage, IonContent} from "@ionic/react";
import "./LogInPage.css";
import LogInButton from "../ButtonComp/LogInButton";
import logo from "../../assets/logo.png";

const LogInPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonContent scrollY={false} className="login-content">
        <div className="login-page-container">
          <img src={logo} alt="logo" className="login-logo" />

          {/* Welcome Text and the Rectangle Span */}
          {/* <div className="welcome-container">
            <h1 className="welcome-text">
              Hi, Welcome<span className="welcome-covering"></span>
            </h1>
          </div> */}

          {/* Desciption Text and the Login Button appears with changing opacity */}
          {/* <div>
            <h2 className="description-text">
              Enlarge Brain Through <i>Flashcards</i>
            </h2>
          </div> */}
          <LogInButton />

          <h3 className="version">V.1.7.0</h3>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LogInPage;
