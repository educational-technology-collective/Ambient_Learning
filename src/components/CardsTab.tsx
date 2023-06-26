import "./CardsTab.css";
import { FaMedal } from "react-icons/fa";

const CardsTab: React.FC<{ cardsLeft: number; isCardScreen: boolean }> = ({
  cardsLeft,
  isCardScreen,
}) => {
  let firstStyle, secondStyle, thirdStyle;
  if (isCardScreen) {
    firstStyle = "tab-card activate first-activate";
    secondStyle = "tab-card activate second-activate";
    thirdStyle = "tab-card activate third-activate";
  } else {
    firstStyle = "tab-card";
    secondStyle = "tab-card";
    thirdStyle = "tab-card";
  }
  return cardsLeft !== 0 ? (
    <div className="cards">
      {cardsLeft >= 3 ? (
        <div className={thirdStyle}>
          <p>{cardsLeft}</p>
        </div>
      ) : null}

      <div className={secondStyle}>
        <p>{cardsLeft}</p>
      </div>

      {cardsLeft >= 2 ? (
        <div className={firstStyle}>
          <p> {cardsLeft}</p>
        </div>
      ) : null}
    </div>
  ) : (
    <FaMedal size="3em" />
  );
};

export default CardsTab;
