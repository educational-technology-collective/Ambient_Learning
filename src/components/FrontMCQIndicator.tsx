import {
  FrontNegativeIndicator,
  FrontNoMoreIndicator,
  FrontPositiveIndicator,
  FrontOneMoreIndicator,
} from "./Indicators";

const FrontMCQIndicator: React.FC<{
  negativeOpacity: number;
  positiveOpacity: number;
  onemoreOpacity: number;
  nomoreOpacity: number;
}> = ({ negativeOpacity, positiveOpacity, onemoreOpacity, nomoreOpacity }) => {
  return (
    <>
      {/* Back Negative */}
      <FrontNegativeIndicator negativeOpacity={negativeOpacity} />

      {/* Back Positive */}
      <FrontPositiveIndicator positiveOpacity={positiveOpacity} />

      {/* Back OneMore */}
      <FrontOneMoreIndicator onemoreOpacity={onemoreOpacity} />

      {/* Back NoMore */}
      <FrontNoMoreIndicator nomoreOpacity={nomoreOpacity} />
    </>
  );
};

export default FrontMCQIndicator;
