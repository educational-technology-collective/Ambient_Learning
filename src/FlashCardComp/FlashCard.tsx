import MCQCard from "../MCQComponents/MCQCard";
import QACard from "../QAComponents/QACard";
import './FlashCard.css'
const FlashCard: React.FC<{
  array: flashCard[];
  swipeNextCard: (id: number) => void;
  swipeOneMoreCard: (id: number) => void;
}> = ({ array, swipeNextCard, swipeOneMoreCard }) => {
  return array.map((card: flashCard) =>
    card.type === "q" ? (
      <QACard
        obj={card}
        key={card.id}
        moveOn={swipeNextCard}
        oneMore={swipeOneMoreCard}
      />
    ) : (
      <MCQCard
        obj={card}
        key={card.id}
        moveOn={swipeNextCard}
        oneMore={swipeOneMoreCard}
      />
    )
  );
};

export default FlashCard;
