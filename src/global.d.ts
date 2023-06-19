export {}

declare global{
  interface flashCard {
    index: number;
    type: string;
    seenTimes: number;
    timeInterval: number;
    content: {
      question: string;
      answer: any;
    };
  }
}