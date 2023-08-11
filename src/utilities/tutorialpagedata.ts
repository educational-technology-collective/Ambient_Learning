export const cards = [
  [
    {
      _id: "tutorial4",
      lm_id: "s12najdn",
      type: "mcq",
      content: {
        question: "Great! Which direction to indicate this card is bad?",
        answer: [
          { option: "Swipe Left", isCorrect: false },
          { option: "Swipe Right", isCorrect: false },
          { option: "Swipe Up", isCorrect: false },
          { option: "Swipe Down", isCorrect: true },
        ],
      },
    },
  ],
  [
    {
      _id: "tutorial3",
      lm_id: "jjsjaodja",
      type: "qa",
      content: {
        question: "You might be wondering what the number in the upper left indicates! This shows you how many alternative flashcards on this same topic are available.\n\n(tap to continue)",
        answer: "To see the additional cards available for this topic just swipe up.  👆",
      },
    },
  ],
  [
    {
      _id: "tutorial2",
      lm_id: "sdnajdn",
      type: "mcq",
      content: {
        question:
          `Sometimes you will be given a multiple choice question
          instead of an open-ended question.  In this case you
          can either tap the card to reveal the answer, or choose
          from one of the options given. Here's your first chance
          to show some knowledge -- how do you flip over a card
          to see the answer?`,
        answer: [
          { option: "Tap or choose from a multiple choice option", isCorrect: true },
          { option: "Turn on a voice assistant and shout", isCorrect: false },
          { option: "Swipe in a circular pattern clockwise", isCorrect: false },
          { option: "Press the volume key", isCorrect: false },
        ],
      },
    },
  ],
  [
    {
      _id: "tutorial1",
      lm_id: "jjiajsid",
      type: "qa",
      content: {
        question:
          `Hello there! Welcome to Tutorial!\n\nThis is a flashcard where you would normally be asked about a topic in the course.\n\nOnce you have thought about the question, **tap** on the card to reveal the answer.`,
        answer: "Great Job! Now you are seeing the back of the card which has the answer. If you knew the answer then just swipe right to get the next card.  👉",
      },
    },
  ],
];
