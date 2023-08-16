import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
} from "@ionic/react";
import { FiClock } from "react-icons/fi";
import {
  BiTask,
  BiConfused,
  BiSkipNext,
  BiWinkSmile,
  BiCard,
} from "react-icons/bi";
import { MdDoneOutline, MdOutlineClose } from "react-icons/md";
import { FaPoop } from "react-icons/fa";
import "./Statistics.css";
import { MdQuestionMark } from "react-icons/md";
import { useState } from "react";
import FeedbackModal from "../pages/FeedbackModal";
const Statistics: React.FC<{ stats: statistics }> = ({ stats }) => {
  const [showFeedBack, setFeedBack] = useState(false);
  const openQuestion = () => {
    setFeedBack(true);
  };

  const closeQuestion = () => {
    setFeedBack(false);
  };
  return (
    <>
      <IonContent scrollY={true} className="statistics-content">
        {/* <IonCard className="tutorial-card" onClick={openQuestion}>
          <IonCardContent className="tutorial-card-content">
            <MdQuestionMark size="1.5em" />
          </IonCardContent>
        </IonCard> */}
        <div className="statistics-container">
          <IonCard className="statistics-card">
            <IonCardContent>
              <IonCardTitle className="card-title">
                Cards Complete <BiTask size="1.2rem" className="card-icon" />{" "}
                <span className="card-values">{stats.total}</span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>

          <IonCard className="statistics-card session-delay">
            <IonCardContent>
              <IonCardTitle className="card-title">
                Session Length <FiClock size="1.2rem" className="card-icon" />{" "}
                <span className="card-values" style={{ right: "1%" }}>
                  {stats.duration} mins
                </span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>

          <IonCard className="statistics-card correct-delay">
            <IonCardContent>
              <IonCardTitle className="card-title">
                Correct MCQ{" "}
                <MdDoneOutline size="1.2rem" className="card-icon" />{" "}
                <span className="card-values">{stats.correct}</span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>

          <IonCard className="statistics-card incorrect-delay">
            <IonCardContent>
              <IonCardTitle className="card-title">
                Incorrect MCQ{" "}
                <MdOutlineClose size="1.2rem" className="card-icon" />{" "}
                <span className="card-values">{stats.incorrect}</span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>

          <IonCard className="statistics-card skip-delay">
            <IonCardContent>
              <IonCardTitle className="card-title">
                Skipped MCQ <BiSkipNext size="1.2rem" className="card-icon" />{" "}
                <span className="card-values">{stats.skipped}</span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>

          <IonCard className="statistics-card know-delay">
            <IonCardContent>
              <IonCardTitle className="card-title">
                Know Cards <BiWinkSmile size="1.2rem" className="card-icon" />{" "}
                <span className="card-values">{stats.know}</span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>

          <IonCard className="statistics-card dontKnow-delay">
            <IonCardContent>
              <IonCardTitle className="card-title">
                Don't Know Cards{" "}
                <BiConfused size="1.2rem" className="card-icon" />{" "}
                <span className="card-values">{stats.dontKnow}</span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>

          <IonCard className="statistics-card oneMore-delay">
            <IonCardContent>
              <IonCardTitle className="card-title">
                OneMore Cards <BiCard size="1.2rem" className="card-icon" />{" "}
                <span className="card-values">{stats.oneMore}</span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>

          <IonCard className="statistics-card poorCard-delay">
            <IonCardContent>
              <IonCardTitle className="card-title">
                Poor Cards <FaPoop size="1.2rem" className="card-icon" />{" "}
                <span className="card-values">{stats.poorCard}</span>
              </IonCardTitle>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      {showFeedBack ? (
        <FeedbackModal
          identifier="Statistics Page"
          closeQuestion={closeQuestion}
        />
      ) : null}
    </>
  );
};

export default Statistics;
