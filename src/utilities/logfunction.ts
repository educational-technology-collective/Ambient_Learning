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
    card_id: null,
    flip_time: null,
    swipe_time: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };

  // Create a copy of logInfo
  let newInfo = oldInfo;

  // Check to see if this is the last card(remember states are updated after)
  if (finished === total - 1) {
    newInfo.end_time = Date();
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
    card_id: null,
    flip_time: null,
    swipe_time: null,
    self_eval: null,
    test_eval: null,
    isBuffer: null,
  };
  let newInfo = oldInfo;
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
      flip_time: null,
      card_id: null,
      swipe_time: null,
      self_eval: null,
      test_eval: null,
      isBuffer: null,
    };
    let newInfo = oldInfo;
    newInfo.action_container.push(event);
    updateInfo(newInfo);
  }
};
