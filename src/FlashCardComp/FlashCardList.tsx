import { useRef } from "react";
import Card from "../CardComp/Card";
import "./FlashCardList.css";
const FlashCardList: React.FC<{
  array: any[];
  tupleIndex: number;
  tupleCounter: number;
  isFrontTuple: boolean;
  swipeNextCard: (tupleIndex: number) => void;
  swipeOneMoreCard: (tupleIndex: number) => void;
}> = ({
  array,
  tupleIndex,
  tupleCounter,
  isFrontTuple,
  swipeNextCard,
  swipeOneMoreCard,
}) => {
  const refTuple = useRef<HTMLInputElement>(null);
  const tupleBehindCard = array[array.length - 1];
  let component;

  component = (
    <Card
      obj={tupleBehindCard}
      key={tupleBehindCard.id}
      tupleIndex={tupleIndex}
      moveOn={swipeNextCard}
      oneMore={swipeOneMoreCard}
      refTuple={refTuple}
    />
  );

  return (
    <div className="tuple" ref={refTuple}>
      {isFrontTuple
        ? array.map((card, index) => {
            // If the tuple is front, we display its top two cards
            if (index === tupleCounter - 1 || index === tupleCounter - 2) {
              return (
                <Card
                  obj={card}
                  key={card.id}
                  tupleIndex={tupleIndex}
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
