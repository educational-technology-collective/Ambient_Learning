import { IonText, IonIcon } from "@ionic/react";
import "./Indicators.css";
import { sadOutline, happy, card, close } from "ionicons/icons";

export const FrontNegativeIndicator: React.FC<{ negativeOpacity: number }> = ({
  negativeOpacity,
}) => {
  return (
    <div
      className="front negative front-negative"
      style={{ opacity: negativeOpacity }}
    >
      <div className="action-container negative-container">
        <IonText className="action-text negative-text">F O R G E T </IonText>
        <IonIcon
          icon={sadOutline}
          style={{ color: "#D63230", fontSize: "1.8em" }}
        ></IonIcon>
      </div>
    </div>
  );
};

export const FrontPositiveIndicator: React.FC<{ positiveOpacity: number }> = ({
  positiveOpacity,
}) => {
  return (
    <div
      className="front positive front-positive"
      style={{ opacity: positiveOpacity }}
    >
      <div className="action-container positive-container">
        <IonText className="action-text positive-text">K N O W</IonText>
        <IonIcon
          icon={happy}
          style={{ color: "#256D1B", fontSize: "1.8em", fontWeight: "bold" }}
        ></IonIcon>
      </div>
    </div>
  );
};

export const FrontOneMoreIndicator: React.FC<{ onemoreOpacity: number }> = ({
  onemoreOpacity,
}) => {
  return (
    <div className="front onemore" style={{ opacity: onemoreOpacity }}>
      <div className="action-container onemore-container">
        <IonText className="action-text onemore-text">ONE MORE</IonText>
        <IonIcon
          icon={card}
          style={{ color: "#7BB2D9", fontSize: "1.8em" }}
        ></IonIcon>
      </div>
    </div>
  );
};

export const FrontNoMoreIndicator: React.FC<{ nomoreOpacity: number }> = ({
  nomoreOpacity,
}) => {
  return (
    <div className="front nomore" style={{ opacity: nomoreOpacity }}>
      <div className="action-container nomore-container">
        <IonText className="action-text nomore-text">NO MORE</IonText>
        <IonIcon
          icon={close}
          style={{ color: "#E8871E", fontSize: "1.8em" }}
        ></IonIcon>
      </div>
    </div>
  );
};

export const BackNegativeIndicator: React.FC<{ negativeOpacity: number }> = ({
  negativeOpacity,
}) => {
  return (
    <div
      className="back negative back-negative"
      style={{ opacity: negativeOpacity }}
    >
      <div className="action-container negative-container">
        <IonText className="action-text negative-text">F O R G E T </IonText>
        <IonIcon
          icon={sadOutline}
          style={{ color: "#D63230", fontSize: "1.8em" }}
        ></IonIcon>
      </div>
    </div>
  );
};

export const BackPositiveIndicator: React.FC<{ positiveOpacity: number }> = ({
  positiveOpacity,
}) => {
  return (
    <div
      className="back positive back-positive"
      style={{ opacity: positiveOpacity }}
    >
      <div className="action-container positive-container">
        <IonText className="action-text positive-text">K N O W</IonText>
        <IonIcon
          icon={happy}
          style={{ color: "#256D1B", fontSize: "1.8em" }}
        ></IonIcon>
      </div>
    </div>
  );
};

export const BackOneMoreIndicator: React.FC<{ onemoreOpacity: number }> = ({
  onemoreOpacity,
}) => {
  return (
    <div className="back onemore" style={{ opacity: onemoreOpacity }}>
      <div className="action-container onemore-container">
        <IonText className="action-text onemore-text">ONE MORE</IonText>
        <IonIcon
          icon={card}
          style={{ color: "#7BB2D9", fontSize: "1.8em" }}
        ></IonIcon>
      </div>
    </div>
  );
};
export const BackNoMoreIndicator: React.FC<{ nomoreOpacity: number }> = ({
  nomoreOpacity,
}) => {
  return (
    <div className="back nomore" style={{ opacity: nomoreOpacity }}>
      <div className="action-container nomore-container">
        <IonText className="action-text nomore-text">NO MORE</IonText>
        <IonIcon
          icon={close}
          style={{ color: "#E8871E", fontSize: "1.8em" }}
        ></IonIcon>
      </div>
    </div>
  );
};
