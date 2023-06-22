import { useRef } from "react";
import MCQCard from "../MCQComponents/MCQCard";
import QACard from "../QAComponents/QACard";
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
  let component;

  // This is to determine the type of the card being displaed below
  component =
    array[array.length - 1].type === "q" ? (
      <QACard
        obj={array[array.length - 1]}
        key={array[array.length - 1].id}
        tupleIndex={tupleIndex}
        moveOn={swipeNextCard}
        oneMore={swipeOneMoreCard}
        refTuple={refTuple}
      />
    ) : (
      <MCQCard
        obj={array[array.length - 1]}
        key={array[array.length - 1].id}
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
              return card.type === "q" ? (
                <QACard
                  obj={card}
                  key={card.id}
                  tupleIndex={tupleIndex}
                  moveOn={swipeNextCard}
                  oneMore={swipeOneMoreCard}
                  refTuple={refTuple}
                />
              ) : (
                <MCQCard
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
