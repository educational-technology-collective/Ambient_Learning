import { useHistory } from "react-router";
import "./Button.css";

const TryAgainButton: React.FC = () => {

  // callback that navigates to the loading page and refresh app
  const history = useHistory();
  const buttonHandler = () => {
    history.push("/loading");
    window.location.reload();
  };
  return (
    <button className="grad-button try-again-button" onClick={buttonHandler}>
      Try Again
    </button>
  );
};

export default TryAgainButton;
