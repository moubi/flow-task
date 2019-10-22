import { createStore } from "redux";
import { combineReducers } from "redux";
import ui from "./ui";
import board from "./board";

const reducers = combineReducers({ ...ui, ...board });

export default createStore(reducers);
