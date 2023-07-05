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
