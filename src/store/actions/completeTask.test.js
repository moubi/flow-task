import expect from "../../testUtils/unexpected-react";
import sinon from "sinon";

import { createCompleteTaskAction } from "./completeTask";

describe("completeTask", () => {
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
    const deleteTask = createCompleteTaskAction(mockUpdateColumnAction);
    const wasSuccessful = await deleteTask("TaskId")(dispatch, getState);

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
    const deleteTask = createCompleteTaskAction(mockUpdateColumnAction);
    await deleteTask("TaskId")(dispatch, getState);

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

  it("should add task to Done column", async () => {
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
    const deleteTask = createCompleteTaskAction(mockUpdateColumnAction);
    await deleteTask("TaskId")(dispatch, getState);

    return expect(
      mockUpdateColumnAction,
      "to have a call exhaustively satisfying",
      [
        "3",
        {
          id: "3",
          name: "Done",
          tasks: ["TaskId"]
        }
      ]
    );
  });
});
