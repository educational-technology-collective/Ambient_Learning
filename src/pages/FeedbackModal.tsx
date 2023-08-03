import { useRef } from "react";
import emailjs from '@emailjs/browser'

const FeedbackModal: React.FC = () => {

  const form = useRef();

  const sendEmail = (e : any) => {
    e.preventDefault();
    emailjs.sendForm();
    e.target.reset();
  }

  return(
    
  )
};

export default FeedbackModal;