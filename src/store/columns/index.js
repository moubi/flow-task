import { qualifySelector } from "../utils";
import { LOAD_COLUMNS_SUCCESS, UPDATE_COLUMN_SUCCESS } from "./constants";

const name = "columns";
const initialState = {};

export const columnsReducer = (state = initialState, action) => {
  if (action.type === LOAD_COLUMNS_SUCCESS) {
    return {
      ...state,
      ...action.payload
    };
  } else if (action.type === UPDATE_COLUMN_SUCCESS) {
    const stateCopy = { ...state };
    stateCopy[action.payload.id] = {
      ...stateCopy[action.payload.id],
      ...action.payload
    };
    return stateCopy;
  }
  return state;
};

export default { [name]: columnsReducer };

// Selectors
export const getColumns = qualifySelector(name, state => state || {});

export const getColumnByTaskId = (state, taskId) => {
  const columns = Object.values(getColumns(state));
  const column = columns.find(column => column.tasks.includes(taskId));

  return column || null;
};

export const getDoneColumn = state => {
  const columns = Object.values(getColumns(state));
  return columns[columns.length - 1] || null;
};

export const getToDoColumn = state => {
  const columns = Object.values(getColumns(state));
  return columns[0] || null;
};

export const getColumn = (state, id) => {
  const columns = getColumns(state);
  return columns[id] || null;
};

// Actions
export { loadColumns } from "./actions/loadColumns";
export { updateColumn } from "./actions/updateColumn";
