import {
  BackNegativeIndicator,
  BackPositiveIndicator,
  BackOneMoreIndicator,
  BackNoMoreIndicator,
} from "./Indicators";

const BackIndicator: React.FC<{
  indicatorOpacity: indicatorOp;
}> = ({ indicatorOpacity }) => {
  const index = indicatorOpacity.index;
  const value = indicatorOpacity.value;

  // If index is 1, assign value to NoMore indicator's opacity
  const nomoreOpacity = index === 1 ? value : 0;

  // If index is 2, assign value to Positive Indicator's opacity
  const positiveOpacity = index === 2 ? value : 0;

  // If index is 3, assign value to OneMore indicator's opacity
  const onemoreOpacity = index === 3 ? value : 0;

  // If index is 4, assign value to Negative Indicator's opacity
  const negativeOpacity = index === 4 ? value : 0;

  // Component Being Rendered
  return (
    <>
      {/* Back NoMore */}
      <BackNoMoreIndicator nomoreOpacity={nomoreOpacity} />

      {/* Back Positive */}
      <BackPositiveIndicator positiveOpacity={positiveOpacity} />

      {/* Back OneMore */}
      <BackOneMoreIndicator onemoreOpacity={onemoreOpacity} />

      {/* Back Negative */}
      <BackNegativeIndicator negativeOpacity={negativeOpacity} />
    </>
  );
};

export default BackIndicator;
