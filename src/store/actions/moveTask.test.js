import expect from "../../testUtils/unexpected-react";
import sinon from "sinon";

import { createMoveTaskAction } from "./moveTask";

describe("moveTask", () => {
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

  it("should not update parent column", async () => {
    getState.returns({
      columns: {},
      tasks: {}
    });

    const mockUpdateColumnAction = () => Promise.resolve(true);
    const moveTask = createMoveTaskAction(mockUpdateColumnAction);
    const wasSuccessful = await moveTask("TaskId", "2", 0)(dispatch, getState);

    return expect(wasSuccessful, "to be false");
  });

  it("should remove task from its parent column", async () => {
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
      },
      tasks: {
        TaskId: {
          id: "TaskId",
          text: "Task 1",
          lastModifiedData: 1234
        }
      }
    });

    const mockUpdateColumnAction = sinon
      .stub()
      .named("mockUpdateColumnAction")
      .resolves(true);
    const moveTask = createMoveTaskAction(mockUpdateColumnAction);
    await moveTask("TaskId", "2", 0)(dispatch, getState);

    return expect(
      mockUpdateColumnAction,
      "to have a call exhaustively satisfying",
      [
        "1",
        {
          id: "1",
          name: "To Do",
          tasks: []
        }
      ]
    );
  });

  it("should add task to the second column", async () => {
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
      },
      tasks: {
        TaskId: {
          id: "TaskId",
          text: "Task 1",
          lastModifiedData: 1234
        }
      }
    });

    const mockUpdateColumnAction = sinon
      .stub()
      .named("mockUpdateColumnAction")
      .resolves(true);
    const moveTask = createMoveTaskAction(mockUpdateColumnAction);
    await moveTask("TaskId", "2", 0)(dispatch, getState);

    return expect(
      mockUpdateColumnAction,
      "to have a call exhaustively satisfying",
      [
        "2",
        {
          id: "2",
          name: "Doing",
          tasks: ["TaskId"]
        }
      ]
    );
  });
});
