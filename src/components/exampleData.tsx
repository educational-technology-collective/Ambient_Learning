export const cardCollection = [
  {
    index: 1,
    type: "q",
    seenTimes: 1,
    timeStamp: "2:03",
    timeInterval: 4,
    content: {
      question: "How to define a function in python",
      answer: "def func()",
    },
  },

  {
    index: 2,
    type: "m",
    seenTimes: 2,
    timeStamp: "20: 14",
    timeInterval: 6,
    content: {
      question: "How to print a variable x in Python?",
      answer: [
        { option: "System.out.println(x)", isCorrect: false },
        { option: "printf(x)", isCorrect: false },
        { option: "cout << x", isCorrect: false },
        { option: "print(x)", isCorrect: true },
      ],
    },
  },

  {
    index: 4,
    type: "q",
    seenTimes: 2,
    timeStamp: "12:10",
    timeInterval: 4,
    content: {
      question: "Writie Code to increment variable x by 2",
      answer: "x += 2",
    },
  },

  {
    index: 9,
    type: "m",
    seenTimes: 1,
    timeStamp: "11:11",
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
    timeStamp: "31:10",
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
    timeStamp: "8: 12",
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
];
