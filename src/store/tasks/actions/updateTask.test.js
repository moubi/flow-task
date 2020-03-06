import expect from "../../../testUtils/unexpected-react";
import sinon from "sinon";

import {
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE
} from "../constants";

import { updateTask } from "./updateTask";

describe("updateTask", () => {
  let dispatch, api;

  beforeEach(() => {
    api = {
      updateTask: sinon.stub().named("updateTask")
    };
    dispatch = sinon.stub().named("dispatch");
  });

  it(`should dispatch ${UPDATE_TASK_REQUEST}`, async () => {
    api.updateTask.returns(Promise.resolve({}));
    await updateTask("1", { text: "Task 1" })(dispatch, null, api);

    expect(dispatch, "to have a call exhaustively satisfying", [
      {
        type: UPDATE_TASK_REQUEST,
        payload: undefined
      }
    ]);
  });

  it(`should dispatch ${UPDATE_TASK_SUCCESS}`, async () => {
    api.updateTask.returns(Promise.resolve({}));
    const wasSuccessful = await updateTask("1", { text: "Task 1" })(
      dispatch,
      null,
      api
    );

    expect(wasSuccessful, "to be true").then(
      expect(dispatch, "to have a call exhaustively satisfying", [
        {
          type: UPDATE_TASK_SUCCESS,
          payload: {
            id: "1",
            text: "Task 1",
            lastModifiedDate: expect.it("to be a number")
          }
        }
      ])
    );
  });

  it(`should dispatch ${UPDATE_TASK_FAILURE}`, async () => {
    const error = new Error("Error message");
    api.updateTask.returns(Promise.reject(error));

    const wasSuccessful = await updateTask("1", { text: "Task 1" })(
      dispatch,
      null,
      api
    );

    expect(wasSuccessful, "to be false").then(
      expect(dispatch, "to have a call satisfying", [
        {
          type: UPDATE_TASK_FAILURE,
          payload: undefined
        }
      ])
    );
  });

  it("should call the api with the correct parameter", async () => {
    api.updateTask.returns(Promise.resolve({}));

    await updateTask("1", { text: "Task 1" })(dispatch, null, api);

    expect(api.updateTask, "to have a call exhaustively satisfying", [
      "1",
      {
        id: "1",
        text: "Task 1",
        lastModifiedDate: expect.it("to be a number")
      }
    ]);
  });
});
