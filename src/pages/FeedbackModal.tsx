import { useRef } from "react";
import './FeedbackModal.css'
import emailjs from '@emailjs/browser'
import {ImCross} from 'react-icons/im'

const FeedbackModal: React.FC<{identifier: string, closeQuestion: () => void}> = ({identifier, closeQuestion}) => {

  const form = useRef(null);

  const sendFeedback = (e : any) => {
    e.preventDefault();
    console.log(e.target[0].value);
    closeQuestion();
  }
 console.log('Feedbakcform')
  return(
    <div className="contact contact__container container grid">
        <a onClick={closeQuestion} className="close-icon"><ImCross size='2.5rem'/></a>
        <form ref={form} onSubmit={sendFeedback} className="content__form">
            <div className="contact__form-div">
              <label className="contact__form-tag">Title</label>
              <input type="text" name='name' className="contact__form-input" placeholder="What's it about"/>
            </div>

            <div className="contact__form-div contact__form-area">
              <label className="contact__form-tag">Content</label>
              <textarea name='message' cols={30} rows={10} className="contact__form-input" placeholder="Leave Message"></textarea>
            </div>

            <button  className="button-message button--flex">
          Send Message 
          
        </button>
          </form>
    </div>
  )
};

export default FeedbackModal;