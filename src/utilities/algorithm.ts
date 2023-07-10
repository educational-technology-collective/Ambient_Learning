export const srsAlgorithm = (userCard : any) => {
  
  let prevFactor, interval = 0, nextDate;
  nextDate = new Date(userCard.updatedAt.$date)
    // Case When the card is new 
    if(userCard.nextReview === null){
      interval = 1;
      
    }else{
      // Calculate the delay of time 
      let delay = new Date().getTime() - new Date(userCard.nextReview).getTime();
      delay = delay / (1000 * 60 * 60 * 24);
    }
    userCard.nextReview = nextDate.setDate(nextDate.getDate() + interval);
    

};