import { IonCard } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import "./Card.css";
import FrontIndicator from "../IndicationComp/FrontIndicator";
import BackIndicator from "../IndicationComp/BackIndicator";
import MCQ from "./MCQ";
import QA from "./QA";
import { enableGesture } from "../utilities/gesture";
import {
  logDontKnow,
  logFlipping,
  logKnow,
  logOneMore,
  logPoorCardSwipeAfter,
  logPoorCardSwipeBefore,
} from "../utilities/logfunction";
const Card: React.FC<{
  obj: flashCard;
  tupleLength: number;
  cardIndex: number;
  tupleIndex: number;
  tupleCounter: number;
  logInfo: reviewInfo;
  updateInfo: (newInfo: reviewInfo) => void;
  moveOn: (tupleIndex: number, newInfo: reviewInfo) => void;
  oneMore: (tupleIndex: number, newInfo: reviewInfo) => void;
  refTuple: React.RefObject<HTMLInputElement>;
}> = ({
  obj,
  tupleLength,
  cardIndex,
  tupleIndex,
  tupleCounter,
  moveOn,
  logInfo,
  updateInfo,
  oneMore,
  refTuple,
}) => {

  // Reference of the single card element. We transform its style only in onemore
  const ref = useRef<HTMLInputElement>(null);

  // This isClicked is for the tap of the card
  const [isClicked, setIsClicked] = useState(false);

  // Transform with 180 degree flipping
  const style = isClicked
    ? { transform: "rotateY(180deg)", background: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };

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

  // Callback for the tap of card
  const clickHandler = () => {
    setIsClicked(true);
    setClick(true);

    // Log the Event of Flipping / Answering
    logFlipping(logInfo, obj._id, cardIndex, tupleLength, updateInfo);
  };

  // State Variable to track if the user gets correct/incorrect/skipped
  const [testEvaluation, setTestEvaluation] = useState("");

  // Hanlder to set the evaluation to be correct/incorrect/skipped
  const handleTestEvaluation = (result: string) => {
    setTestEvaluation(result);
  };

  const [clicked, setClick] = useState(false);

  // This will set isClick to be true
  const setClickStatus = () => {
    setClick(true);
  };

  // Function for positive swipe time out
  const knowTimeOut = () => {
    // Log the event of Know
    logKnow(
      logInfo,
      testEvaluation,
      obj.type,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      moveOn
    );
  };

  // Function for negative swipe time out
  const dontKnowTimeOut = () => {
    // Log the event of dont know
    logDontKnow(
      logInfo,
      testEvaluation,
      obj.type,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      moveOn
    );
  };

  // Function for one more swipe time out
  const oneMoreTimeOut = () => {
    // Log the event of OneMore
    logOneMore(
      logInfo,
      testEvaluation,
      obj.type,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      oneMore
    );
  };

  // Function for no more before answering
  const poorCardBeforeTimeout = () => {
    // Log the event of swiping down before evaluation
    logPoorCardSwipeBefore(
      logInfo,
      testEvaluation,
      obj.type,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      moveOn
    );
  };

  // Function for no more after answering
  const poorCardAfterTimeOut = () => {
    // Log the event of swiping down after clicking
    logPoorCardSwipeAfter(
      logInfo,
      testEvaluation,
      obj.type,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      moveOn
    );
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
      knowTimeOut,
      dontKnowTimeOut,
      poorCardBeforeTimeout,
      poorCardAfterTimeOut,
      oneMoreTimeOut
    );
  });

  // Determine the component and content style based on type of card
  let cardComp, cardContentStyle : string;
  if (obj.type === "q") {
    cardComp = <QA obj={obj} />;
    cardContentStyle = "card-content qa-card-content";
  } else {
    cardComp = (
      <MCQ
        obj={obj}
        clicked={clicked}
        setClickStatus={setClickStatus}
        handleTestEvaluation={handleTestEvaluation}
      />
    );
    cardContentStyle = "card-content mcq-card-content";
  }

  // Component Being Rendered
  return (
    <div className="card-wrapper" ref={ref}>
      <IonCard
        className="card-container"
        onClick={clickHandler}
        disabled={isClicked}
      >
        <div className={cardContentStyle} style={style}>
        <div className="onemore-number front-text front-number">
          {tupleCounter}
        </div>
        <div className="onemore-number back-text back-number">
          {tupleCounter}
        </div>
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
