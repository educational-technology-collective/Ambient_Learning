/* 
------------**********-----------

This file is for the logging telementary data. 
This also contains functions to move on the cards deck.

------------**********-----------
*/

// Function to Log initialize
export const logInitialize = (
  userID: string,
  oldInfo: reviewInfo,
  updateInfo: (newInfo: reviewInfo) => void
) => {
  const event: action = {
    event_name: "Initialize",
    event_time: new Date(),
    card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };
  let newInfo = oldInfo;
  newInfo.user_id = userID;
  newInfo.start_time = new Date();
  newInfo.action_container.push(event);
  updateInfo(newInfo);
};

// Function to Log the Event of Shaking
export const logShakePhone = (
  oldInfo: reviewInfo,
  finished: number,
  total: number,
  updateInfo: (newInfo: reviewInfo) => void
) => {
  // Increase the Number of Shake
  const event: action = {
    event_name: "shake",
    event_time: new Date(),
    card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };

  // Create a copy of logInfo
  let newInfo: reviewInfo = oldInfo;

  // Check to see if this is the last card(remember states are updated after)
  if (finished === total - 1) {
    newInfo.end_time = new Date();
  }
  newInfo.number_shake = newInfo.number_shake + 1;
  newInfo.action_container.push(event);
  updateInfo(newInfo);
};

// Function to Log the Event of Entering Home Screen
export const logEnterHome = (
  oldInfo: reviewInfo,
  updateInfo: (newInfo: reviewInfo) => void
) => {
  const event: action = {
    event_name: "EnterHomeScreen",
    event_time: new Date(),
    card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };
  let newInfo: reviewInfo = oldInfo;
  newInfo.action_container.push(event);
  updateInfo(newInfo);
};

// Function to Log the Event of Entering Card Screen
export const logEnterCard = (
  oldInfo: reviewInfo,
  updateInfo: (newInfo: reviewInfo) => void
) => {
  if (
    oldInfo.action_container[oldInfo.action_container.length - 1].event_name !==
    "EnterCardScreen"
  ) {
    const event: action = {
      event_name: "EnterCardScreen",
      event_time: new Date(),
      card_id: null,
      self_eval: null,
      test_eval: null,
      isBuffer: null,
    };
    let newInfo: reviewInfo = oldInfo;
    newInfo.action_container.push(event);
    updateInfo(newInfo);
  }
};

// Log the Flipping/Answering Event
export const logFlipping = (
  logInfo: reviewInfo,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  updateInfo: (newInfo: reviewInfo) => void
) => {
  const event: action = {
    event_name: "flip",
    event_time: new Date(),
    card_id: cardId,
    self_eval: null,
    test_eval: null,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  let newInfo: reviewInfo = logInfo;
  newInfo.action_container.push(event);
  updateInfo(newInfo);
};

// Function to Log One More
export const logOneMore = (
  logInfo: reviewInfo,
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  oneMore: (tupleIndex: number, newInfo: reviewInfo) => void
) => {
  // Check if the user answers correctly/incorrectly/skipped
  let machineEvaluation = testEvaluation;
  if (type === "m" && testEvaluation === "") {
    machineEvaluation = "skipped";
  }

  // Log the event of swiping a card for one more
  const event: action = {
    event_name: "swipe",
    event_time: new Date(),
    card_id: cardId,
    self_eval: "OneMore",
    test_eval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  let newInfo: reviewInfo = logInfo;
  newInfo.action_container.push(event);
  oneMore(tupleIndex, newInfo);
};

// Function to Log Know Swipe
export const logKnow = (
  logInfo: reviewInfo,
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  moveOn: (tupleIndex: number, newInfo: reviewInfo) => void
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
  let newInfo: reviewInfo = logInfo;
  newInfo.action_container.push(event);
  moveOn(tupleIndex, newInfo);
};

// Function to Log Dontknow Swipe
export const logDontKnow = (
  logInfo: reviewInfo,
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  moveOn: (tupleIndex: number, newInfo: reviewInfo) => void
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
  let newInfo: reviewInfo = logInfo;
  newInfo.action_container.push(event);
  moveOn(tupleIndex, newInfo);
};

// Function to log Poor Card before clicking
export const logPoorCardSwipeBefore = (
  logInfo: reviewInfo,
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  moveOn: (tupleIndex: number, newInfo: reviewInfo) => void
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
  let newInfo: reviewInfo = logInfo;
  newInfo.action_container.push(event);
  moveOn(tupleIndex, newInfo);
};

// Function to log poor card after clicking
export const logPoorCardSwipeAfter = (
  logInfo: reviewInfo,
  testEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  moveOn: (tupleIndex: number, newInfo: reviewInfo) => void
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
  let newInfo: reviewInfo = logInfo;
  newInfo.action_container.push(event);
  moveOn(tupleIndex, newInfo);
};
