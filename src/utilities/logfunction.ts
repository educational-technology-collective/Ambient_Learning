/* 
------------**********-----------

This file is for the logging telementary data. 
This also contains functions to move on the cards deck.

------------**********-----------
*/

// Function to Log initialize
export const logInitialize = (
  userID: string,
  pushSessionInitialize: (event: action, user_id: string) => void
) => {
  const event: action = {
    event_name: "Initialize",
    event_time: new Date(),
    card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };
  pushSessionInitialize(event, userID);
};

// Function to Log the Event of Entering Home Screen
export const logEnterHome = (pushLogInfo: (event: action) => void) => {
  const event: action = {
    event_name: "EnterHomeScreen",
    event_time: new Date(),
    card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };
  pushLogInfo(event);
};

// Function to Log the Event of Entering Card Screen
export const logEnterCard = (
  pushLogInfo: (event: action) => void
) => {
 
    const event: action = {
      event_name: "EnterCardScreen",
      event_time: new Date(),
      card_id: null,
      self_eval: null,
      test_eval: null,
      isBuffer: null,
    };
    pushLogInfo(event);
  
};

// Log the Flipping/Answering Event
export const logFlipping = (
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  pushLogInfo: (event: action) => void
) => {
  const event: action = {
    event_name: "flip",
    event_time: new Date(),
    card_id: cardId,
    self_eval: null,
    test_eval: null,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  pushLogInfo(event);
};

// Function to Log One More
export const logOneMore = (
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  oneMore: (tupleIndex: number, event: action) => void
) => {
  // Check if the user answers correctly/incorrectly/skipped
  let machineEvaluation = testEvaluation;
  if (type === "m" && testEvaluation === "") {
    machineEvaluation = "skipped";
  }
  let name = "swipe";
  if (cardIndex === 0) {
    name = "swipe-shake";
  }

  // Log the event of swiping a card for one more
  const event: action = {
    event_name: name,
    event_time: new Date(),
    card_id: cardId,
    self_eval: "OneMore",
    test_eval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  oneMore(tupleIndex, event);
};

// Function to Log Know Swipe
export const logKnow = (
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  moveOn: (tupleIndex: number, event: action) => void
) => {
  // Check if the user answers correctly/incorrectly/skipped
  let machineEvaluation = testEvaluation;
  if (type === "m" && testEvaluation === "") {
    machineEvaluation = "skipped";
  }

  // Log the event of swiping a card for knowing
  const event: action = {
    event_name: "swipe",
    event_time: new Date(),
    card_id: cardId,
    self_eval: "know",
    test_eval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  moveOn(tupleIndex, event);
};

// Function to Log Dontknow Swipe
export const logDontKnow = (
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  moveOn: (tupleIndex: number, event: action) => void
) => {
  // Check if the user answers correctly/incorrectly/skipped
  let machineEvaluation = testEvaluation;
  if (type === "m" && testEvaluation === "") {
    machineEvaluation = "skipped";
  }

  // Log the event of swiping a card for not knowing
  const event: action = {
    event_name: "swipe",
    event_time: new Date(),
    card_id: cardId,
    self_eval: "DontKnow",
    test_eval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  moveOn(tupleIndex, event);
};

// Function to log Poor Card before clicking
export const logPoorCardSwipeBefore = (
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  moveOn: (tupleIndex: number, event: action) => void
) => {
  // Check if the user answers correctly/incorrectly/skipped
  let machineEvaluation = testEvaluation;
  if (type === "m" && testEvaluation === "") {
    machineEvaluation = "";
  }

  // Log the event of swiping a card down without clicking
  const event: action = {
    event_name: "NoEvaluation",
    event_time: new Date(),
    card_id: cardId,
    self_eval: "PoorCard",
    test_eval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  moveOn(tupleIndex, event);
};

// Function to log poor card after clicking
export const logPoorCardSwipeAfter = (
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  moveOn: (tupleIndex: number, event: action) => void
) => {
  // Check if the user answers correctly/incorrectly/skipped
  let machineEvaluation = testEvaluation;
  if (type === "m" && testEvaluation === "") {
    machineEvaluation = "skipped";
  }

  // Log the event of siwping a card down after answering
  const event: action = {
    event_name: "swipe",
    event_time: new Date(),
    card_id: cardId,
    self_eval: "PoorCard",
    test_eval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  moveOn(tupleIndex, event);
};

export const logSessionFinished = (
  pushSessionFinished: (event: action) => void
) => {
  const event = {
    event_name: "SessionFinished",
    event_time: new Date(),
    card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };
  pushSessionFinished(event);
};
