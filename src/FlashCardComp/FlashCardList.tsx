import { useRef, useState } from "react";
import MCQCard from "../MCQComponents/MCQCard";
import QACard from "../QAComponents/QACard";
import "./FlashCardList.css";
const FlashCardList: React.FC<{
  array: any[];
  tupleIndex: number;
  tupleCounter: number;
  isFrontTuple: boolean;
  swipeNextCard: (tupleIndex: number, id: number) => void;
  swipeOneMoreCard: (tupleIndex: number, id: number) => void;
  setClassBack: () => void;
}> = ({
  array,
  tupleIndex,
  tupleCounter,
  isFrontTuple,
  swipeNextCard,
  swipeOneMoreCard,
  setClassBack,
}) => {
  const refTuple = useRef<HTMLInputElement>(null);
  let component;
  component =
    array[array.length - 1].type === "q" ? (
      <QACard
        obj={array[array.length - 1]}
        key={array[array.length - 1].id}
        tupleIndex={tupleIndex}
        moveOn={swipeNextCard}
        oneMore={swipeOneMoreCard}
        refTuple={refTuple}
        setClassBack={setClassBack}
      />
    ) : (
      <MCQCard
        obj={array[array.length - 1]}
        key={array[array.length - 1].id}
        tupleIndex={tupleIndex}
        moveOn={swipeNextCard}
        oneMore={swipeOneMoreCard}
        refTuple={refTuple}
        setClassBack={setClassBack}
      />
    );
  return (
    <div className="tuple" ref={refTuple}>
      {isFrontTuple
        ? array.map((card, index) => {
            if (index === tupleCounter - 1 || index === tupleCounter - 2) {
              return card.type === "q" ? (
                <QACard
                  obj={card}
                  key={card.id}
                  tupleIndex={tupleIndex}
                  moveOn={swipeNextCard}
                  oneMore={swipeOneMoreCard}
                  refTuple={refTuple}
                  setClassBack={setClassBack}
                />
              ) : (
                <MCQCard
                  obj={card}
                  key={card.id}
                  tupleIndex={tupleIndex}
                  moveOn={swipeNextCard}
                  oneMore={swipeOneMoreCard}
                  refTuple={refTuple}
                  setClassBack={setClassBack}
                />
              );
            }
          })
        : component}
    </div>
  );
};

export default FlashCardList;
