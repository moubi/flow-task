import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ui from "./ui";
import columns from "./columns";
import tasks from "./tasks";

const middlewares = [thunk];
const rootReducer = combineReducers({ ...ui, ...columns, ...tasks });

export default createStore(rootReducer, applyMiddleware(...middlewares));
