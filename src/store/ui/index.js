import { qualifySelector } from "../utils";

const name = "ui";
const touchBoundary = 768;
const initialState = {
  viewportWidth: window.innerWidth
};

const uiReducer = (state = initialState, action) => {
  return state;
};

// Selectors
export const isTouch = qualifySelector(
  name,
  state => state.viewportWidth <= touchBoundary
);

export default { [name]: uiReducer };
