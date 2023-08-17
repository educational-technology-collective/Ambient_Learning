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
  const know: any = document.getElementById("know-button");
  if (!know.disabled) {
    dontKnow.disabled = true;
    oneMore.disabled = true;
    poorCard.disabled = true;
    know.disabled = false;
  }
};

// Only Display Dont Know Button
export const showDontKnow = () => {
  const know: any = document.getElementById("know-button");
  const oneMore: any = document.getElementById("oneMore-button");
  const poorCard: any = document.getElementById("poorCard-button");
  const dontKnow: any = document.getElementById("dontKnow-button");
  if (!dontKnow.disabled) {
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
  const oneMore: any = document.getElementById("oneMore-button");
  if (!oneMore.disabled) {
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
  const poorCard: any = document.getElementById("poorCard-button");
  if (!poorCard.disabled) {
    dontKnow.disabled = true;
    know.disabled = true;
    oneMore.disabled = true;
  }
};
