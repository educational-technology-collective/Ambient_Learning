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
    event_time: string;
    card_id: string | null;
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

  interface userCard {
    fcId: {
      $oid: string
    };
    type: string;
    reviewRecord: {
      gotCorrect: number,
      gotWrong: number,
      skipped: number,
      know: number,
      forget: number,
      oneMore: number,
      noMore: number
    },
    latestRecord: {
      tapResult: number | null,
      swipeResult: string,
    }
    seenTime: number,
    nextReview: Date | null;
    _id: string;
    createdAt: {
      $date: Date | null
    };
    updatedAt: {
      $date: Date | null
    }
  }
}
