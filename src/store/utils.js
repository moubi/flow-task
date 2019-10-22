export const qualifySelector = (name, selector) => (state, ...args) => {
  return selector(state[name], ...args);
};
