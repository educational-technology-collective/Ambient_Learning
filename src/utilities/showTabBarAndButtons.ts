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
  const dontKnow: any = document.getElementById("dontKnow-button");
  const oneMore: any = document.getElementById("oneMore-button");
  const poorCard: any = document.getElementById("poorCard-button");
  if (dontKnow && oneMore && poorCard) {
    dontKnow.style.opacity = "0.2";
    oneMore.style.opacity = "0.2";
    poorCard.style.opacity = "0.2";
    dontKnow.disabled = true;
    oneMore.disabled = true;
    poorCard.disabled = true;
  }
};

// Only Display Dont Know Button
export const showDontKnow = () => {
  const know: any = document.getElementById("know-button");
  const oneMore: any = document.getElementById("oneMore-button");
  const poorCard: any = document.getElementById("poorCard-button");
  if (know && oneMore && poorCard) {
    know.style.opacity = "0.2";
    oneMore.style.opacity = "0.2";
    poorCard.style.opacity = "0.2";
    know.disabled = true;
    oneMore.disabled = true;
    poorCard.disabled = true;
  }
};

// Only Display One More Button
export const showOneMore = () => {
  const dontKnow: any = document.getElementById("dontKnow-button");
  const know: any = document.getElementById("know-button");
  const poorCard: any = document.getElementById("poorCard-button");
  if (dontKnow && know && poorCard) {
    dontKnow.style.opacity = "0.2";
    know.style.opacity = "0.2";
    poorCard.style.opacity = "0.2";
    dontKnow.disabled = true;
    know.disabled = true;
    poorCard.disabled = true;
  }
};

// Only Display Poor Card Button
export const showPoorCard = () => {
  const dontKnow: any = document.getElementById("dontKnow-button");
  const oneMore: any = document.getElementById("oneMore-button");
  const know: any = document.getElementById("know-button");
  if (dontKnow && oneMore && know) {
    dontKnow.style.opacity = "0.2";
    oneMore.style.opacity = "0.2";
    know.style.opacity = "0.2";
    dontKnow.disabled = true;
    oneMore.disabled = true;
    know.disabled = true;
  }
};
