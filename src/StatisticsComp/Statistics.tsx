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

const Statistics: React.FC<{ total: number; duration: number }> = ({
  total,
  duration,
}) => {
  let correctNum,
    incorrectNum,
    skipNum,
    knowNum,
    dontKnowNum,
    oneMoreNum,
    poorCardNum;
  let stats = localStorage.getItem("stats");
  if (stats) {
    let statsObj = JSON.parse(stats);
    correctNum = statsObj[0];
    incorrectNum = statsObj[1];
    skipNum = statsObj[2];
    knowNum = statsObj[3];
    dontKnowNum = statsObj[4];
    oneMoreNum = statsObj[5];
    poorCardNum = statsObj[6];
  }

  return (
    <IonContent scrollY={true} className="statistics-content">
      <h2 className="statistics-title">Session Overview</h2>
      <div className="statistics-container">
        <IonCard className="statistics-card">
          <IonCardContent>
            <IonCardTitle className="card-title">
              Cards Complete <BiTask size="1.2rem" className="card-icon" />{" "}
              <span className="card-values">{total}</span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonCard className="statistics-card session-delay">
          <IonCardContent>
            <IonCardTitle className="card-title">
              Session Length <FiClock size="1.2rem" className="card-icon" />{" "}
              <span className="card-values" style={{ right: "1%" }}>
                {duration} mins
              </span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonCard className="statistics-card correct-delay">
          <IonCardContent>
            <IonCardTitle className="card-title">
              Correct MCQ <MdDoneOutline size="1.2rem" className="card-icon" />{" "}
              <span className="card-values">{correctNum}</span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonCard className="statistics-card incorrect-delay">
          <IonCardContent>
            <IonCardTitle className="card-title">
              Incorrect MCQ{" "}
              <MdOutlineClose size="1.2rem" className="card-icon" />{" "}
              <span className="card-values">{incorrectNum}</span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonCard className="statistics-card skip-delay">
          <IonCardContent>
            <IonCardTitle className="card-title">
              Skipped MCQ <BiSkipNext size="1.2rem" className="card-icon" />{" "}
              <span className="card-values">{skipNum}</span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonCard className="statistics-card know-delay">
          <IonCardContent>
            <IonCardTitle className="card-title">
              Know Cards <BiWinkSmile size="1.2rem" className="card-icon" />{" "}
              <span className="card-values">{knowNum}</span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonCard className="statistics-card dontKnow-delay">
          <IonCardContent>
            <IonCardTitle className="card-title">
              Don't Know Cards{" "}
              <BiConfused size="1.2rem" className="card-icon" />{" "}
              <span className="card-values">{dontKnowNum}</span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonCard className="statistics-card oneMore-delay">
          <IonCardContent>
            <IonCardTitle className="card-title">
              OneMore Cards <BiCard size="1.2rem" className="card-icon" />{" "}
              <span className="card-values">{oneMoreNum}</span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>

        <IonCard className="statistics-card poorCard-delay">
          <IonCardContent>
            <IonCardTitle className="card-title">
              Poor Cards <FaPoop size="1.2rem" className="card-icon" />{" "}
              <span className="card-values">{poorCardNum}</span>
            </IonCardTitle>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  );
};

export default Statistics;
