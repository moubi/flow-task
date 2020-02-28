import { createAction, createErrorAction } from "../../utils";

import {
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE
} from "../constants";

const updateTaskRequest = createAction(UPDATE_TASK_REQUEST);
const updateTaskSuccess = createAction(UPDATE_TASK_SUCCESS);
const updateTaskFailure = createErrorAction(UPDATE_TASK_FAILURE);

export const updateTask = (id, data) => (dispatch, getState, api) => {
  dispatch(updateTaskRequest());
  data = {
    ...data,
    lastModifiedDate: Date.now()
  };

  return api.updateTask(id, data).then(
    () => {
      dispatch(updateTaskSuccess(data));
      return true;
    },
    error => {
      dispatch(updateTaskFailure(error));
      return false;
    }
  );
};
