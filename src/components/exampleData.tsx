export const cardCollection = [
  
  
  {
    index: 1, // Used For Key
    type: "q", // Identify Type of Card MCQ/QA
    seenTimes: 1, // **Used for Algorithm
    timeStamp: "2:03", // Not Sure Yet
    timeInterval: 4, // ** Used For Algorithm

    // This is the only thing displays
    content: {
      question: "How to define a function in python",
      answer: "def func()",
    },
  },

  {
    index: 2, //Used For Key
    type: "m", //Identify Type of Card MCQ/QA
    seenTimes: 2, // **Used for Algorithm
    timeStamp: "20: 14", // Not sure yet
    timeInterval: 6,// ** Used for Algorithm

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
  },

  {
    index: 4,
    type: "q",
    seenTimes: 2,
    timeStamp: "12:10",
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

  {
    index: 12,
    type: "q",
    seenTimes: 3,
    timeStamp: "12: 12",
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
    timeStamp: "12:08",
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
    timeStamp: "08:09",
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
    timeStamp: "04: 12",
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
