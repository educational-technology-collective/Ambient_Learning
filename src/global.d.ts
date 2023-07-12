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
    event_time: Date;
    card_id: string | null;
    self_eval: string | null;
    test_eval: string | null;
    isBuffer: boolean | null;
  }

  interface reviewInfo {
    user_id: string;
    start_time: Date | null;
    end_time: Date | null;
    number_shake: number;
    action_container: action[];
  }

  interface userCard {
    fcId: {
      $oid: string;
    };
    type: string;
    latestRecord: {
      tapResult: number | null;
      swipeResult: string | null;
    };
    reviewRecord: {
      gotCorrect: number;
      gotWrong: number;
      passed: number;
      know: number;
      forget: number;
      oneMore: number;
      noMore: number;
    };
    prevInterval: number;
    prevFactor: number;
    nextReview: Date | null;
    _id: string;
    createdAt: {
      $date: Date | null;
    };
    updatedAt: {
      $date: Date | null;
    };
  }
}
