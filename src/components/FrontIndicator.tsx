import { FrontNoMoreIndicator } from "./Indicators";
const FrontIndicator: React.FC<{
  indicatorOpacity: indicatorOp;
}> = ({ indicatorOpacity }) => {
  const index: number = indicatorOpacity.index;
  const value: number = indicatorOpacity.value;

  // If index is 1, assign value to NoMore Indicator's opacity
  const nomoreOpacity: number = index === 1 ? value : 0;
  return (
    <>
      {/* Front Nomore */}
      <FrontNoMoreIndicator nomoreOpacity={nomoreOpacity} />
    </>
  );
};

export default FrontIndicator;
