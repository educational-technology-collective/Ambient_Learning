import "./OneMoreFailMessage.css";

// The alert component that shows up when one more card fails
const OneMoreFailMessage: React.FC = () => {
  return (
    <div className="onemore-fail-message">
      <div className="onemore-fail-message-text">
        NO MORE CARD ON THIS TOPIC
      </div>
      <div className="onemore-fail-message-emoji">😕</div>
    </div>
  );
};

export default OneMoreFailMessage;
