export const cardCollection = [
  [
    {
      _id: "100",
      lmid: 'sjdiadjoa',
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
      _id: "1", // Used For Key
      lmid: 'sjdiadjoa',
      type: "q", // _identify Type of Card MCQ/QA
      content: {
        question: "How to define a function in python",
        answer: "def func()",
      },
    },
  ],

  [
    {
      _id: "467",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question: "How to take an input in Python?",
        answer: "input(x)",
      },
    },
    {
      _id: "2", //Used For Key
      lmid: 'sjdiadjoa',
      type: "m", //_identify Type of Card MCQ/QA
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
      _id: "23132",
      lmid: 'sjdiadjoa',
      type: "m",
      content: {
        question:
          "Which of the following regex patterns will correctly match words starting with a capital letter?",
        answer: [
          { option: "r'[A-Za-z]+'", isCorrect: false },
          { option: "r'[A-Z][a-z]*'", isCorrect: true },
          { option: "r'[a-zA-Z]+'", isCorrect: false },
          { option: "r'[a-z][A-Z]+'", isCorrect: false },
        ],
      },
    },
    {
      _id: "4",
      lmid: 'sjdiadjoa',
      type: "m",
      content: {
        question:
          "Which of the following regex patterns will correctly match names of students who received a B grade?",
        answer: [
          { option: "r'w+sw+(?=: B)'", isCorrect: true },
          { option: "r'w+sw+(?= B)'", isCorrect: false },
          { option: "r'w+sw+'", isCorrect: false },
          { option: "r': B'", isCorrect: false },
        ],
      },
    },
  ],

  [
    {
      _id: "135",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question:
          "Where can we learn more about merging, joining and concatenating?",
        answer: "The Pandas Docs",
      },
    },
    {
      _id: "5",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question: "What is a venn diagram used for?",
        answer: "To show commonalities and differences of attributes",
      },
    },
  ],

  [
    {
      _id: "10",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question: "What is the function that we use for merging DataFrames?",
        answer: "pd.merge",
      },
    },
    {
      _id: "45",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question: "What does left join include?",
        answer: "df1's data including the intersection",
      },
    },
  ],

  [
    {
      _id: "24",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question:
          "Should you include index parameters if you are merging on a specific column?",
        answer: "No",
      },
    },
    {
      _id: "99",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question: "How does pandas preserve conflicting columns?",
        answer: "It appends _x and _y",
      },
    },
    {
      _id: "31",
      lmid: 'sjdiadjoa',
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
      _id: "223",
      lmid: 'sjdiadjoa',
      type: "m",
      content: {
        question:
          "Which of the following Pandas methods can be used to count occurrences of unique values in a DataFrame column?",
        answer: [
          { option: ".count()", isCorrect: false },
          { option: ".unique()", isCorrect: false },
          { option: ".value_counts()", isCorrect: true },
          { option: ".groupby()", isCorrect: false },
        ],
      },
    },
    {
      _id: "523",
      lmid: 'sjdiadjoa',
      type: "m",
      content: {
        question:
          "What is the most suitable data structure for storing the ratio of children who contracted chickenpox but were vaccinated against it, separated by sex?",
        answer: [
          { option: "List", isCorrect: false },
          { option: "Dictionary", isCorrect: true },
          { option: "Tuple", isCorrect: false },
          { option: "Set", isCorrect: false },
        ],
      },
    },
  ],

  [
    {
      _id: "132",
      lmid: 'sjdiadjoa',
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
      _id: "478",
      lmid: 'sjdiadjoa',
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
          { option: "Group. This is just to test the limit yes", isCorrect: false },
        ],
      },
    },
  ],

  [
    {
      _id: "44124",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question:
          "How can you filter a DataFrame based on a specific column value in Pandas?",
        answer:
          "To filter a DataFrame based on a specific column value, use the syntax `df[df['column_name'] == value]`, where 'df' is the DataFrame, 'column_name' is the name of the column, and 'value' is the desired value to filter by.",
      },
    },
    {
      _id: "12313",
      lmid: 'sjdiadjoa',
      type: "m",
      content: {
        question:
          "Which of the following data structures is most suitable for storing proportions of children with mothers having different education levels?",
        answer: [
          { option: "List", isCorrect: false },
          { option: "Dictionary", isCorrect: true },
          { option: "Tuple", isCorrect: false },
          { option: "Set", isCorrect: false },
        ],
      },
    },
  ],

  [
    {
      _id: "231",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question: "What function do we use to concatenate two DataFrames?",
        answer: "pd.concat",
      },
    },
    {
      _id: "788",
      lmid: 'sjdiadjoa',
      type: "q",
      content: {
        question: "How do you handle ambiguous keys during a concat. This is just for the sake of test. What a great day. You are true. My Dear Arthur. This is for you. I hope you know I am better. Much better.",
        answer: "Pass in an array of keys",
      },
    },
  ],
];
