import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import GlobalStyle from "Style/global";
import socketio from "socket.io-client";

//redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "Redux/Reducer/rootReducer";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Routes />
  </Provider>,
  document.getElementById("root")
);
// const socket = socketio.connect("http://10.58.7.181:8000/exchange/BTC/krw");
// (() => {
//   socket.emit("init", { name: "bella" });
//   socket.on("welcome", msg => {
//     console.log(msg);
//   });
// })();
