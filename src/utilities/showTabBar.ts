export const hideBar = () => {
  const tabBar = document.getElementById('bottom-tab-bar');
  if (tabBar !== null) {
    tabBar.style.display = 'none';
  }
}

export const showBar = () => {
  const tabBar = document.getElementById('bottom-tab-bar');
  if (tabBar !== null) {
    tabBar.style.display = 'flex';
  }
}