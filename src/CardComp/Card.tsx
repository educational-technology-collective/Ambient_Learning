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
import {
  showDontKnow,
  showKnow,
  showOneMore,
  showPoorCard,
} from "../utilities/showTabBarAndButtons";
import PoorCardFeedback from "./PoorCardFeedback";

const Card: React.FC<{
  obj: flashCard;
  tupleLength: number;
  cardIndex: number;
  tupleIndex: number;
  tupleCounter: number;
  direction: number;
  handleStatisticsUpdate: (testEval: string, selfEval: string) => void;
  moveOn: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    isBuffer: boolean,
    latestRecord: latestResult
  ) => void;
  oneMore: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    isBuffer: boolean,
    latestRecord: latestResult
  ) => void;
  refTuple: React.RefObject<HTMLInputElement>;
  directionHandler: (direction: number) => void;
  openButton: () => void;
  closeButton: () => void;
  handleAnimateKnow: () => void;
  handleAniamteDontKnow: () => void;
  handleAnimatePoorCard: () => void;
  handleAnimateOneMore: () => void;
  handleNoAnimation: () => void;
  switchFeedback: () => void;
}> = ({
  obj,
  tupleLength,
  cardIndex,
  tupleIndex,
  tupleCounter,
  direction,
  handleStatisticsUpdate,
  moveOn,
  oneMore,
  refTuple,
  directionHandler,
  openButton,
  closeButton,
  handleAnimateKnow,
  handleAniamteDontKnow,
  handleAnimatePoorCard,
  handleAnimateOneMore,
  handleNoAnimation,
  switchFeedback,
}) => {
  // Reference of the single card element. We transform its style only in onemore
  const ref = useRef<HTMLInputElement>(null);

  // This isClicked is for the tap of the card
  const [isClicked, setIsClicked] = useState(false);

  const [showFeedback, setShowFeedback] = useState(false);
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
    openButton();
    handleNoAnimation();
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
    closeButton();
    putSwipe(
      true,
      testEvaluation,
      "know",
      obj.type,
      obj.lm_id,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      moveOn
    );
  };

  // Function for negative swipe time out
  const dontKnowTimeOut = () => {
    closeButton();
    putSwipe(
      true,
      testEvaluation,
      "dontKnow",
      obj.type,
      obj.lm_id,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      moveOn
    );
  };

  // Function for one more swipe time out
  const oneMoreTimeOut = () => {
    closeButton();
    putSwipe(
      true,
      testEvaluation,
      "oneMore",
      obj.type,
      obj.lm_id,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      oneMore
    );
  };

  // Function for no more before answering
  const poorCardBeforeTimeout = () => {
    closeButton();
    switchFeedback();
    putSwipe(
      false,
      testEvaluation,
      "poorCard",
      obj.type,
      obj.lm_id,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      oneMore
    );
  };

  // Function for no more after answering
  const poorCardAfterTimeOut = () => {
    closeButton();
    switchFeedback();
    putSwipe(
      true,
      testEvaluation,
      "poorCard",
      obj.type,
      obj.lm_id,
      obj._id,
      cardIndex,
      tupleLength,
      tupleIndex,
      handleStatisticsUpdate,
      oneMore
    );
  };

  // useEffect to enableGesture at any time
  useEffect(() => {
    enableGesture(
      obj._id,
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
      oneMoreTimeOut,
      handleAnimateKnow,
      handleAniamteDontKnow,
      handleAnimatePoorCard,
      handleAnimateOneMore,
      handleNoAnimation
    );
  });

  // useEffect that will trigger the swiping/loging if user presses the action button
  useEffect(() => {
    if (isClicked && refTuple.current) {
      const windowWidth: number = window.innerWidth;
      const windowHeight: number = window.innerHeight;
      refTuple.current.style.transition =
        "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

      // If user clicks Poor Card Button
      if (direction === 1) {
        refTuple.current.style.transform = `translateY(${
          windowHeight * 1.5
        }px)`;
        directionHandler(0);
        setTimeout(poorCardAfterTimeOut, 300);
      }
      // If user clicks Know Button
      else if (direction === 2) {
        refTuple.current.style.transform = `translateX(${windowWidth * 1.5}px)`;
        directionHandler(0);
        setTimeout(knowTimeOut, 300);
      }

      // If user clicks oneMore button
      else if (direction === 3 && ref.current) {
        // We move the card instead of the tuple
        ref.current.style.transition =
          "0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        ref.current.style.transform = `translateY(${windowHeight * -1.5}px)`;
        // Reset direction handler to 0 for next clicking
        directionHandler(0);

        setTimeout(oneMoreTimeOut, 300);
      }
      // If user clicks dontKnow button
      else if (direction === 4) {
        refTuple.current.style.transform = `translateX(${
          windowWidth * -1.5
        }px)`;
        directionHandler(0);
        setTimeout(dontKnowTimeOut, 300);
      }
    }
  });

  // Determine the component and content style based on type of card
  let cardComp, cardContentStyle: string;
  if (obj.type === "qa") {
    cardComp = <QA obj={obj} isClicked={isClicked} />;
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

  // Use Effect that will hide certain buttons for tutorial
  useEffect(() => {
    if (isClicked) {
      // If it's tutorial 1 or 2, we only display know button
      if (obj._id === "tutorial1" || obj._id === "tutorial2") {
        showKnow();
      }
      // If it's tutorial 3, we only display one more button
      else if (obj._id === "tutorial3") {
        showOneMore();
      }
      // If it's tutorial 4, we only display dont know button
      else if (obj._id === "tutorial4") {
        showDontKnow();
      }
      // If it's tutorial 5, we only display poor card button
      else if (obj._id === "tutorial5") {
        showPoorCard();
      }
    }
  }, [isClicked]);

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
          
      </div>
    </>
  );
};

export default Card;
