export const srsAlgorithm = (card: userCard) => {};

export const algorithmTester = (previous: any, evaluation: any) => {
  // Initialize the memFactor to be 1.95 and Interval to be 1 day
  let memFactor = 1.95,
    interval = 1;

  // Case When the card is not new. We will change based on info we have
  if (previous !== null) {
    // If the user swipes noMore. This card will no longer be shown
    // We use interval of 9999999999999 to indicate
    if (evaluation.swipeResult === "noMore") {
      return { memFactor: memFactor, interval: 9999999999999 };
    }

    // The Card is not new. So we have the previous memFactor and interval
    memFactor = previous.memFactor;
    interval = previous.interval;

    // Difference is the subtraction of how many numbers the user knows and forgets
    // the card in total.
    let difference = evaluation.know - evaluation.forget;

    // Case when the user swipes know for the latest evaluation
    if (evaluation.swipeResult === "know") {
      // Increase the memFactor by 0.09
      memFactor += 0.09;

      // If it's MCQ and the user's test evaluation is incorrect. We penalize this
      // by a small number
      if (evaluation.tapResult === 0) {
        memFactor -= 0.012;
      }
      // If it's MCQ and the user's test evaluation is skipped. We penalize this
      // by a small number
      else if (evaluation.tapResult === 2) {
        memFactor -= 0.01;
      }
      // If the user's overall review record has 3 more 'know's than 'forget',
      // and the user just forgets after a certain point. We would reboost the
      // interval and memFactor based on difference so the user is not reset scheduling
      if (difference >= 3 && interval === 1) {
        interval = 2 + difference;
        memFactor = Math.max(1.3, memFactor + difference * 0.12);
        return { memFactor: memFactor, interval: interval };
      }
    }
    // Case when the user swipes Don't Know for the latest evaluation
    else if (evaluation.swipeResult === "forget") {
      // Decrease the memFactor by 0.3
      memFactor -= 0.3;
      // If the user forgets this time, but overall record has more 'know's, we
      // adjust the memFactor a tiny number to reboost
      if (difference >= 3) {
        memFactor += 0.025;
      }
      // Since the user forgets, we would set interval to be 1 for them to review
      return { memFactor: memFactor, interval: 1 };
    }
    // Case when the user swipes One More for the latest ealuation
    else {
      // Since the user swipes onemore, it's likely they are not very confident
      // or they want to review more about this conecpt. We decrease the memfactor
      // only by a trivial amount
      memFactor -= 0.005;
    }
    // The new memFactor will always be at least 1.3
    memFactor = Math.max(1.3, memFactor);
    // The new interval will be the ceiling of old interval times the memFactor
    interval = Math.ceil(previous.interval * memFactor);
  }
  // card.nextReview = new Date().setDate()
  return { memFactor: memFactor, interval: interval };
};
