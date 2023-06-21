import { useRef } from "react";
import MCQCard from "../MCQComponents/MCQCard";
import QACard from "../QAComponents/QACard";
import "./FlashCardList.css";
const FlashCardList: React.FC<{
  array: any[];
  tupleIndex: number;
  swipeNextCard: (id: number) => void;
  swipeOneMoreCard: (tupleIndex: number, id: number) => void;
  setClassBack: () => void;
}> = ({ array, tupleIndex, swipeNextCard, swipeOneMoreCard, setClassBack }) => {
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
        return some;
      })}
    </div>
  );
};

export default FlashCardList;
