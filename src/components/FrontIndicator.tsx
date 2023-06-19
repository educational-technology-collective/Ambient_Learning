import { FrontNoMoreIndicator } from "./Indicators";
const FrontIndicator: React.FC<{
  nomoreOpacity: number;
}> = ({ nomoreOpacity }) => {
  return (
    <>
      {/* Front Nomore */}
      <FrontNoMoreIndicator nomoreOpacity={nomoreOpacity} />
    </>
  );
};

export default FrontIndicator;
