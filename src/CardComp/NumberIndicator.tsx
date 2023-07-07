import "./Card.css";

const NumberIndicator: React.FC<{ tupleCounter: number }> = ({
  tupleCounter,
}) => {
  return (
    <>
      {/* Front Side Indicator */}
      <div className="onemore-number front-text front-number">
        {tupleCounter}
      </div>
      {/* Back Side Indicator */}
      <div className="onemore-number back-text back-number">{tupleCounter}</div>
    </>
  );
};
export default NumberIndicator;
