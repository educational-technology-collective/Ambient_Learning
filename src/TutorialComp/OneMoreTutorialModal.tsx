import "./OneMoreTutorialModal.css";
import arrow from "../../arrow.png";

const OneMoreTutorialModal: React.FC = () => {
  return (
    <div className="show-up">
      <img src={arrow} alt="Arrow" className="arrow-image" />
      {/* Modal including the description text */}
      <div className="onemore-modal">
        <div className="onemore-modal-text">
          Number At Top-Left Indicates Additional Cards of Same Concept
        </div>
      </div>
    </div>
  );
};

export default OneMoreTutorialModal;
