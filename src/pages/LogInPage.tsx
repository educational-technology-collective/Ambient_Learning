import { IonPage, IonContent, useIonViewWillEnter, IonCard, IonCardContent } from "@ionic/react";
import "./LogInPage.css";
import LogInButton from "../ButtonComp/LogInButton";
import { hideBar } from "../utilities/showTabBar";
import spacecraft from "../../spacecraft.svg";
import logo from '../../assets/logo.png'
import { MdQuestionMark } from "react-icons/md";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

const LogInPage: React.FC = () => {
  // Hide the bottom tabs when entering the login page
  useIonViewWillEnter(hideBar);

  const [showFeedBack, setFeedBack] = useState(false);
  const openQuestion = () => {
    setFeedBack(true);
  }
  const closeQuestion = () => {
    setFeedBack(false);
  }
    return (
    <IonPage>
      <IonContent scrollY={false} className="login-content">
      <IonCard className="tutorial-card" onClick={openQuestion}>
        <IonCardContent className="tutorial-card-content">
          <MdQuestionMark size="1.5em" />
        </IonCardContent>
      </IonCard>
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

          <a href="https://pngtree.com/freepng/red-maple-tree_4742154.html?share=3?sol=downref&id=bef" className="acknowledgement">
          Maple PNG Designed By 588ku from https://pngtree.com/freepng/red-maple-tree_4742154.html?share=3?sol=downref&id=bef
          </a>

        </div>
      </IonContent>
      {showFeedBack ? <FeedbackModal identifier="Log In" closeQuestion={closeQuestion} />: null}
    </IonPage>
  );
};

export default LogInPage;
