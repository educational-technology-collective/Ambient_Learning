import { useRef } from "react";
import MCQCard from "../MCQComponents/MCQCard";
import QACard from "../QAComponents/QACard";
import "./FlashCardList.css";
const FlashCardList: React.FC<{
  array: any[];
  tupleIndex: number;
  swipeNextCard: (id: number) => void;
  swipeOneMoreCard: (tupleIndex: number, id: number) => void;
}> = ({ array, tupleIndex, swipeNextCard, swipeOneMoreCard }) => {
  const refTuple = useRef<HTMLInputElement>(null);
  return (
    <div className="tuple" ref={refTuple}>
      {array.map((card) => {
        const some =
          card.type === "q" ? (
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
        return some;
      })}
    </div>
  );
};

export default FlashCardList;
