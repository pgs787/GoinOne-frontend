const initialState = {
  coin: null,
  myasset: 0
};

export default function coinSelect(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_COIN":
      return {
        ...state,
        coin: action.payload
      };
    case "CHANGE_MYASSET":
      return {
        ...state,
        myasset: action.payload
      };

    default:
      return state;
  }
}
