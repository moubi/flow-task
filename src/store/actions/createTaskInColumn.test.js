import expect from "../../testUtils/unexpected-react";
import sinon from "sinon";

import { createCreateTaskInColumnAction } from "./createTaskInColumn";

describe("createTaskInColumn", () => {
  let dispatch, getState;

  beforeEach(() => {
    dispatch = sinon
      .stub()
      .named("dispatch")
      // Emulate thunk
      .callsFake(v => {
        return typeof v === "function" ? v(dispatch, getState) : v;
      });
    getState = sinon.stub().named("getState");
  });

  it("should not create task if To Do column doesn't exist", async () => {
    getState.returns({
      columns: {},
      tasks: {}
    });

    const mockUpdateColumnAction = () => Promise.resolve(true);
    const mockCreateTaskAction = () => Promise.resolve(true);
    const createTaskInColumn = createCreateTaskInColumnAction(
      mockUpdateColumnAction,
      mockCreateTaskAction
    );
    const wasSuccessful = await createTaskInColumn()(dispatch, getState);

    return expect(wasSuccessful, "to be false");
  });

  it("should create a task in the To Do column", async () => {
    getState.returns({
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

    const mockCreateTaskAction = sinon
      .stub()
      .named("mockCreateTaskAction")
      .resolves(true);
    const mockUpdateColumnAction = () => Promise.resolve(true);
    const createTaskInColumn = createCreateTaskInColumnAction(
      mockUpdateColumnAction,
      mockCreateTaskAction
    );
    await createTaskInColumn()(dispatch, getState);

    return expect(mockCreateTaskAction, "was called");
  });

  it("should create a task in the To Do column", async () => {
    getState.returns({
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

    const mockCreateTaskAction = () => Promise.resolve("NewTaskId");
    const mockUpdateColumnAction = sinon
      .stub()
      .named("mockCreateTaskAction")
      .resolves(true);
    const createTaskInColumn = createCreateTaskInColumnAction(
      mockUpdateColumnAction,
      mockCreateTaskAction
    );
    await createTaskInColumn()(dispatch, getState);

    return expect(
      mockUpdateColumnAction,
      "to have a call exhaustively satisfying",
      [
        "1",
        {
          id: "1",
          name: "To Do",
          tasks: ["NewTaskId"]
        }
      ]
    );
  });
});
