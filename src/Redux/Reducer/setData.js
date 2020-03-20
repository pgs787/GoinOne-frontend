const initialState = {
  sellData: [],
  buyData: [],
  sellToggle: false,
  buyToggle: false
};

export default function setData(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_SELL":
      return {
        ...state,
        sellData: action.payload
      };
    case "CHANGE_BUY":
      return {
        ...state,
        buyData: action.payload
      };
    case "BUY_TOGGLE":
      return {
        ...state,
        sellToggle: action.payload
      };

    case "SELL_TOGGLE":
      return {
        ...state,
        buyToggle: action.payload
      };

    default:
      return state;
  }
}
