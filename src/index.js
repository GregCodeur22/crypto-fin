import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, Provider } from "react-redux";
import App from "./App";

//Redux

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
