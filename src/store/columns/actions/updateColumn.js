import { createAction, createErrorAction } from "../../utils";

import {
  UPDATE_COLUMN_REQUEST,
  UPDATE_COLUMN_SUCCESS,
  UPDATE_COLUMN_FAILURE
} from "../constants";

const updateColumnRequest = createAction(UPDATE_COLUMN_REQUEST);
const updateColumnSuccess = createAction(UPDATE_COLUMN_SUCCESS);
const updateColumnFailure = createErrorAction(UPDATE_COLUMN_FAILURE);

export const updateColumn = (id, data) => (dispatch, getState, api) => {
  dispatch(updateColumnRequest());

  return api.updateColumn(id, data).then(
    () => {
      dispatch(updateColumnSuccess(data));
      return true;
    },
    error => {
      dispatch(updateColumnFailure(error));
      return false;
    }
  );
};
