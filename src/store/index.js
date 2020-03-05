import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import columns from "./columns";
import tasks from "./tasks";
import api from "../lib/Api";

const middlewares = [thunk.withExtraArgument(api)];
const rootReducer = combineReducers({ ...columns, ...tasks });

export default createStore(rootReducer, applyMiddleware(...middlewares));
