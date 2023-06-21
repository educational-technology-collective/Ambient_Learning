export const cardCollection = [
  [
    {
      id: 100,
      type: "m",
      content: {
        question: "What is the keyword for the output of a function",
        answer: [
          { option: "output", isCorrect: false },
          { option: "result", isCorrect: false },
          { option: "return", isCorrect: true },
          { option: "break", isCorrect: false },
        ],
      },
    },
    {
      id: 1, // Used For Key
      type: "q", // Identify Type of Card MCQ/QA
      content: {
        question: "How to define a function in python",
        answer: "def func()",
      },
    },
  ],

  [
    {
      id: 467,
      type: "q",
      content: {
        question: "How to take an input in Python?",
        answer: "input(x)",
      },
    },
    {
      id: 2, //Used For Key
      type: "m", //Identify Type of Card MCQ/QA
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
  ],

  [
    {
      id: 3210,
      type: "q",
      content: {
        question: "Write Code to multiply variable x by 3",
        answer: "x *= 3",
      },
    },
    {
      id: 4,
      type: "q",
      content: {
        question: "Write Code to increment variable x by 2",
        answer: "x += 2",
      },
    },
  ],

  [
    {
      id: 465,
      type: "m",
      content: {
        question: "x = '34512', x[1] = ?",
        answer: [
          { option: "4", isCorrect: false },
          { option: "3", isCorrect: false },
          { option: "45", isCorrect: false },
          { option: "4512", isCorrect: true },
        ],
      },
    },
    {
      id: 9,
      type: "m",
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
  ],

  [
    {
      id: 34,
      type: "q",
      content: {
        question: "What type of statements are For/While called",
        answer: "Loop",
      },
    },
    {
      id: 7,
      type: "q",
      content: {
        question: "What type of statements are If/Else called",
        answer: "Conditional Statements",
      },
    },
  ],

  [
    {
      id: 135,
      type: "m",
      content: {
        question:
          "What keyword flags statement is true only if all conditions are true",
        answer: [
          { option: "and", isCorrect: true },
          { option: "or", isCorrect: false },
          { option: "not", isCorrect: false },
          { option: "break", isCorrect: false },
        ],
      },
    },
    {
      id: 5,
      type: "m",
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
  ],

  [
    {
      id: 132,
      type: "m",
      content: {
        question:
          "What keyword flags statement is true as long as one conditon is true",
        answer: [
          { option: "and", isCorrect: false },
          { option: "or", isCorrect: true },
          { option: "not", isCorrect: false },
          { option: "continue", isCorrect: false },
        ],
      },
    },
    {
      id: 12,
      type: "q",
      content: {
        question: "x = x + 1 is equivalent to x += 1",
        answer: "True",
      },
    },
  ],

  [{id: 478,
  type: 'm',
content: {
  question: 'What operator to negate a boolean value?',
  answer: [
    {option: '!==', isCorrect: false},
    {
      option: '!', isCorrect: true
    },
    {option: '===', isCorrect: false},
    {option: '+==', isCorrect: false}
  ]
}},
    {
      id: 10,
      type: "q",
      content: {
        question: "What operator to look up a value with key",
        answer: "[]",
      },
    },
    {
      id: 45,
      type: "q",
      content: {
        question: "Describe what is happening:\ndef func():\n\t func()",
        answer: "Recursion",
      },
    },
  ],

  [{
    id: 24,
    type: 'q',
    content: {
      question: 'Index 0 returns the ___ element of an array',
      answer: 'First/Beginning'
    }
  },
    {
      id: 99,
      type: "q",
      content: {
        question: "Index -1 returns the ___ element of an array",
        answer: "Last/End",
      },
    },
    {
      id: 31,
      type: "m",
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
  ],

  [{id: 4123,
    type: 'q',
  content: {
    question: "We Didn't start the Fire is by",
    answer: 'Billy Joel'
  }},
    {
      id: 341,
      type: "m",
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
      id: 25,
      type: "m",
      content: {
        question: "answer = [15, 28, 19, 20, 45]\nWhat is answer[-1]",
        answer: [
          { option: "15", isCorrect: false },
          {
            option: "45",
            isCorrect: true,
          },
          { option: "Error", isCorrect: false },
          { option: "28", isCorrect: false },
        ],
      },
    },
  ]
];