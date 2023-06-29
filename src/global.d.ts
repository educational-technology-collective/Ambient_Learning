import { ReactNode } from "react";

export {}

declare global{
  interface flashCard {
    _id: string;
    lmid: string;
    type: string;
    content: {
      question: string;
      answer: any;
    };
  }

  interface indicatorOp {
    index: number,
    value: number
  }

  interface individualChoice{
    option: string,
    isCorrect: boolean
  }

  interface action{
      event_name: string,
      card_id: string | null,
      review_result: {
        card_start_time: string | null,
        card_end_time: string | null,
        card_review_length: number | null,
        self_eval: string | null,
        mcq_choice: string | null,
      }
  }

  
  interface reviewInfo {
    user_id: string;
    start_time: string;
    end_time: string;
    review_length: number; 
    number_one_more: number,
    number_shake: number,
    action_container: action[]
  }
}