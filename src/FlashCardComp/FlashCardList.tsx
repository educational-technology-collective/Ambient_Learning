import { useRef, useState } from "react";
import Card from "../CardComp/Card";
import "./FlashCardList.css";

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
  direction: number;
  directionHandler: (direction: number) => void;
  closeButton: () => void;
  openButton: () => void;
  handleAnimateKnow: () => void;
  handleAnimateDontKnow: () => void;
  handleAnimatePoorCard: () => void;
  handleAnimateOneMore: () => void;
  handleNoAnimation: () => void;
}> = ({
  array,
  tupleIndex,
  tupleCounter,
  isFrontTuple,
  swipeNextCard,
  swipeOneMoreCard,
  handleStatisticsUpdate,
  direction,
  directionHandler,
  closeButton,
  openButton,
  handleAnimateKnow,
  handleAnimateDontKnow,
  handleAnimatePoorCard,
  handleAnimateOneMore,
  handleNoAnimation
}) => {
  // The Reference of the Whole Tuple, used for poorcard/know/dont know swipe
  const refTuple = useRef<HTMLInputElement>(null);

  // TupleBehind is the card that is stacked at bottom (next card)
  const tupleBehindCard: flashCard = array[array.length - 1];

  
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
  
    </>
  );
};

export default FlashCardList;
