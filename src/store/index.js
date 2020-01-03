import { createStore, combineReducers } from "redux";
import ui from "./ui";
import columns from "./columns";
import tasks from "./tasks";

const reducers = combineReducers({ ...ui, ...columns, ...tasks });

export default createStore(reducers);
