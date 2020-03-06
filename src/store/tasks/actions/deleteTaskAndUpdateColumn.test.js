import expect from "../../../testUtils/unexpected-react";
import sinon from "sinon";

import {
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE
} from "../constants";

import {
  createDeleteTaskAction,
  getColumnWithRemovedTask
} from "./deleteTaskAndUpdateColumn";

describe("deleteTaskAndUpdateColumn", () => {
  let dispatch, getState, api;

  beforeEach(() => {
    api = {
      deleteTask: sinon.stub().named("deleteTask")
    };
    dispatch = sinon
      .stub()
      .named("dispatch")
      // Emulate thunk
      .callsFake(v => {
        return typeof v === "function" ? v(dispatch, getState) : v;
      });
    getState = sinon.stub().named("getState");
  });

  it(`should dispatch ${DELETE_TASK_REQUEST} and ${DELETE_TASK_SUCCESS}`, async () => {
    getState.returns({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: ["TaskId"]
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
    api.deleteTask.returns(Promise.resolve({}));
    const mockUpdateColumnAction = () => Promise.resolve(true);
    const deleteTask = createDeleteTaskAction(mockUpdateColumnAction);

    const wasSuccessful = await deleteTask("TaskId")(dispatch, getState, api);

    return expect(wasSuccessful, "to be true").then(
      expect(dispatch, "to have calls satisfying", [
        [{ type: DELETE_TASK_REQUEST }],
        [
          {
            type: DELETE_TASK_SUCCESS,
            payload: ["TaskId"]
          }
        ],
        [expect.it("to be fulfilled with", true)]
      ])
    );
  });

  it(`should dispatch ${DELETE_TASK_FAILURE}`, async () => {
    getState.returns({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: ["TaskId"]
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

    const error = new Error("Custom Error");
    api.deleteTask.returns(Promise.reject(error));

    const mockUpdateColumnAction = () => Promise.resolve(true);
    const deleteTask = createDeleteTaskAction(mockUpdateColumnAction);

    const wasSuccessful = await deleteTask("TaskId")(dispatch, getState, api);

    return expect(wasSuccessful, "to be false").then(
      expect(dispatch, "to have a call satisfying", [
        {
          type: DELETE_TASK_FAILURE,
          error
        }
      ])
    );
  });

  it("should return false when updating column fails", async () => {
    getState.returns({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: ["TaskId"]
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

    api.deleteTask.returns(Promise.resolve({}));
    const mockUpdateColumnAction = () => Promise.resolve(false);
    const deleteTask = createDeleteTaskAction(mockUpdateColumnAction);

    const wasSuccessful = await deleteTask("TaskId")(dispatch, getState, api);

    expect(wasSuccessful, "to be false");
  });

  it("should call the api with the correct parameter", async () => {
    getState.returns({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: ["TaskId"]
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

    api.deleteTask.returns(Promise.resolve({}));
    const mockUpdateColumnAction = () => Promise.resolve(false);
    const deleteTask = createDeleteTaskAction(mockUpdateColumnAction);

    await deleteTask("TaskId")(dispatch, getState, api);

    expect(api.deleteTask, "to have a call exhaustively satisfying", [
      "TaskId"
    ]);
  });

  it("should get column data for task to be removed", () => {
    getState.returns({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: ["TaskId"]
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

    const columnDataWithRemovedTask = getColumnWithRemovedTask(
      getState(),
      "TaskId"
    );

    expect(columnDataWithRemovedTask, "to equal", {
      id: "1",
      name: "To Do",
      tasks: []
    });
  });

  it("should return null if no column for removed task", () => {
    getState.returns({
      columns: {
        "1": {
          id: "1",
          name: "To Do",
          tasks: ["TaskId"]
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

    const columnDataWithRemovedTask = getColumnWithRemovedTask(
      getState(),
      "WrongId"
    );

    expect(columnDataWithRemovedTask, "to be null");
  });
});
