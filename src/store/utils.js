export const qualifySelector = (name, selector) => (state, ...args) => {
  return selector(state[name], ...args);
};

export const createAction = (type, payloadFactory = x => x) => (...args) => ({
  type,
  payload: payloadFactory(...args)
});

export const createErrorAction = (type, options) => (error, payload) => ({
  type,
  error,
  errorAction: true,
  ...options,
  payload: payload || {}
});
