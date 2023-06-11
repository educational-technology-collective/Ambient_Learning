import {
  FrontNegativeIndicator,
  FrontPositiveIndicator,
  FrontOneMoreIndicator,
  FrontNoMoreIndicator,
} from "./Indicators";
const FrontIndicator: React.FC<{
  negativeOpacity: number;
  positiveOpacity: number;
  onemoreOpacity: number;
  nomoreOpacity: number;
}> = ({ negativeOpacity, positiveOpacity, onemoreOpacity, nomoreOpacity }) => {
  return (
    <>
      {/* //Front Negative */}
      <FrontNegativeIndicator negativeOpacity={negativeOpacity} />

      {/* Front Positive */}
      <FrontPositiveIndicator positiveOpacity={positiveOpacity} />

      {/* Front OneMore */}
      <FrontOneMoreIndicator onemoreOpacity={onemoreOpacity} />

      {/* Front Nomore */}
      <FrontNoMoreIndicator nomoreOpacity={nomoreOpacity} />
    </>
  );
};

export default FrontIndicator;
