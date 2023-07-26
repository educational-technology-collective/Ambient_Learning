/* 
------------**********-----------

This file is for the logging telementary data. 
This also contains functions to move on the cards deck.

------------**********-----------
*/
import { CapacitorHttp } from "@capacitor/core";

// Function that requests the latest available record or make a new one
export const getLatestRecord = async (
  userId: string,
  accessToken: string,
  handleStartTime: (time: string) => void,
  handleReadyLog: () => void
) => {
  const response = await CapacitorHttp.get({
    url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?user_id=${userId}`,
  });
  const data = await JSON.parse(response.data);

  // Check to see if there is a record not done yet in the database
  if (data.new) {
    // Create a new record if there isn't
    postInitialize(userId, accessToken, handleStartTime);
  }
  // If there is available record, push a resume action to the database
  else {
    handleStartTime(data.start_time);

    const event = {
      eventName: "resume",
      eventTime: new Date().toISOString(),
      fc_id: null,
      selfEval: null,
      testEval: null,
      isBuffer: null,
    };
    const dataStream = {
      action: event,
      endTime: null,
    };
    const responseResume = await CapacitorHttp.put({
      url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?user_id=${userId}&start_time=${data.start_time}`,
      data: dataStream,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });
    // Keep this for debugging purpose. Will be removed for production
    console.log("Put Resume", responseResume);
  }
  // Function that sets readyLog to be true so we can leave loading page
  handleReadyLog();
};

// POST Request that initialize the log build
export const postInitialize = async (
  userId: string,
  accessToken: string,
  handleStartTime: (time: string) => void
) => {
  let startTimeString = new Date().toISOString();
  // We use convert toISOString() for MongoDB Date Format
  handleStartTime(startTimeString);
  const log = {
    user_id: userId,
    start_time: startTimeString,
  };
  const response = await CapacitorHttp.post({
    url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile`,
    data: log,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  // Keep this for debugging purpose. Will be removed for production
  console.log("Post Response", response);

  // PUT Request for the Initialize Container at the first place. Have to do it manually
  // here, otherwise the time is not updated and will not log the initialize event
  const event = {
    eventName: "initialize",
    eventTime: startTimeString,
    fc_id: null,
    selfEval: null,
    testEval: null,
    isBuffer: null,
  };
  const dataStream = {
    action: event,
    endTime: null,
  };
  const responseInitialize = await CapacitorHttp.put({
    url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?user_id=${userId}&start_time=${startTimeString}`,
    data: dataStream,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  // Keep this for debugging purpose. Will be removed for production
  console.log("Put Initialize", responseInitialize);
};

// Log function to log the event of flipping
export const putFlipping = (
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  putLogInfo: (event: action, endTime: string | null) => void
) => {
  const event: action = {
    eventName: "flip",
    eventTime: new Date().toISOString(),
    fc_id: cardId,
    selfEval: null,
    testEval: null,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  putLogInfo(event, null);
};

// Log function to log the event of swiping
export const putSwipe = (
  isEvaluation: boolean,
  testEvaluation: string,
  selfEvaluation: string,
  type: string,
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  nextCardFunc: (
    tupleIndex: number,
    event: action,
    fc_id: string,
    latestRecord: latestResult
  ) => void
) => {
  // Initialize name to be swipe and machine evaluation same as testEval
  let name = "swipe";
  let machineEvaluation = testEvaluation;

  // If there is no evaluation, change the name
  if (!isEvaluation) {
    name = "noEvaluation";
  } else {
    // Check if it is the last card of tuple and also it's oneMore
    if (selfEvaluation === "oneMore" && !cardIndex) {
      name = "swipe-shake";
    }
    // Determine the Machine Evaluation
    if (type === "m" && testEvaluation === "") {
      machineEvaluation = "skipped";
    }
  }
  // Create the event object
  // Evaluation is passed based on know/dontKnow/oneMore/noMore
  const event: action = {
    eventName: name,
    eventTime: new Date().toISOString(),
    fc_id: cardId,
    selfEval: selfEvaluation,
    testEval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1,
  };

  // Create the latest record object
  const latestRecord: latestResult = {
    tapResult: machineEvaluation,
    swipeResult: selfEvaluation,
  };

  nextCardFunc(tupleIndex, event, cardId, latestRecord);
};

// Log Function happens after session is finished
export const putSessionFinished = (
  putLogInfo: (event: action, endTime: string | null) => void
) => {
  const event = {
    eventName: "sessionFinished",
    eventTime: new Date().toISOString(),
    fc_id: null,
    selfEval: null,
    testEval: null,
    isBuffer: null,
  };
  putLogInfo(event, new Date().toISOString());
};
