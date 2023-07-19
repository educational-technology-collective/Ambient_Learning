/* 
------------**********-----------

This file is for the logging telementary data. 
This also contains functions to move on the cards deck.

------------**********-----------
*/
import { CapacitorHttp } from "@capacitor/core";

export const getLatestRecord = async (
  user_id: string,
  accessToken: string,
  handleStartTime: (time: string) => void
) => {
  const response = await CapacitorHttp.get({
    url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?user_id=${user_id}`,
  });
  const data = await JSON.parse(response.data);
  if (data.new) {
    postInitialize(user_id, accessToken, handleStartTime);
  } else {
    handleStartTime(data.start_time);

    const event = {
      event_name: "Resume",
      event_time: new Date().toISOString(),
      card_id: null,
      self_eval: null,
      test_eval: null,
      isBuffer: null,
    };
    const dataStream = {
      action: event,
      end_time: null,
    };
    const responseInitialize = await CapacitorHttp.put({
      url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?user_id=${user_id}&start_time=${data.start_time}`,
      data: dataStream,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Put Resume", responseInitialize);
  }
};

// POST Request that initialize the log build
export const postInitialize = async (
  userId: string,
  accessToken: string,
  handleStartTime: (time: string) => void
) => {
  let copyTime = new Date().toISOString();
  // We use convert toISOString() for MongoDB Date Format
  handleStartTime(copyTime);
  const log = {
    user_id: userId,
    start_time: copyTime,
  };
  const response = await CapacitorHttp.post({
    url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile`,
    data: log,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("Post Response", response);

  // PUT Request for the Initialize Container at the first place. Have to be
  // together here
  const event = {
    event_name: "Initialize",
    event_time: copyTime,
    card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };
  const dataStream = {
    action: event,
    end_time: null,
  };
  const responseInitialize = await CapacitorHttp.put({
    url: `https://a97mj46gc1.execute-api.us-east-1.amazonaws.com/dev/telemetry/mobile?user_id=${userId}&start_time=${copyTime}`,
    data: dataStream,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("Put Initialize", responseInitialize);
};

export const putFlipping = (
  cardId: string,
  cardIndex: number,
  tupleLength: number,
  putLogInfo: (event: action, end_time: string | null) => void
) => {
  const event: action = {
    event_name: "flip",
    event_time: new Date().toISOString(),
    card_id: cardId,
    self_eval: null,
    test_eval: null,
    isBuffer: cardIndex !== tupleLength - 1,
  };
  putLogInfo(event, null);
};

export const putSwipe = (isEvaluation: boolean, testEvaluation: string, selfEvaluation:string, type: string, cardId: string, cardIndex: number, tupleLength: number, tupleIndex: number, nextCardFunc: (tupleIndex: number, event: action, fcId: string, latestRecord: latestResult) => void) => {
  let name = 'swipe';
  let machineEvaluation = testEvaluation;
  if(!isEvaluation){
    name = 'noEvaluation';
  }else{
    if(!cardIndex){
      name = 'swipe-shake';
    }
    if(type === 'm' && testEvaluation === ''){
      machineEvaluation = 'skipped';
    }
  }
  const event : action = {
    event_name: name,
    event_time: new Date().toISOString(),
    card_id: cardId,
    self_eval: selfEvaluation,
    test_eval: machineEvaluation,
    isBuffer: cardIndex !== tupleLength - 1
  }

  const latestRecord: latestResult = {
    tapResult: machineEvaluation,
    swipeResult: selfEvaluation
  }

  nextCardFunc(tupleIndex, event, cardId, latestRecord);

}

export const putSessionFinished = (
  putLogInfo: (event: action, end_time: string | null) => void
) => {
  const event = {
    event_name: "SessionFinished",
    event_time: new Date().toISOString(),
    card_id: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };
  putLogInfo(event, new Date().toISOString());
};
