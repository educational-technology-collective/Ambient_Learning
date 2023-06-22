import "./Message.css";

const Message: React.FC = () => {
  return (
    <div className="toast">
      {/* <IonIcon
        icon={alertCircleOutline}
        style={{
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          fontSize: "1.8rem",
          marginLeft: "0.5rem",
        }}
      /> */}
      <div className="message-title">NO MORE CARD ON THIS TOPIC</div>
      <div className="message-text">😕</div>
    </div>
  );
};

export default Message;
