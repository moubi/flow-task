import { createAction, createErrorAction } from "../../utils";

import {
  LOAD_COLUMNS_REQUEST,
  LOAD_COLUMNS_SUCCESS,
  LOAD_COLUMNS_FAILURE
} from "../constants";

const loadColumnsRequest = createAction(LOAD_COLUMNS_REQUEST);
const loadColumnsSuccess = createAction(LOAD_COLUMNS_SUCCESS);
const loadColumnsFailure = createErrorAction(LOAD_COLUMNS_FAILURE);

export const loadColumns = () => (dispatch, getState, api) => {
  dispatch(loadColumnsRequest());

  return api.loadColumns().then(
    data => {
      dispatch(loadColumnsSuccess(data));
      return true;
    },
    error => {
      dispatch(loadColumnsFailure(error));
      return false;
    }
  );
};
