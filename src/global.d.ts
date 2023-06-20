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
}