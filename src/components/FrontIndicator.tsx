import { FrontNoMoreIndicator } from "./Indicators";
const FrontIndicator: React.FC<{
  indicatorOpacity: indicatorOp;
}> = ({ indicatorOpacity }) => {
  const index = indicatorOpacity.index;
  const value = indicatorOpacity.value;

  // If index is 1, assign value to NoMore Indicator's opacity
  const nomoreOpacity = index === 1 ? value : 0;
  return (
    <>
      {/* Front Nomore */}
      <FrontNoMoreIndicator nomoreOpacity={nomoreOpacity} />
    </>
  );
};

export default FrontIndicator;
