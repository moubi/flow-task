import expect from "../../testUtils/unexpected-react";
import { createStore, combineReducers } from "redux";

import columnsReducer, {
  getColumns,
  getColumnByTaskId,
  getDoneColumn,
  getToDoColumn,
  getColumn
} from "./";

import { LOAD_COLUMNS_SUCCESS, UPDATE_COLUMN_SUCCESS } from "./constants";

function createFakeStore(intialState) {
  return createStore(combineReducers(columnsReducer), intialState);
}

let store;
let dispatch;

describe("columnsReducer", () => {
  it("should initialize store with default value", () => {
    store = createFakeStore();

    expect(store.getState().columns, "to equal", {});
  });

  it(`should handle action ${LOAD_COLUMNS_SUCCESS}`, () => {
    store = createFakeStore();
    dispatch = store.dispatch;

    dispatch({
      type: LOAD_COLUMNS_SUCCESS,
      payload: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: []
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: []
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });

    expect(store.getState(), "to equal", {
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: []
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: []
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });
  });

  it(`should handle action ${UPDATE_COLUMN_SUCCESS}`, () => {
    store = createFakeStore({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: []
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: []
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });
    dispatch = store.dispatch;

    dispatch({
      type: UPDATE_COLUMN_SUCCESS,
      payload: {
        id: "1",
        name: "To Do",
        tasks: ["1", "2"]
      }
    });

    expect(store.getState(), "to equal", {
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: ["1", "2"]
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: []
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });
  });

  it("should return all columns", () => {
    const store = createFakeStore({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: []
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: []
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });

    expect(getColumns(store.getState()), "to equal", {
      "1": {
        id: "1",
        name: "To Do",
        tasks: []
      },
      "2": {
        id: "2",
        name: "Doing",
        tasks: []
      },
      "3": {
        id: "3",
        name: "Done",
        tasks: []
      }
    });
  });

  it("should return column by task id", () => {
    const store = createFakeStore({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: []
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: ["1"]
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });

    expect(getColumnByTaskId(store.getState(), "1"), "to equal", {
      id: "2",
      name: "Doing",
      tasks: ["1"]
    });
  });

  it("should return column by id", () => {
    const store = createFakeStore({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: []
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: []
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });

    expect(getColumn(store.getState(), "1"), "to equal", {
      id: "1",
      name: "To Do",
      tasks: []
    });
  });

  it("should return the To Do column", () => {
    const store = createFakeStore({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: []
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: []
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });

    expect(getToDoColumn(store.getState()), "to equal", {
      id: "1",
      name: "To Do",
      tasks: []
    });
  });

  it("should return the Done column", () => {
    const store = createFakeStore({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: []
        },
        "2": {
          id: "2",
          name: "Doing",
          tasks: []
        },
        "3": {
          id: "3",
          name: "Done",
          tasks: []
        }
      }
    });

    expect(getDoneColumn(store.getState()), "to equal", {
      id: "3",
      name: "Done",
      tasks: []
    });
  });
});
