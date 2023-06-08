export {}

declare global{
  interface flashCard {
    index: number;
    type: string;
    seenTimes: number;
    timeStamp: string;
    timeInterval: number;
    content: {
      question: string;
      answer: any;
    };
  }
}