// This Function is used to hide the bottom tabs
export const hideBar = () => {
  const tabBar = document.getElementById("bottom-tab-bar");
  if (tabBar !== null) {
    tabBar.style.display = "none";
  }
};

// This Function is used to display the bottom tabs again
export const showBar = () => {
  const tabBar = document.getElementById("bottom-tab-bar");
  if (tabBar !== null) {
    tabBar.style.display = "flex";
  }
};

// Only Display Know Button
export const showKnow = () => {
  const dontKnow = document.getElementById('dontKnow-button');
  const oneMore = document.getElementById('oneMore-button');
  const poorCard = document.getElementById('poorCard-button');
 if(dontKnow && oneMore && poorCard){
   dontKnow.style.display = 'none';
   oneMore.style.display = 'none';
   poorCard.style.display = 'none'
 }
}

// Only Display Dont Know Button
export const showDontKnow = () => {
  const know = document.getElementById('know-button');
  const oneMore = document.getElementById('oneMore-button');
  const poorCard = document.getElementById('poorCard-button');
 if(know && oneMore && poorCard){
   know.style.display = 'none';
   oneMore.style.display = 'none';
   poorCard.style.display = 'none'
 }
}

// Only Display One More Button
export const showOneMore = () => {
  const dontKnow = document.getElementById('dontKnow-button');
  const know = document.getElementById('know-button');
  const poorCard = document.getElementById('poorCard-button');
 if(dontKnow && know && poorCard){
   dontKnow.style.display = 'none';
   know.style.display = 'none';
   poorCard.style.display = 'none'
 }
}

// Only Display Poor Card Button
export const showPoorCard = () => {
  const dontKnow = document.getElementById('dontKnow-button');
  const oneMore = document.getElementById('oneMore-button');
  const know = document.getElementById('know-button');
 if(dontKnow && oneMore && know){
   dontKnow.style.display = 'none';
   oneMore.style.display = 'none';
   know.style.display = 'none'
 }
}