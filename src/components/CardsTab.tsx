import "./CardsTab.css";
import { FaMedal } from "react-icons/fa";

const CardsTab: React.FC<{ cardsLeft: number; isCardScreen: boolean }> = ({
  cardsLeft,
  isCardScreen,
}) => {
  let firstStyle, secondStyle, thirdStyle;

  // If we go to cardscreen, set cards to spread
  if (isCardScreen) {
    firstStyle = "tab-card activate first-activate";
    secondStyle = "tab-card activate second-activate";
    thirdStyle = "tab-card activate third-activate";
  } 
  // Otherwise the cards will remain as one stack
  else {
    firstStyle = "tab-card";
    secondStyle = "tab-card";
    thirdStyle = "tab-card";
  }
  return cardsLeft !== 0 ? (
    // When there are at least 3
    <div className="cards">
      {cardsLeft >= 3 ? (
        <div className={thirdStyle}>
          <p>{cardsLeft}</p>
        </div>
      ) : null}

      {/* // As long as there is 1 card left */}
      <div className={secondStyle}>
        <p>{cardsLeft}</p>
      </div>

      {/* When there are at least 2 */}
      {cardsLeft >= 2 ? (
        <div className={firstStyle}>
          <p> {cardsLeft}</p>
        </div>
      ) : null}
    </div>
  ) : (
    // A Medal to take up place when there is no more card
    <FaMedal size="3em" />
  );
};

export default CardsTab;
