import { IonCard } from "@ionic/react";
import "./Card.css";
import MCQ from "./MCQ";
import QA from "./QA";
const Card: React.FC<{
  obj: flashCard;
}> = ({ obj }) => {
  // Transform with 180 degree flipping
  const style = isClicked
    ? { transform: "rotateY(180deg)", background: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };

  // Determine the component and content style based on type of card
  let cardComp, cardContentStyle: string;
  if (obj.type === "q") {
    cardComp = <QA obj={obj} />;
    cardContentStyle = "card-content qa-card-content";
  } else {
    cardComp = <MCQ obj={obj} />;
    cardContentStyle = "card-content mcq-card-content";
  }

  // Component Being Rendered
  return (
    <div className="card-wrapper">
      <IonCard className="card-container">
        <div className={cardContentStyle} style={style}>
          {/* Card Component as determined previously */}
          {cardComp}
        </div>
      </IonCard>
    </div>
  );
};

export default Card;
