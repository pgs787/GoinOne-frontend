export const chatStatus = toggle => {
  return {
    type: "CHAT_STATUS",
    payload: !toggle
  };
};
