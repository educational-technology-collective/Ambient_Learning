import { ReactNode } from "react";

export {}

declare global{
  interface flashCard {
    id: number;
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
}