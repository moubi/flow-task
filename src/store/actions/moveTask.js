import { updateColumn } from "../actions";
import { getColumnByTaskId, getColumn } from "../selectors";

export const moveTask = (taskId, toColumnId, atIndex) => (
  dispatch,
  getState,
  api
) => {
  const fromColumn = getColumnByTaskId(getState(), taskId);
  const toColumn = getColumn(getState(), toColumnId);

  if (fromColumn && toColumn) {
    fromColumn.tasks.splice(fromColumn.tasks.indexOf(taskId), 1);
    toColumn.tasks.splice(atIndex, 0, taskId);

    return dispatch(updateColumn(fromColumn.id, fromColumn)).then(() =>
      dispatch(updateColumn(toColumn.id, toColumn))
    );
  }
  return false;
};
