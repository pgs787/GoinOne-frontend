export const chatStatus = toggle => {
  return {
    type: "CHAT_STATUS",
    payload: !toggle
  };
};

export const changeCoin = coin => {
  return {
    type: "CHANGE_COIN",
    payload: coin
  };
};

export const changeMyasset = asset => {
  return {
    type: "CHANGE_MYASSET",
    payload: asset
  };
};

export const changesell = data => {
  return {
    type: "CHANGE_SELL",
    payload: data
  };
};

export const changebuy = data => {
  return {
    type: "CHANGE_BUY",
    payload: data
  };
};

export const sell = toggle => {
  return {
    type: "BUY_TOGGLE",
    payload: !toggle
  };
};

export const buy = toggle => {
  return {
    type: "SELL_TOGGLE",
    payload: !toggle
  };
};
