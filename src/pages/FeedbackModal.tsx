import { useRef } from "react";
import "./FeedbackModal.css";
import { ImCross } from "react-icons/im";
import { CapacitorHttp } from "@capacitor/core";
import { useAuth0 } from "@auth0/auth0-react";
import { IonTextarea } from "@ionic/react";
import { Keyboard } from "@capacitor/keyboard";

const FeedbackModal: React.FC<{
  accessToken: string;
  showFeedback: string;
  identifier: string;
  closeQuestion: (event: any) => void;
}> = ({ accessToken, showFeedback, identifier, closeQuestion }) => {
  Keyboard.setAccessoryBarVisible({ isVisible: true });
  const form = useRef(null);

  const postFeedback = async (content: string) => {
    const body = {
      identifier: identifier,
      content: content,
    };
    const response = await CapacitorHttp.post({
      url: "https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/feedback",
      data: body,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Post Feedback", response);
  };

  const sendFeedback = (e: any) => {
    e.preventDefault();
    if (e.target[0].value !== "" ) {
      postFeedback(e.target[0].value);
      console.log(e.target)
      e.target.reset();
      closeQuestion(event);
      alert('Thank you for your feedback!')
    } else {
      alert("Make sure you fill the information!");
    }
  };

  const placeholder = "Give us feedback! This could be a bug report, a feature request, issues with a card, or anything else you want to tell us."

  return (
    <div className='feedback-wrapper' style={{transform: showFeedback}}>
    <div className="feedback-container" onClick={(event) => event.stopPropagation()}>
      <button onClick={closeQuestion} className="close-icon">
        <ImCross size="1.8rem" />
      </button>
      <form ref={form} onSubmit={sendFeedback} className="feedback-form">
          <textarea
            name="message"
            cols={30}
            rows={9}
            className="feedback-textarea"
            placeholder={placeholder}
            inputMode="text"
          ></textarea>

        <button className="feedback-button">Submit Feedback</button>
      </form>
    </div>
    </div>
  );
};

export default FeedbackModal;
