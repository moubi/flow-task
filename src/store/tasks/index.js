import { qualifySelector } from "../utils";
import {
  LOAD_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  CREATE_TASK_SUCCESS
} from "./constants";

const name = "tasks";
const initialState = {};

const tasksReducer = (state = initialState, action) => {
  if (action.type === LOAD_TASKS_SUCCESS) {
    return {
      ...state,
      ...action.payload
    };
  } else if (action.type === CREATE_TASK_SUCCESS) {
    return {
      ...state,
      [action.payload.id]: action.payload
    };
  } else if (action.type === UPDATE_TASK_SUCCESS) {
    return {
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        ...action.payload
      }
    };
  } else if (action.type === DELETE_TASK_SUCCESS) {
    const stateCopy = { ...state };

    action.payload.forEach(taskId => {
      delete stateCopy[taskId];
    });
    return stateCopy;
  }
  return state;
};

export default { [name]: tasksReducer };

// Selectors
export const getTasks = qualifySelector(name, state => state || {});

// Actions
export { loadTasks } from "./actions/loadTasks";
export { updateTask } from "./actions/updateTask";
export { deleteTaskAndUpdateColumn } from "./actions/deleteTaskAndUpdateColumn";
export { createTask } from "./actions/createTask";
