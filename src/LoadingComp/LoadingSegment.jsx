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