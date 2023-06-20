import { useRef } from "react";
import MCQCard from "../MCQComponents/MCQCard";
import QACard from "../QAComponents/QACard";
import "./FlashCardList.css";
const FlashCardList: React.FC<{
  array: any[];
  swipeNextCard: (id: number) => void;
  swipeOneMoreCard: (id: number) => void;
}> = ({ array, swipeNextCard, swipeOneMoreCard }) => {
  const refTuple = useRef<HTMLInputElement>(null);
  return (
    <div className="tuple" ref={refTuple}>
      {array.map((card) => {
        console.log(card.type);
        const some =
          card.type === "q" ? (
            <QACard
              obj={card}
              key={card.id}
              moveOn={swipeNextCard}
              oneMore={swipeOneMoreCard}
              refTuple={refTuple}
            />
          ) : (
            <MCQCard
              obj={card}
              key={card.id}
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
