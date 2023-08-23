import { useRef } from "react";
import "./FeedbackModal.css";
import { ImCross } from "react-icons/im";
import { CapacitorHttp } from "@capacitor/core";
import { useAuth0 } from "@auth0/auth0-react";
import { IonTextarea } from "@ionic/react";
import { Keyboard } from "@capacitor/keyboard";

const FeedbackModal: React.FC<{
  identifier: string;
  closeQuestion: () => void;
}> = ({ identifier, closeQuestion }) => {
  Keyboard.setAccessoryBarVisible({ isVisible: true });
  const form = useRef(null);

  const { getAccessTokenSilently } = useAuth0();

  const postFeedback = async (title: string, content: string) => {
    const accessToken = await getAccessTokenSilently();
    const body = {
      title: title,
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
    if (e.target[0].value !== "" && e.target[1].value !== "") {
      postFeedback(e.target[0].value, e.target[1].value);
      closeQuestion();
    } else {
      alert("Make sure you fill both fields");
    }
  };

  return (
    <div className="contact contact__container container grid">
      <a onClick={closeQuestion} className="close-icon">
        <ImCross size="2.5rem" />
      </a>
      <form ref={form} onSubmit={sendFeedback} className="content__form">
        <div className="contact__form-div">
          <label className="contact__form-tag">Title</label>
          <input
            type="text"
            name="name"
            className="contact__form-input"
            placeholder="What's it about"
          />
        </div>

        <div className="contact__form-div contact__form-area">
          <label className="contact__form-tag">Content</label>
          <IonTextarea
            name="message"
            cols={30}
            rows={10}
            className="contact__form-input"
            placeholder="What's it about?"
            inputmode="text"
          ></IonTextarea>
        </div>

        <button className="button-message button--flex">Send Message</button>
      </form>
    </div>
  );
};

export default FeedbackModal;
