import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { bootstrap } from "./store/actions";
import App from "./App";

import "./index.scss";

window.todo_board = store;

store.dispatch(bootstrap()).catch(() => {
  // ignore
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
