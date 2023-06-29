import { IonCard, IonCardContent } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import "./Card.css";
import FrontIndicator from "../components/FrontIndicator";
import BackIndicator from "../components/BackIndicator";
import MCQ from "./MCQ";
import QA from "./QA";
import { enableGesture } from "./gesture";
const Card: React.FC<{
  obj: flashCard;
  tupleLength: number,
  cardIndex: number,
  tupleIndex: number;
  logInfo: reviewInfo;
  moveOn: (tupleIndex: number, newInfo: reviewInfo) => void;
  oneMore: (tupleIndex: number, newInfo: reviewInfo) => void;
  refTuple: React.RefObject<HTMLInputElement>;
}> = ({ obj, tupleLength, cardIndex, tupleIndex, moveOn, logInfo, oneMore, refTuple }) => {
  const ref = useRef<HTMLInputElement>(null);

  // This isClicked is for the tap of the card
  const [isClicked, setIsClicked] = useState(false);

  // Transform with 180 degree flipping
  const style = isClicked
    ? { transform: "rotateY(180deg)", background: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };

  // Callback for the tap of card
  const clickHandler = () => {
    setIsClicked(!isClicked);
    setClick(true);
    setCorrect(true);
  };

  const [clicked, setClick] = useState(false);

  // Function for one more swipe time out
  const oneMoreTimeOut = () => {
    oneMore(tupleIndex);
  };

  // Function that goes to next card after some time
  const timeOutFunc = () => {
    moveOn(tupleIndex);
  };

  // useEffect to enableGesture at any time
  useEffect(() => {
    enableGesture(
      ref.current,
      refTuple.current,
      isClicked,
      handleNegativeOpacity,
      handlePositiveOpacity,
      handleNoMoreOpacity,
      handleOneMoreOpacity,
      handleShowNothing,
      backHandler,
      timeOutFunc,
      oneMoreTimeOut
    );
  });

  // This will set isClick to be true
  const setClickStatus = () => {
    setClick(true);
  };

  // If the user answers correctly
  const [correct, setCorrect] = useState(false);

  const setCorrectStatus = () => {
    setCorrect(true);
  };

  // Function that set the states back
  const backHandler = () => {
    setClick(false);
    setIsClicked(false);
  };

  // Determine the component and content style based on type of card
  let cardComp, cardContentStyle;
  if (obj.type === "q") {
    cardComp = <QA obj={obj} />;
    cardContentStyle = "card-content qa-card-content";
  } else {
    cardComp = (
      <MCQ
        obj={obj}
        clicked={clicked}
        setClickStatus={setClickStatus}
        setCorrectStatus={setCorrectStatus}
      />
    );
    cardContentStyle = "card-content mcq-card-content";
  }

  // Indicator Opacity Object used to set opacities
  const [indicatorOpacity, setOpacity] = useState({ index: 0, value: 0 });

  // Function that gives NoMore(Brown) Indicator
  const handleNoMoreOpacity = (detail: any) => {
    setOpacity({ index: 1, value: detail.deltaY / 100 });
  };

  // Function that gives Positive(Green) Indicator
  const handlePositiveOpacity = (detail: any) => {
    setOpacity({ index: 2, value: detail.deltaX / 100 });
  };

  // Function that gives OneMore(Blue) Indicator
  const handleOneMoreOpacity = (detail: any) => {
    setOpacity({ index: 3, value: -detail.deltaY / 100 });
  };

  // Function that gives Negative(Red) Indicator
  const handleNegativeOpacity = (detail: any) => {
    setOpacity({ index: 4, value: -detail.deltaX / 100 });
  };

  // Function that makes all indicators disappear
  const handleShowNothing = () => {
    setOpacity({ index: 0, value: 0 });
  };

  // Component Being Rendered
  return (
    <div className="card-wrapper" ref={ref}>
      <IonCard
        className="card-container"
        onClick={clickHandler}
        disabled={isClicked}
      >
        <div className={cardContentStyle} style={style}>
          {/* Front Indicator */}
          <FrontIndicator indicatorOpacity={indicatorOpacity} />

          {/* Card Component as determined previously */}
          {cardComp}

          {/* Indicators For the Back Page */}
          <BackIndicator indicatorOpacity={indicatorOpacity} />
        </div>
      </IonCard>
    </div>
  );
};

export default Card;
