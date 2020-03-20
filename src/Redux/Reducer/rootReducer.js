import { combineReducers } from "redux";
import ChatOption from "./ChatOption";
import coinSelect from "./coinSelect";
import setData from "./setData";
export default combineReducers({
  ChatOption,
  coinSelect,
  setData
});
