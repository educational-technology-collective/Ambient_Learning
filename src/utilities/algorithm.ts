export const srsAlgorithm = (card: userCard) => {};

export const algorithmTester = (previous: any, evaluation: any) => {
  let memFactor = 1.95,
    interval = 1;
  // Case When the card is not new
  if (previous !== null) {
    if (evaluation.swipeResult === "noMore") {
      return { memFactor: memFactor, interval: 9999999999999 };
    }
    memFactor = previous.memFactor;
    interval = previous.interval;
    let difference = evaluation.know - evaluation.forget;
    if (evaluation.swipeResult === "know") {
      memFactor += 0.09;
      if (evaluation.tapResult === 0) {
        memFactor -= 0.012;
      } else if (evaluation.tapResult === 2) {
        memFactor -= 0.01;
      }
      if (difference >= 3 && interval === 1) {
        interval = 2 + difference;
        memFactor = Math.max(1.3, memFactor + difference * 0.12);
        return { memFactor: memFactor, interval: interval };
      }
    } else if (evaluation.swipeResult === "forget") {
      memFactor -= 0.3;
      if (difference >= 3) {
        memFactor += 0.025;
      }
      return { memFactor: memFactor, interval: 1 };
    } else {
      memFactor -= 0.005;
    }
    memFactor = Math.max(1.3, memFactor);
    interval = Math.ceil(previous.interval * memFactor);
  }
  // card.nextReview = new Date().setDate()
  return { memFactor: memFactor, interval: interval };
};
