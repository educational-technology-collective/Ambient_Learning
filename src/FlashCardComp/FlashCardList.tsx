import { useRef } from "react";
import Card from "../CardComp/Card";
import "./FlashCardList.css";
const FlashCardList: React.FC<{
  array: flashCard[];
  tupleIndex: number;
  tupleCounter: number;
  isFrontTuple: boolean;
  logInfo: reviewInfo;
  swipeNextCard: (tupleIndex: number, newInfo: reviewInfo) => void;
  swipeOneMoreCard: (tupleIndex: number, newInfo: reviewInfo) => void;
}> = ({
  array,
  tupleIndex,
  tupleCounter,
  isFrontTuple,
  logInfo,
  swipeNextCard,
  swipeOneMoreCard,
}) => {
  const refTuple = useRef<HTMLInputElement>(null);

  // TupleBehind is the card that is stacked at bottom (next card)
  const tupleBehindCard: flashCard = array[array.length - 1];
  const component = (
    <Card
      obj={tupleBehindCard}
      key={tupleBehindCard._id}
      tupleLength={array.length}
      cardIndex = {array.length}
      tupleIndex={tupleIndex}
      logInfo={logInfo}
      moveOn={swipeNextCard}
      oneMore={swipeOneMoreCard}
      refTuple={refTuple}
    />
  );

  // Component Being Rendered
  return (
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
                  logInfo={logInfo}
                  moveOn={swipeNextCard}
                  oneMore={swipeOneMoreCard}
                  refTuple={refTuple}
                />
              );
            }
          })
        : // If the tuple is below. We only display the topmost one
          component}
    </div>
  );
};

export default FlashCardList;
