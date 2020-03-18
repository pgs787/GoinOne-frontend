import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import GlobalStyle from "Style/global";

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
