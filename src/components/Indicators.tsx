import { IonText } from "@ionic/react";
import "./Indicators.css";

export const FrontNoMoreIndicator: React.FC<{ nomoreOpacity: number }> = ({
  nomoreOpacity,
}) => {
  return (
    <div className="front nomore" style={{ opacity: nomoreOpacity }}>
      <div className="action-container nomore-container">
        <IonText className="action-text nomore-text">POOR CARD 💩</IonText>
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
        <IonText className="action-text negative-text">DON'T KNOW 😐</IonText>
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
        <IonText className="action-text positive-text">KNOW 😉</IonText>
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
        <IonText className="action-text onemore-text">ONE MORE 🤔</IonText>
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
        <IonText className="action-text nomore-text">POOR CARD 💩</IonText>
      </div>
    </div>
  );
};
