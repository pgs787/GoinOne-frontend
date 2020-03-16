const initialState = {
  status: false
};

export default function ChatOption(state = initialState, action) {
  switch (action.type) {
    case "CHAT_STATUS":
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
}
