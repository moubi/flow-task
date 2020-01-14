import { updateColumn, createTask } from "../actions";
import { getToDoColumn } from "../selectors";

export const createTaskInColumn = () => (dispatch, getState, api) => {
  const todoColumn = getToDoColumn(getState());

  if (todoColumn) {
    return dispatch(createTask()).then(taskId => {
      todoColumn.tasks = [taskId].concat(todoColumn.tasks);
      return dispatch(updateColumn(todoColumn.id, todoColumn));
    });
  }
  return false;
};
