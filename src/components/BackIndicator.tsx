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

  const nomoreOpacity = index === 1 ? value : 0;

  const positiveOpacity = index === 2 ? value : 0;

  const onemoreOpacity = index === 3 ? value : 0;

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
