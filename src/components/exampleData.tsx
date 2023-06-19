import { TbTimelineEventText } from "react-icons/tb";

export const cardCollection = [
  {
    index: 1, // Used For Key
    type: "q", // Identify Type of Card MCQ/QA
    seenTimes: 1, // **Used for Algorithm
    timeInterval: 4, // ** Used For Algorithm

    // This is the only thing displays
    content: {
      question: "How to define a function in python",
      answer: "def func()",
    },
    // Concept ???
  },

  {
    index: 2, //Used For Key
    type: "m", //Identify Type of Card MCQ/QA
    seenTimes: 2, // **Used for Algorithm
    timeInterval: 6, // ** Used for Algorithm

    //This is the only thing Displays
    content: {
      question: "How to print a variable x in Python?",
      answer: [
        { option: "System.out.println(x)", isCorrect: false },
        { option: "printf(x)", isCorrect: false },
        { option: "cout << x", isCorrect: false },
        { option: "print(x)", isCorrect: true },
      ],
    },
    // Concept ??
  },

  {
    index: 4,
    type: "q",
    seenTimes: 2,
    timeInterval: 4,
    content: {
      question: "Write Code to increment variable x by 2",
      answer: "x += 2",
    },
  },

  {
    index: 9,
    type: "m",
    seenTimes: 1,
    timeInterval: 4,
    content: {
      question: "Extract 'word' from x = 'whatawordcool'",
      answer: [
        { option: "x[1, 12]", isCorrect: false },
        {
          option: "x[5, 9]",
          isCorrect: true,
        },
        { option: "x[5, 8]", isCorrect: false },
        { option: "x[5]", isCorrect: false },
      ],
    },
  },

  {
    index: 7,
    type: "q",
    seenTimes: 2,
    timeInterval: 8,
    content: {
      question: "What type of statements are If/Else called",
      answer: "Conditional Statements",
    },
  },

  {
    index: 5,
    type: "m",
    seenTimes: 2,
    timeInterval: 3,
    content: {
      question: "Negate the boolean variable isRight",
      answer: [
        { option: "isRight == !isRight", isCorrect: false },
        { option: "isRight = false", isCorrect: false },
        { option: "isRight = !isRight", isCorrect: true },
        { option: "isRight = true", isCorrect: false },
      ],
    },
  },

  {
    index: 12,
    type: "q",
    seenTimes: 3,
    timeInterval: 4,
    content: {
      question: "x = x + 1 is equivalent to x += 1",
      answer: "True",
    },
  },

  {
    index: 45,
    type: "q",
    seenTimes: 3,
    timeInterval: 5,
    content: {
      question: "Describe what is happening:\ndef func():\n\t func()",
      answer: "Recursion",
    },
  },

  {
    index: 31,
    type: "m",
    seenTime: 5,
    timeInterval: 3,
    content: {
      question: 'What is the output of:\n print("12" + 13)',
      answer: [
        {
          option: "1213",
          isCorrect: false,
        },
        { option: "25", isCorrect: false },
        { option: "Error", isCorrect: true },
        { option: "12 13", isCorrect: false },
      ],
    },
  },

  {
    index: 25,
    type: "m",
    seenTime: 10,
    timeInterval: 10,
    content: {
      question: "answer = [15, 28, 19, 20, 45]\nWhat is answer[-1]",
      answer: [
        { option: "15", isCorrect: false },
        {
          option: "45",
          isCorrect: true,
        },
        { option: "Error", isCorrect: false },
        { option: "28", isCorect: false },
      ],
    },
  },
];

export const backendCollection = [
  {
    index: 341,
    type: "m",
    seenTime: 3,
    timeInterval: 8,
    content: {
      question: "Which of the following is by OneRepublic",
      answer: [
        {
          option: "Sugar",
          isCorrect: false,
        },
        { option: "Viva la Vida", isCorrect: false },
        { option: "Moves Like Jagger", isCorrect: false },
        { option: "Apologize", isCorrect: true },
      ],
    },
  },
  {
    index: 99,
    type: "q",
    seenTime: 2,
    timeInterval: 3,
    content: {
      question: "Index -1 returns the __ element of an array",
      answer: "Last/End",
    },
  },

  {
    index: 10,
    type: "q",
    seenTime: 5,
    timeInterval: 10,
    content: {
      question: "What operator to look up a value with key",
      answer: "[]",
    },
  },
];
