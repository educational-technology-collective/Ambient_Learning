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

  interface ReviewInfo {
    user_id: string;
    start_time: string;
    end_time: string;
    review_length: number; 
    action: any[]
  }
}