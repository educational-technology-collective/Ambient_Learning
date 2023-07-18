import { useHistory } from "react-router";


const TryAgainButton : React.FC = () => {
  const history = useHistory();
  const buttonHandler = () => {
    history.push('/loading');
    window.location.reload();
  }
  return(
    <button className="try-again-button" onClick={buttonHandler}>Try Again</button>
  )
};

export default TryAgainButton;