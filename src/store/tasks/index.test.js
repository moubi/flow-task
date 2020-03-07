import expect from "../../testUtils/unexpected-react";
import { createStore, combineReducers } from "redux";

import tasksReducer, { getTasks, isFetching } from "./";

import {
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAILURE,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  CREATE_TASK_SUCCESS
} from "./constants";

function createFakeStore(intialState) {
  return createStore(combineReducers(tasksReducer), intialState);
}

let store;
let dispatch;

describe("tasksReducer", () => {
  it("should initialize store with default value", () => {
    store = createFakeStore();

    expect(store.getState().tasks, "to equal", {
      fetching: false,
      data: {}
    });
  });

  it(`should handle action ${LOAD_TASKS_SUCCESS}`, () => {
    store = createFakeStore();
    dispatch = store.dispatch;

    dispatch({
      type: LOAD_TASKS_SUCCESS,
      payload: {
        "1": {
          id: "1",
          text: "Task 1",
          lastModifiedDate: 3424
        },
        "2": {
          id: "2",
          text: "Task 2",
          lastModifiedDate: 8498
        }
      }
    });

    expect(store.getState(), "to equal", {
      tasks: {
        fetching: false,
        data: {
          "1": {
            id: "1",
            text: "Task 1",
            lastModifiedDate: 3424
          },
          "2": {
            id: "2",
            text: "Task 2",
            lastModifiedDate: 8498
          }
        }
      }
    });
  });

  it(`should handle action ${UPDATE_TASK_SUCCESS}`, () => {
    store = createFakeStore({
      tasks: {
        fetching: false,
        data: {
          "1": {
            id: "1",
            text: "Task 1",
            lastModifiedDate: 3424
          },
          "2": {
            id: "2",
            text: "Task 2",
            lastModifiedDate: 8498
          }
        }
      }
    });
    dispatch = store.dispatch;

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: {
        id: "1",
        text: "Task with updated text",
        lastModifiedDate: 9009
      }
    });

    expect(store.getState().tasks, "to equal", {
      fetching: false,
      data: {
        "1": {
          id: "1",
          text: "Task with updated text",
          lastModifiedDate: 9009
        },
        "2": {
          id: "2",
          text: "Task 2",
          lastModifiedDate: 8498
        }
      }
    });
  });

  it(`should handle action ${CREATE_TASK_SUCCESS}`, () => {
    store = createFakeStore({
      tasks: {
        fetching: false,
        data: {
          "1": {
            id: "1",
            text: "Task 1",
            lastModifiedDate: 3424
          }
        }
      }
    });
    dispatch = store.dispatch;

    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: {
        id: "2",
        text: "Task 2",
        lastModifiedDate: 8498
      }
    });

    expect(store.getState().tasks, "to equal", {
      fetching: false,
      data: {
        "1": {
          id: "1",
          text: "Task 1",
          lastModifiedDate: 3424
        },
        "2": {
          id: "2",
          text: "Task 2",
          lastModifiedDate: 8498
        }
      }
    });
  });

  it(`should handle action ${DELETE_TASK_SUCCESS}`, () => {
    store = createFakeStore({
      tasks: {
        fetching: false,
        data: {
          "1": {
            id: "1",
            text: "Task 1",
            lastModifiedDate: 3424
          },
          "2": {
            id: "2",
            text: "Task 2",
            lastModifiedDate: 8498
          }
        }
      }
    });
    dispatch = store.dispatch;

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: ["1"]
    });

    expect(store.getState().tasks, "to equal", {
      fetching: false,
      data: {
        "2": {
          id: "2",
          text: "Task 2",
          lastModifiedDate: 8498
        }
      }
    });
  });

  it("should return all tasks", () => {
    const store = createFakeStore({
      tasks: {
        fetching: false,
        data: {
          "1": {
            id: "1",
            text: "Task 1",
            lastModifiedDate: 3424
          },
          "2": {
            id: "2",
            text: "Task 2",
            lastModifiedDate: 8498
          }
        }
      }
    });

    expect(getTasks(store.getState()), "to equal", {
      "1": {
        id: "1",
        text: "Task 1",
        lastModifiedDate: 3424
      },
      "2": {
        id: "2",
        text: "Task 2",
        lastModifiedDate: 8498
      }
    });
  });

  it("should return fetching state false by default", () => {
    const store = createFakeStore();

    expect(isFetching(store.getState()), "to be false");
  });

  it(`should return fetching state true on ${LOAD_TASKS_REQUEST}`, () => {
    const store = createFakeStore();
    dispatch = store.dispatch;

    dispatch({ type: LOAD_TASKS_REQUEST });

    expect(isFetching(store.getState()), "to be true");
  });

  it(`should return fetching state false on ${LOAD_TASKS_SUCCESS}`, () => {
    const store = createFakeStore();
    dispatch = store.dispatch;

    dispatch({ type: LOAD_TASKS_REQUEST });
    dispatch({
      type: LOAD_TASKS_SUCCESS,
      payload: {
        "1": {
          id: "1",
          text: "Task 1",
          lastModifiedDate: 3424
        },
        "2": {
          id: "2",
          text: "Task 2",
          lastModifiedDate: 8498
        }
      }
    });

    expect(isFetching(store.getState()), "to be false");
  });

  it(`should return fetching state false on ${LOAD_TASKS_FAILURE}`, () => {
    const store = createFakeStore();
    dispatch = store.dispatch;

    dispatch({ type: LOAD_TASKS_REQUEST });
    dispatch({ type: LOAD_TASKS_FAILURE });

    expect(isFetching(store.getState()), "to be false");
  });
});
