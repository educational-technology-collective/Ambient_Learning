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

  const directionHandler = (direction: number) => {
    setDirection(direction);
  }

  const [toOpenButton, setOpenButton] = useState(false);

  const openButton = () => {
    setOpenButton(true);
  }

  const closeButton = () => {
    setOpenButton(false);
  }

  const [animateDontKnow, setAnimateDontKnow] = useState(false);
  const [animateKnow, setAnimateKnow] = useState(false);
  const [animateOneMore, setAnimateOneMore] = useState(false);
  const [animatePoorCard, setAnimatePoorCard] = useState(false);

  const handleAnimateDontKnow = () => {
    setAnimateDontKnow(true);
    setAnimateKnow(false);
    setAnimateOneMore(false);
    setAnimatePoorCard(false);
  }

  const handleAnimateKnow = () => {
    setAnimateKnow(true);
    setAnimateDontKnow(false);
    setAnimateOneMore(false);
    setAnimatePoorCard(false);
  }

  const handleAnimateOneMore = () => {
    setAnimateOneMore(true);
    setAnimateKnow(false);
    setAnimateDontKnow(false);
    setAnimatePoorCard(false);
  }

  const handleAnimatePoorCard = () => {
    setAnimatePoorCard(true);
    setAnimateKnow(false);
    setAnimateOneMore(false);
    setAnimateDontKnow(false);
  }

  const handleNoAnimation = () => {
    setAnimatePoorCard(false);
    setAnimateKnow(false);
    setAnimateOneMore(false);
    setAnimateDontKnow(false);
  }


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
    {isFrontTuple && toOpenButton ? <ActionButtons animateDontKnow={animateDontKnow} animateKnow={animateKnow} animateOneMore={animateOneMore} animatePoorCard={animatePoorCard} directionHandler={directionHandler} /> : null}
    </>
  );
};

export default FlashCardList;
