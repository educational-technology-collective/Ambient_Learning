import "./WalkingPerson.css";

const WalkingPerson: React.FC = () => {
  return (
    // Walking Person contains Head, Body, Two Legs, and Shadow
    <div className="walking">
      <div className="head"></div>
      <div className="body"></div>
      <div className="firstLeg"></div>
      <div className="secondLeg"></div>
      <div className="shadow"></div>
    </div>
  );
};

export default WalkingPerson;
