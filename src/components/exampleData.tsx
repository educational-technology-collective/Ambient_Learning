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

  // flashCard(2, "qaimg", 1, "3:03", 3, {
  //   imgURL:
  //   'https://www.freecodecamp.org/news/content/images/2020/11/serverCode_foR_1.png',
  //   question: "This image is an example of",
  //   answer: "Recursion in python",
  // }),

  // flashCard(3, "mcq", 3, "20: 14", 6, {
  //   question: "How to print a variable x in Python?",
  //   answer: [
  //     { option: "System.out.println(x)", isCorrect: false },
  //     { option: "printf(x)", isCorrect: false },
  //     { option: "cout << x", isCorrect: false },
  //     { option: "print(x)", isCorrect: true },
  //   ],
  // }),

  {index: 2, type: 'm', seenTimes: 2, timeStamp: "20: 14", timeInterval: 6, content: {
    question: "How to print a variable x in Python?",
    answer: [
      { option: "System.out.println(x)", isCorrect: false },
      { option: "printf(x)", isCorrect: false },
      { option: "cout << x", isCorrect: false },
      { option: "print(x)", isCorrect: true },
    ]} },

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

  { index: 9, type: "m", seenTimes: 1, timeStamp: "11:11", timeInterval: 4, content: {
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
} },

  // flashCard(5, "mcq", 2, "8: 12", 3, {
  //   question: "Negate the boolean variable isRight",
  //   answer: [
  //     { option: "isRight == !isRight", isCorrect: false },
  //     { option: "isRight = false", isCorrect: false },
  //     { option: "isRight = !isRight", isCorrect: true },
  //     { option: "isRight = true", isCorrect: false },
  //   ],
  // }),

  // flashCard(6, "qaimg", 4, "10:10", 5, {
  //   imgURL:
  //     "https://www.simplilearn.com/ice9/free_resources_article_thumb/basic-example.JPG",
  //   question: "This is an example of using what loop",
  //   answer: "For Loop",
  // }),

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
    index: 5, type: "m", seenTimes: 2, timeStamp: "8: 12", timeInterval: 3, content: {
        question: "Negate the boolean variable isRight",
        answer: [
          { option: "isRight == !isRight", isCorrect: false },
          { option: "isRight = false", isCorrect: false },
          { option: "isRight = !isRight", isCorrect: true },
          { option: "isRight = true", isCorrect: false },
        ],
      }
  }
  // flashCard(8, "qaimg", 2, "21:10", 8, {
  //   imgURL:
  //     "https://i0.wp.com/pythonguides.com/wp-content/uploads/2021/10/Python-Numpy-3d-array.png",
  //   question: "What is the dimension of the array in the figure",
  //   answer: "3",
  // }),

  // flashCard(9, "mcq", 1, "11:11", 4, {
  //   question: "Extract 'word' from x = 'whatawordcool'",
  //   answer: [
  //     { option: "x[1, 12]", isCorrect: false },
  //     {
  //       option: "x[5, 9]",
  //       isCorrect: true,
  //     },
  //     { option: "x[5, 8]", isCorrect: false },
  //     { option: "x[5]", isCorrect: false },
  //   ],
  // }),
];


export const MCQs = [
  {index: 2, type: 'm', seenTimes: 2, timeStamp: "20: 14", timeInterval: 6, content: {
      question: "How to print a variable x in Python?",
      answer: [
        { option: "System.out.println(x)", isCorrect: false },
        { option: "printf(x)", isCorrect: false },
        { option: "cout << x", isCorrect: false },
        { option: "print(x)", isCorrect: true },
      ]} },
  
     { index: 9, type: "m", seenTimes: 1, timeStamp: "11:11", timeInterval: 4, content: {
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
      } },

      {
        index: 5, type: "m", seenTimes: 2, timeStamp: "8: 12", timeInterval: 3, content: {
            question: "Negate the boolean variable isRight",
            answer: [
              { option: "isRight == !isRight", isCorrect: false },
              { option: "isRight = false", isCorrect: false },
              { option: "isRight = !isRight", isCorrect: true },
              { option: "isRight = true", isCorrect: false },
            ],
          }
      }
]
