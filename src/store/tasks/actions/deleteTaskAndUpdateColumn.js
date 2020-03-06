import { createAction, createErrorAction } from "../../utils";
import { updateColumn } from "../../columns/actions/updateColumn";
import { getColumnByTaskId } from "../../selectors";

import {
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE
} from "../constants";

const deleteTaskRequest = createAction(DELETE_TASK_REQUEST);
const deleteTaskSuccess = createAction(DELETE_TASK_SUCCESS);
const deleteTaskFailure = createErrorAction(DELETE_TASK_FAILURE);

export const getColumnWithRemovedTask = (state, taskId) => {
  const columnData = getColumnByTaskId(state, taskId);
  if (columnData) {
    columnData.tasks.splice(columnData.tasks.indexOf(taskId), 1);
  }
  return columnData;
};

export const createDeleteTaskAction = updateColumnAction => id => (
  dispatch,
  getState,
  api
) => {
  dispatch(deleteTaskRequest());

  return api.deleteTask(id).then(
    data => {
      dispatch(deleteTaskSuccess([id]));
      const columnData = getColumnWithRemovedTask(getState(), id);

      if (columnData) {
        return dispatch(updateColumnAction(columnData.id, columnData)).then(
          wasSuccessful => {
            if (wasSuccessful) {
              return true;
            }

            return false;
          }
        );
      }
      return false;
    },
    error => {
      dispatch(deleteTaskFailure(error));
      return false;
    }
  );
};

export const deleteTaskAndUpdateColumn = createDeleteTaskAction(updateColumn);
