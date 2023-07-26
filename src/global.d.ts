import { ReactNode } from "react";

export {};

declare global {
  interface flashCard {
    _id: string;
    lm_id: string;
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
    eventName: string;
    eventTime: string;
    fc_id: string | null;
    selfEval: string | null;
    testEval: string | null;
    isBuffer: boolean | null;
  }

  interface reviewInfo {
    userId: string;
    startTime: Date | null;
    endTime: Date | null;
    actionContainer: action[];
  }

  interface userCard {
    fc_id: {
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

  interface latestResult {
    tapResult: string;
    swipeResult: string;
  }
}
