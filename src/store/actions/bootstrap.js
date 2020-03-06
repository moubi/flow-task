import { loadColumns, loadTasks } from "../actions";

export const createBootstrapAction = ({ loadColumns, loadTasks }) => () => {
  return (dispatch, getState, api) => {
    // This set up assumes having more actions in the future here
    return Promise.all([dispatch(loadColumns()), dispatch(loadTasks())]);
  };
};

export const bootstrap = createBootstrapAction({
  loadColumns,
  loadTasks
});
