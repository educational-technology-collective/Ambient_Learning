import "./Card.css";

// Component for the indicator of number of same concept cards
const NumberIndicator: React.FC<{ tupleCounter: number }> = ({
  tupleCounter,
}) => {
  if (tupleCounter > 1)
    return (
      <>
        {/* Front Side Indicator */}
        <div className="onemore-number front-text front-number">
          {tupleCounter - 1}
        </div>
        {/* Back Side Indicator */}
        <div className="onemore-number back-text back-number">
          {tupleCounter - 1}
        </div>
      </>
    );
  else {
    return null;
  }
};
export default NumberIndicator;
