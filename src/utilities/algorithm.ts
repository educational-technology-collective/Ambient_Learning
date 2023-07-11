export const srsAlgorithm = (card : userCard) => {
    let memFactor, interval;
    if(card.prevInterval === 0){
      card.prevFactor = 2;
      card.prevInterval = 1;
  
    }
    // Case When the card is not new
    else{
      // Calculate the delay of time 
      // let delay = new Date().getTime() - new Date(card.nextReview).getTime();
      // delay = delay / (1000 * 60 * 60 * 24);

      memFactor = card.prevFactor;
      
      if(card.latestRecord.swipeResult === 'know'){
        // memFactor += 0.02  * delay;
        memFactor += 0.2;
      }
      else if(card.latestRecord.swipeResult === 'forget'){
        card.prevFactor = 1.5;
        card.prevInterval = 1;
        return 1;
      }else if(card.latestRecord.swipeResult === 'oneMore'){
        memFactor -= 0.1;
      }
      else{
        return 999999999999;
      }
      if(card.type === 'm'){
        if(card.latestRecord.tapResult === 0){
          memFactor -= 0.15;
        }else if(card.latestRecord.tapResult === 1){
          memFactor += 0.1;
        }else{
          memFactor -= 0.05;
        }
      }
      memFactor = Math.max(1.3, memFactor);
      interval = Math.floor(card.prevInterval * memFactor);
      card.prevFactor = memFactor;
      card.prevInterval = interval;
    }
    // card.nextReview = new Date().setDate()
  return interval;
    
};






export const algorithmTester = (previous: any, evaluation: any) => {
  let memFactor = 1.92, interval = 1;
    // Case When the card is not new
    if(previous !== null){
      if(evaluation.swipeResult === 'noMore'){
        return {memFactor: memFactor, interval: 9999999999999};
      }
      memFactor = previous.memFactor;
      interval = previous.interval;
      let difference = evaluation.know - evaluation.forget;
      if(evaluation.swipeResult === 'know'){
        memFactor += 0.1;
        if(difference >= 3 && interval === 1){
          interval = 1 + difference;
          memFactor = Math.max(1.3, memFactor + difference * 0.15);
          return {memFactor: memFactor, interval: interval};
        }
      }else if(evaluation.swipeResult === 'forget'){
        memFactor -= 0.30;
        if(difference >= 3){
          memFactor += 0.025;
        }
        return {memFactor: memFactor, interval: 1};
      }else{
        memFactor -= 0.05;
      }
      memFactor = Math.max(1.3, memFactor);
      interval = Math.ceil(previous.interval * memFactor);
      
    }
    // card.nextReview = new Date().setDate()
  return {memFactor: memFactor, interval: interval};
}