export const waitUntil = (waitTime) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    });
  }, waitTime);
};
