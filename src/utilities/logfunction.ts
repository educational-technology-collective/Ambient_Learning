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
  total: number,
  handleStartTime: (time: string) => void,
  handleReadyLog: () => void,
  handleDuration: (minutes: number) => void,
  handleStatisticsUpdate: (testEval: string, selfEval: string) => void
) => {
  const response = await CapacitorHttp.get({
    url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?userId=${userId}`,
  });
  console.log("Response", response);
  const data = await JSON.parse(response.data);
  console.log("data", data);
  // Check to see if there is a record not done yet in the database
  if (data.new && total) {
    // Create a new record if there isn't
    postInitialize(userId, accessToken, handleStartTime);
  }
  // If there is available record, push a resume action to the database
  else {
    const session = data.session;
    if(session !== undefined){

    handleStartTime(session.startTime);

    if (total) {
      const event = {
        eventName: "resume",
        eventTime: new Date().toISOString(),
        lm_id: null,
        selfEval: null,
        testEval: null,
        isBuffer: null,
      };
      const dataStream = {
        action: event,
        endTime: null,
      };
      const responseResume = await CapacitorHttp.put({
        url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?userId=${userId}&startTime=${session.startTime}`,
        data: dataStream,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });
      // Keep this for debugging purpose. Will be removed for production
      console.log("Put Resume", responseResume);
    }
    if (session.endTime) {
      const time =
        new Date(session.endTime).getTime() -
        new Date(session.startTime).getTime();
      const diff = Math.ceil(time / 60000);
      handleDuration(diff);
    }
    const actionContainer = session.actionContainer;
    actionContainer.forEach((event: action) => {
      if (
        (event.eventName[0] === "s" || event.eventName[0] === "n") &&
        event.testEval !== null &&
        event.selfEval
      ) {
        handleStatisticsUpdate(event.testEval, event.selfEval);
      }
    });
  }
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
    userId: userId,
    startTime: startTimeString,
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
    lm_id: null,
    selfEval: null,
    testEval: null,
    isBuffer: null,
  };
  const dataStream = {
    action: event,
    endTime: null,
  };
  const responseInitialize = await CapacitorHttp.put({
    url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?userId=${userId}&startTime=${startTimeString}`,
    data: dataStream,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  // Keep this for debugging purpose. Will be removed for production
  console.log("Put Initialize", responseInitialize);
};

// Log function to log the event of swiping
export const putSwipe = (
  isEvaluation: boolean,
  testEvaluation: string,
  selfEvaluation: string,
  type: string,
  lmId: string,
  fcId: string,
  cardIndex: number,
  tupleLength: number,
  tupleIndex: number,
  handleStatisticsUpdate: (testEval: string, selfEval: string) => void,
  nextCardFunc: (
    tupleIndex: number,
    event: action,
    lm_id: string,
    isBuffer: boolean,
    latestRecord: latestResult
  ) => void
) => {
  // Initialize name to be swipe and machine evaluation same as testEval
  let name = "swipe";
  let machineEvaluation = testEvaluation;

  // If the selfEvaluation is poorCard, log that fcId to poorFcs collection in the database

  if (selfEvaluation === "poorCard") {
    // send fcId to the server
    CapacitorHttp.post({
      url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/poorFC/${fcId}`,
      headers: {
        "content-type": "application/json",
      },
    });
  }
  // If there is no evaluation, change the name
  if (!isEvaluation) {
    name = "noEvaluation";
  } else {
    // Check if it is the last card of tuple and also it's oneMore
    if (selfEvaluation === "oneMore" && !cardIndex) {
      name = "swipe-shake";
    }
    // Determine the Machine Evaluation
    if (type === "mcq" && testEvaluation === "") {
      machineEvaluation = "skipped";
    }
  }
  // Create the event object
  // Evaluation is passed based on know/dontKnow/oneMore/noMore
  const event: action = {
    eventName: name,
    eventTime: new Date().toISOString(),
    lm_id: lmId,
    selfEval: selfEvaluation,
    testEval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1,
  };

  // Create the latest record object
  const latestRecord: latestResult = {
    tapResult: machineEvaluation,
    swipeResult: selfEvaluation,
  };
  handleStatisticsUpdate(machineEvaluation, selfEvaluation);
  nextCardFunc(
    tupleIndex,
    event,
    lmId,
    cardIndex !== tupleLength - 1,
    latestRecord
  );
};

// Log Function happens after session is finished
export const putSessionFinished = (
  startTime: string,
  handleDuration: (minutes: number) => void,
  putLogInfo: (event: action, endTime: string | null) => void
) => {
  const event = {
    eventName: "sessionFinished",
    eventTime: new Date().toISOString(),
    lm_id: null,
    selfEval: null,
    testEval: null,
    isBuffer: null,
  };
  const startTimeObj = new Date(startTime);
  const diff = new Date().getTime() - startTimeObj.getTime();
  const minutes = Math.ceil(diff / 60000);
  handleDuration(minutes);
  putLogInfo(event, new Date().toISOString());
};
