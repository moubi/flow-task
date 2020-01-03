import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ui from "./ui";
import columns from "./columns";
import tasks from "./tasks";
import api from "../lib/Api";

const middlewares = [thunk.withExtraArgument(api)];
const rootReducer = combineReducers({ ...ui, ...columns, ...tasks });

export default createStore(rootReducer, applyMiddleware(...middlewares));
