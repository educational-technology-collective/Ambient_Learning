import { IonCard } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import "./Card.css";
import FrontIndicator from "../IndicationComp/FrontIndicator";
import BackIndicator from "../IndicationComp/BackIndicator";
import MCQ from "./MCQ";
import QA from "./QA";
import { enableGesture } from "../utilities/gesture";
import { putSwipe } from "../utilities/logfunction";
import NumberIndicator from "./NumberIndicator";
import FeedbackModal from "../pages/FeedbackModal";
import QuestionMark from "./QuestionMark";

const Card: React.FC<{
  obj: flashCard;
  tupleLength: number;
  cardIndex: number;
  tupleIndex: number;
  tupleCounter: number;
  handleStatisticsUpdate: (testEval: string, selfEval: string) => void;
  moveOn: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    latestRecord: latestResult
  ) => void;
  oneMore: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    latestRecord: latestResult
  ) => void;
  refTuple: React.RefObject<HTMLInputElement>;
}> = ({
  obj,
  tupleLength,
  cardIndex,
  tupleIndex,
  tupleCounter,
  handleStatisticsUpdate,
  moveOn,
  oneMore,
  refTuple,
}) => {
  // Reference of the single card element. We transform its style only in onemore
  const ref = useRef<HTMLInputElement>(null);

  // This isClicked is for the tap of the card
  const [isClicked, setIsClicked] = useState(false);

  const [showFeedBack, setShowFeedback] = useState(false);
  const openQuestion = () => {
    console.log("Openquestion");
    setShowFeedback(true);
  };

  const closeQuestion = () => {
    setShowFeedback(false);
  };

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
    putSwipe(
      true,
      testEvaluation,
      "know",
      obj.type,
      obj.lm_id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      moveOn
    );
  };

  // Function for negative swipe time out
  const dontKnowTimeOut = () => {
    putSwipe(
      true,
      testEvaluation,
      "dontKnow",
      obj.type,
      obj.lm_id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      moveOn
    );
  };

  // Function for one more swipe time out
  const oneMoreTimeOut = () => {
    putSwipe(
      true,
      testEvaluation,
      "oneMore",
      obj.type,
      obj.lm_id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      oneMore
    );
  };

  // Function for no more before answering
  const poorCardBeforeTimeout = () => {
    putSwipe(
      false,
      testEvaluation,
      "poorCard",
      obj.type,
      obj.lm_id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      moveOn
    );
  };

  // Function for no more after answering
  const poorCardAfterTimeOut = () => {
    putSwipe(
      true,
      testEvaluation,
      "poorCard",
      obj.type,
      obj.lm_id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
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
  let cardComp, cardContentStyle: string;
  if (obj.type === "qa") {
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
    <>
      <div className="card-wrapper" ref={ref}>
        <IonCard
          className="card-container"
          onClick={clickHandler}
          disabled={isClicked}
        >
          <div className={cardContentStyle} style={style}>
            {/* Indicator of Number of Same Concept Cards */}
            <NumberIndicator tupleCounter={tupleCounter} />

            {/* Front Indicator */}
            <FrontIndicator indicatorOpacity={indicatorOpacity} />

            {/* Card Component as determined previously */}
            {cardComp}

            {/* Indicators For the Back Page */}
            <BackIndicator indicatorOpacity={indicatorOpacity} />
          </div>
        </IonCard>
        <QuestionMark openQuestion={openQuestion} />
      </div>
      {showFeedBack ? (
        <FeedbackModal identifier={obj._id} closeQuestion={closeQuestion} />
      ) : null}
    </>
  );
};

export default Card;
