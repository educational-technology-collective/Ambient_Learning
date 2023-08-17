import { useRef } from "react";
import "./ActionButtons.css";
import { CreateAnimation } from "@ionic/react";
import { BsArrowRight } from "react-icons/bs";

const ActionButtons: React.FC<{
  animatePoorCard: boolean;
  animateKnow: boolean;
  animateDontKnow: boolean;
  animateOneMore: boolean;
  directionHandler: (direction: number) => void;
}> = ({
  animatePoorCard,
  animateKnow,
  animateDontKnow,
  animateOneMore,
  directionHandler,
}) => {
  const pulseKeyFrames = [
    {
      offset: 0,
      transform: "scale(1)",
      borderColor: "green",
      boxShadow: "0 0 2px 2px green",
    },
    {
      offset: 0.3,
      transform: "scale(1.1)",
      borderColor: "green",
      boxShadow: "0 0 2px 2px green",
    },
    {
      offset: 0.5,
      transform: "scale(1)",
      borderColor: "green",
      boxShadow: "0 0 2px 2px green",
    },
    {
      offset: 0.7,
      transform: "scale(1.2)",
      borderColor: "green",
      boxShadow: "0 0 2px 2px green",
    },
    { offset: 1, transform: "scale(1)" },
  ];
  const poorCardRef = useRef<CreateAnimation>(null);
  const knowRef = useRef<CreateAnimation>(null);
  const dontKnowRef = useRef<CreateAnimation>(null);
  const oneMoreRef = useRef<CreateAnimation>(null);

  const poorCardAnimation = () => {
    directionHandler(1);
    if (poorCardRef.current) {
      poorCardRef.current.animation.play();
    }
  };
  const knowAnimation = () => {
    directionHandler(2);
    if (knowRef.current) {
      knowRef.current.animation.play();
    }
  };
  const dontKnowAnimation = () => {
    directionHandler(4);
    if (dontKnowRef.current) {
      dontKnowRef.current.animation.play();
    }
  };

  const oneMoreAnimation = () => {
    directionHandler(3);
    if (oneMoreRef.current) {
      oneMoreRef.current.animation.play();
    }
  };

  return (
    <div className="higher-container">
      <div className="action-buttons-container">
        <CreateAnimation
          ref={dontKnowRef}
          duration={1200}
          iterations={1}
          keyframes={pulseKeyFrames}
          play={animateDontKnow}
          stop={!animateDontKnow}
        >
          <button
            onClick={dontKnowAnimation}
            className="action-button"
            id="dontKnow-button"
            
          >
            🤔
          </button>
        </CreateAnimation>

        <CreateAnimation
          ref={poorCardRef}
          duration={1200}
          keyframes={pulseKeyFrames}
          play={animatePoorCard}
          stop={!animatePoorCard}
        >
          <button
            onClick={poorCardAnimation}
            className="action-button"
            id="poorCard-button"
           
          >
            💩
          </button>
        </CreateAnimation>

        <CreateAnimation
          ref={oneMoreRef}
          duration={1200}
          iterations={1}
          keyframes={pulseKeyFrames}
          play={animateOneMore}
          stop={!animateOneMore}
        >
          <button
            onClick={oneMoreAnimation}
            className="action-button"
            id="oneMore-button"
          
          >
            🎯
          </button>
        </CreateAnimation>

        <CreateAnimation
          ref={knowRef}
          duration={1200}
          iterations={1}
          keyframes={pulseKeyFrames}
          play={animateKnow}
          stop={!animateKnow}
        >
          <button
            onClick={knowAnimation}
            className="action-button"
            id="know-button"
          
          >
            😉
          </button>
        </CreateAnimation>
      </div>
    </div>
  );
};

export default ActionButtons;
