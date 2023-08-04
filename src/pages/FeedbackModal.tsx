import { useRef } from "react";
import './FeedbackModal.css'
import emailjs from '@emailjs/browser'
import {ImCross} from 'react-icons/im'

const FeedbackModal: React.FC<{fc_id: string | undefined, closeQuestion: () => void}> = ({fc_id, closeQuestion}) => {

  const form = useRef(null);

  const sendEmail = (e : any) => {
    e.preventDefault();
    if(form.current)
      emailjs.sendForm('service_sqrqiwq', 'template_sbqomgm', form.current, 'uIXRdmH3kUyJh3oXm');
    e.target.reset();
  }
 console.log('Feedbakcform')
  return(
    <div className="contact contact__container container grid">
        <a onClick={closeQuestion} className="close-icon"><ImCross size='2.5rem'/></a>
        <form ref={form} onSubmit={sendEmail} className="content__form">
            <div className="contact__form-div">
              <label className="contact__form-tag">Name</label>
              <input type="text" name='name' className="contact__form-input" placeholder="Insert your name"/>
            </div>

            <input name='fc_id' style={{display: 'none'}} value={fc_id} onChange={() => {}}></input>

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