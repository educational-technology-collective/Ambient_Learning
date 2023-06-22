import { IonIcon } from "@ionic/react";
import "./Message.css";
import { alertCircleOutline } from "ionicons/icons";

const Message: React.FC = () => {
  return (
    <div className='toast toast-animate'>
      <IonIcon
        icon={alertCircleOutline}
        style={{
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          fontSize: "1.8rem",
          marginLeft: "0.5rem",
        }}
      />
      <div className="message-title">Oopsie!!!</div>
      <div className="message-text">No More Similar Cards!</div>
    </div>
  );
};

export default Message;
