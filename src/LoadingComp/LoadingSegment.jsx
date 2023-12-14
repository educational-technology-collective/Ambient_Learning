import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IonText } from "@ionic/react";

const LoadingSegment = ({icon, text, type}) => (
    <div className={`segment-container ${type}-container`}>
        <div className={`dot-bricks ${type}-bricks`}></div>
        <AiOutlineCheck size="3em" className={`check ${type}-check`} />
        {icon}
        <IonText className="segment-text">{text}</IonText>
    </div>
)

export default LoadingSegment;

// {/* Segment for Authenticating User */}
// <div className="segment-container">
// <div className="dot-bricks user-bricks"></div>
// <AiOutlineCheck size="3em" className="check user-check" />
// <FiUser size="3em" className="segment-icon" />
// <IonText className="segment-text">Authenticating User</IonText>
// </div>

// {/* Segment for Connecting to Server */}
// <div className="segment-container server-container">
// <div className="dot-bricks server-bricks"></div>
// <AiOutlineCheck size="3em" className="check server-check" />
// <BiServer className="segment-icon" size="3em" />
// <IonText className="segment-text">Connecting to Server</IonText>
// </div>

// {/* Segment for Retrieving Cards */}
// <div className="segment-container cards-container">
// <div className="dot-bricks cards-bricks"></div>
// <AiOutlineCheck size="3em" className="check cards-check" />
// <TbCards className="segment-icon" size="3em" />
// <IonText className="segment-text">Retrieving Cards</IonText>
// </div>