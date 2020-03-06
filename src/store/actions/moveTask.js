import { updateColumn } from "../actions";
import { getColumnByTaskId, getColumn } from "../selectors";

export const createMoveTaskAction = updateColumnAction => (
  taskId,
  toColumnId,
  atIndex
) => (dispatch, getState, api) => {
  const fromColumn = getColumnByTaskId(getState(), taskId);
  const toColumn = getColumn(getState(), toColumnId);

  if (fromColumn && toColumn) {
    fromColumn.tasks.splice(fromColumn.tasks.indexOf(taskId), 1);
    toColumn.tasks.splice(atIndex, 0, taskId);

    return dispatch(updateColumnAction(fromColumn.id, fromColumn)).then(() =>
      dispatch(updateColumnAction(toColumn.id, toColumn))
    );
  }
  return false;
};

export const moveTask = createMoveTaskAction(updateColumn);
