import { loadColumns, loadTasks } from "../actions";

export const bootstrap = () => {
  return (dispatch, getState, api) => {
    // This set up assumes having more actions in the future here
    return Promise.all([dispatch(loadColumns()), dispatch(loadTasks())]);
  };
};
