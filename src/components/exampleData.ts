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
      id: 415,
      type: "m",
      content: {
        question: "x = '34512', x[1:] = ?",
        answer: [
          { option: "4", isCorrect: false },
          { option: "3", isCorrect: false },
          { option: "45", isCorrect: false },
          { option: "4512", isCorrect: true },
        ],
      },
    },
    {
      id: 465,
      type: "m",
      content: {
        question: "x = '34512', x[1] = ?",
        answer: [
          { option: "4", isCorrect: true },
          { option: "3", isCorrect: false },
          { option: "45", isCorrect: false },
          { option: "4512", isCorrect: false },
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
// ***************************
  [
    {
      id: 135,
      type: "q",
      content: {
        question:
          "Where can we learn more about merging, joining and concatenating?",
        answer: "The Pandas Docs",
      },
    },
    {
      id: 5,
      type: "q",
      content: {
        question: "What is a venn diagram used for?",
        answer: "To show commonalities and differences of attributes",
      },
    },
  ],


  [
    {
      id: 10,
      type: "q",
      content: {
        question: "What is the function that we use for merging DataFrames?",
        answer: "pd.merge",
      },
    },
    {
      id: 45,
      type: "q",
      content: {
        question: "What does left join include?",
        answer: "df1's data including the intersection",
      },
    },
  ],

  [
    {
      id: 24,
      type: "q",
      content: {
        question:
          "Should you include index parameters if you are merging on a specific column?",
        answer: "No",
      },
    },
    {
      id: 99,
      type: "q",
      content: {
        question: "How does pandas preserve conflicting columns?",
        answer: "It appends _x and _y",
      },
    },
    {
      id: 31,
      type: "m",
      content: {
        question: "How does concat stitch together DataFrames?",
        answer: [
          {
            option: "It pushes the data",
            isCorrect: false,
          },
          { option: "It joins two DataFrames horizontally", isCorrect: false },
          { option: "It joins two DataFrames vertically", isCorrect: true },
          { option: "It's just an alias of merge", isCorrect: false },
        ],
      },
    },
  ],
  [
    {
      id: 132,
      type: "m",
      content: {
        question: "What is another name for a full outer join?",
        answer: [
          { option: "Intersection", isCorrect: false },
          { option: "Union", isCorrect: true },
          { option: "Combine", isCorrect: false },
          { option: "Group", isCorrect: false },
        ],
      },
    },
    {
      id: 478,
      type: "m",
      content: {
        question: "What is another name for an inner join?",
        answer: [
          { option: "Union", isCorrect: false },
          {
            option: "Intersection",
            isCorrect: true,
          },
          { option: "Combine", isCorrect: false },
          { option: "Group", isCorrect: false },
        ],
      },
    },
  ],

  [
    {
      id: 231,
      type: "q",
      content: {
        question: "What function do we use to concatenate two DataFrames?",
        answer: "pd.concat",
      },
    },
    {
      id: 788,
      type: "q",
      content: {
        question: "How do you handle ambiguous keys during a concat?",
        answer: "Pass in an array of keys",
      },
    },
  ],
];
