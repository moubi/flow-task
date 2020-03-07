import { qualifySelector } from "../utils";
import {
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAILURE,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  CREATE_TASK_SUCCESS
} from "./constants";

const name = "tasks";
const initialState = {
  fetching: false,
  data: {}
};

export const tasksReducer = (state = initialState, action) => {
  if (action.type === LOAD_TASKS_REQUEST) {
    return {
      fetching: true,
      data: {
        ...state.data
      }
    }
  } else if (action.type === LOAD_TASKS_FAILURE) {
    return {
      fetching: false,
      data: {
        ...state.data
      }
    }
  } else if (action.type === LOAD_TASKS_SUCCESS) {
    return {
      fetching: false,
      data: {
        ...state.data,
        ...action.payload
      }
    };
  } else if (action.type === CREATE_TASK_SUCCESS) {
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload.id]: action.payload
      }
    };
  } else if (action.type === UPDATE_TASK_SUCCESS) {
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload.id]: {
          ...state.data[action.payload.id],
          ...action.payload
        }
      }
    };
  } else if (action.type === DELETE_TASK_SUCCESS) {
    const stateCopy = { ...state.data };

    action.payload.forEach(taskId => {
      delete stateCopy[taskId];
    });
    return {
      ...state,
      data: {
        ...stateCopy
      }
    };
  }
  return state;
};

export default { [name]: tasksReducer };

// Selectors
export const getTasks = qualifySelector(name, state => state.data || {});
export const isFetching = qualifySelector(name, state => state.fetching);

// Actions
export { loadTasks } from "./actions/loadTasks";
export { updateTask } from "./actions/updateTask";
export { deleteTaskAndUpdateColumn } from "./actions/deleteTaskAndUpdateColumn";
export { createTask } from "./actions/createTask";
