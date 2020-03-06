import { updateColumn, createTask } from "../actions";
import { getToDoColumn } from "../selectors";

export const createCreateTaskInColumnAction = (
  updateColumnAction,
  createTaskAction
) => () => (dispatch, getState, api) => {
  const todoColumn = getToDoColumn(getState());

  if (todoColumn) {
    return dispatch(createTaskAction()).then(taskId => {
      todoColumn.tasks = [taskId].concat(todoColumn.tasks);
      return dispatch(updateColumnAction(todoColumn.id, todoColumn));
    });
  }
  return false;
};

export const createTaskInColumn = createCreateTaskInColumnAction(
  updateColumn,
  createTask
);
