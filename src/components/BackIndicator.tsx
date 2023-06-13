import {
  BackNegativeIndicator,
  BackPositiveIndicator,
  BackOneMoreIndicator,
  BackNoMoreIndicator,
} from "./Indicators";

const BackIndicator: React.FC<{
  negativeOpacity: number;
  positiveOpacity: number;
  onemoreOpacity: number;
  nomoreOpacity: number;
}> = ({ negativeOpacity, positiveOpacity, onemoreOpacity, nomoreOpacity }) => {
  return (
    <>
      {/* Back Negative */}
      <BackNegativeIndicator negativeOpacity={negativeOpacity} />

      {/* Back Positive */}
      <BackPositiveIndicator positiveOpacity={positiveOpacity} />

      {/* Back OneMore */}
      <BackOneMoreIndicator onemoreOpacity={onemoreOpacity} />

      {/* Back NoMore */}
      <BackNoMoreIndicator nomoreOpacity={nomoreOpacity} />
    </>
  );
};

export default BackIndicator;
