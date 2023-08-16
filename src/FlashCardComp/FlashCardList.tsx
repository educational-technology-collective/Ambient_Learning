import { useRef, useState } from "react";
import Card from "../CardComp/Card";
import "./FlashCardList.css";
import ActionButtons from "../IndicationComp/ActionButtons";

// Tuple of Cards Component
const FlashCardList: React.FC<{
  array: flashCard[];
  tupleIndex: number;
  tupleCounter: number;
  isFrontTuple: boolean;
  putLogInfo: (event: action, end_time: string | null) => void;
  swipeNextCard: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    isBuffer: boolean,
    latestRecord: latestResult
  ) => void;
  swipeOneMoreCard: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    isBuffer: boolean,
    latestRecord: latestResult
  ) => void;
  handleStatisticsUpdate: (testEval: string, selfEval: string) => void;
}> = ({
  array,
  tupleIndex,
  tupleCounter,
  isFrontTuple,
  swipeNextCard,
  swipeOneMoreCard,
  handleStatisticsUpdate,
}) => {
  // The Reference of the Whole Tuple, used for poorcard/know/dont know swipe
  const refTuple = useRef<HTMLInputElement>(null);

  // TupleBehind is the card that is stacked at bottom (next card)
  const tupleBehindCard: flashCard = array[array.length - 1];

  const [direction, setDirection] = useState(0);

  // Set directions that will trigger swiping/loging of each direction
  // 1 - Poor Card
  // 2 - Know
  // 3 - One More
  // 4 - Dont Know
  const directionHandler = (direction: number) => {
    setDirection(direction);
  };

  // State Variable used to check if to open the buttons
  const [toOpenButton, setOpenButton] = useState(false);

  // Handler that will show the buttons as user taps the card
  const openButton = () => {
    setOpenButton(true);
  };

  // Handler that will hide the buttons as user swipes a card
  const closeButton = () => {
    setOpenButton(false);
  };

  // 4 boolean variables for each animation
  const [animateDontKnow, setAnimateDontKnow] = useState(false);
  const [animateKnow, setAnimateKnow] = useState(false);
  const [animateOneMore, setAnimateOneMore] = useState(false);
  const [animatePoorCard, setAnimatePoorCard] = useState(false);

  // Animate Don't Know Button
  const handleAnimateDontKnow = () => {
    setAnimateDontKnow(true);
    setAnimateKnow(false);
    setAnimateOneMore(false);
    setAnimatePoorCard(false);
  };

  // Animate Know Button
  const handleAnimateKnow = () => {
    setAnimateKnow(true);
    setAnimateDontKnow(false);
    setAnimateOneMore(false);
    setAnimatePoorCard(false);
  };

  // Animate One More Button
  const handleAnimateOneMore = () => {
    setAnimateOneMore(true);
    setAnimateKnow(false);
    setAnimateDontKnow(false);
    setAnimatePoorCard(false);
  };

  // Animate Poor Card Button
  const handleAnimatePoorCard = () => {
    setAnimatePoorCard(true);
    setAnimateKnow(false);
    setAnimateOneMore(false);
    setAnimateDontKnow(false);
  };

  // Stop all animation
  const handleNoAnimation = () => {
    setAnimatePoorCard(false);
    setAnimateKnow(false);
    setAnimateOneMore(false);
    setAnimateDontKnow(false);
  };

  // Key is Necessary for not shuffling choices multiple times
  const component = (
    <Card
      obj={tupleBehindCard}
      key={tupleBehindCard._id}
      tupleLength={array.length}
      cardIndex={array.length}
      tupleIndex={tupleIndex}
      moveOn={swipeNextCard}
      oneMore={swipeOneMoreCard}
      refTuple={refTuple}
      tupleCounter={tupleCounter}
      handleStatisticsUpdate={handleStatisticsUpdate}
      direction={direction}
      directionHandler={directionHandler}
      openButton={openButton}
      closeButton={closeButton}
      handleAnimateKnow={handleAnimateKnow}
      handleAniamteDontKnow={handleAnimateDontKnow}
      handleAnimatePoorCard={handleAnimatePoorCard}
      handleAnimateOneMore={handleAnimateOneMore}
      handleNoAnimation={handleNoAnimation}
    />
  );

  // Component Being Rendered
  return (
    <>
      <div className="tuple" ref={refTuple}>
        {isFrontTuple
          ? array.map((card, index) => {
              // If the tuple is front, we display its top two cards

              if (index === tupleCounter - 1 || index === tupleCounter - 2) {
                return (
                  <Card
                    obj={card}
                    key={card._id}
                    tupleLength={array.length}
                    cardIndex={index}
                    tupleIndex={tupleIndex}
                    moveOn={swipeNextCard}
                    oneMore={swipeOneMoreCard}
                    refTuple={refTuple}
                    tupleCounter={tupleCounter}
                    handleStatisticsUpdate={handleStatisticsUpdate}
                    directionHandler={directionHandler}
                    direction={direction}
                    openButton={openButton}
                    closeButton={closeButton}
                    handleAnimateKnow={handleAnimateKnow}
                    handleAniamteDontKnow={handleAnimateDontKnow}
                    handleAnimatePoorCard={handleAnimatePoorCard}
                    handleAnimateOneMore={handleAnimateOneMore}
                    handleNoAnimation={handleNoAnimation}
                  />
                );
              }
            })
          : // If the tuple is below. We only display the topmost one
            component}
      </div>
      {/* Display the buttons if it is front tuple and button boolean is true */}
      {isFrontTuple && toOpenButton ? (
        <ActionButtons
          animateDontKnow={animateDontKnow}
          animateKnow={animateKnow}
          animateOneMore={animateOneMore}
          animatePoorCard={animatePoorCard}
          directionHandler={directionHandler}
        />
      ) : null}
    </>
  );
};

export default FlashCardList;
