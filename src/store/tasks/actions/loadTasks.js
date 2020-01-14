import { createAction, createErrorAction } from "../../utils";

import {
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAILURE
} from "../constants";

const loadTasksRequest = createAction(LOAD_TASKS_REQUEST);
const loadTasksSuccess = createAction(LOAD_TASKS_SUCCESS);
const loadTasksFailure = createErrorAction(LOAD_TASKS_FAILURE);

export const loadTasks = () => (dispatch, getState, api) => {
  dispatch(loadTasksRequest());

  return api.loadTasks().then(
    data => {
      dispatch(loadTasksSuccess(data));
      return true;
    },
    error => {
      dispatch(loadTasksFailure(error));
      return false;
    }
  );
};
