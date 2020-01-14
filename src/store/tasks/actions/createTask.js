import { createAction, createErrorAction } from "../../utils";
import uuid from "uuid/v4";

import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE
} from "../constants";

const createTaskRequest = createAction(CREATE_TASK_REQUEST);
const createTaskSuccess = createAction(CREATE_TASK_SUCCESS);
const createTaskFailure = createErrorAction(CREATE_TASK_FAILURE);

export const createTask = () => (dispatch, getState, api) => {
  dispatch(createTaskRequest());
  const taskId = uuid();

  return api.createTask(taskId).then(
    data => {
      dispatch(createTaskSuccess(data));
      return taskId;
    },
    error => {
      dispatch(createTaskFailure(error));
      return false;
    }
  );
};
