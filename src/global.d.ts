import { ReactNode } from "react";

export {};

declare global {
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
    index: number;
    value: number;
  }

  interface individualChoice {
    option: string;
    isCorrect: boolean;
  }

  interface action {
    event_name: string;
    card_id: string | null;
    flip_time: string | null;
    swipe_time: string | null;
    self_eval: string | null;
    test_eval: string | null;
    isBuffer: boolean | null;
  }

  interface reviewInfo {
    user_id: string;
    start_time: string;
    end_time: string;
    number_shake: number;
    action_container: action[];
  }
}
