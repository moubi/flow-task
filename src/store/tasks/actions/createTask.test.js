import expect from "../../../testUtils/unexpected-react";
import sinon from "sinon";

import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE
} from "../constants";

import { createTask } from "./createTask";

describe("createTask", () => {
  let dispatch, api;

  beforeEach(() => {
    api = {
      createTask: sinon.stub().named("createTask")
    };
    dispatch = sinon.stub().named("dispatch");
  });

  it(`should dispatch ${CREATE_TASK_REQUEST}`, async () => {
    api.createTask.returns(Promise.resolve({}));
    await createTask()(dispatch, null, api);

    expect(dispatch, "to have a call exhaustively satisfying", [
      {
        type: CREATE_TASK_REQUEST,
        payload: undefined
      }
    ]);
  });

  it(`should dispatch ${CREATE_TASK_SUCCESS}`, async () => {
    api.createTask.returns(
      Promise.resolve({
        id: "1",
        text: "",
        lastModifiedDate: 1234
      })
    );
    const wasSuccessful = await createTask()(dispatch, null, api);

    expect(wasSuccessful, "to be a string").then(
      expect(dispatch, "to have a call exhaustively satisfying", [
        {
          type: CREATE_TASK_SUCCESS,
          payload: {
            id: "1",
            text: "",
            lastModifiedDate: 1234
          }
        }
      ])
    );
  });

  it(`should dispatch ${CREATE_TASK_FAILURE}`, async () => {
    const error = new Error("Error message");
    api.createTask.returns(Promise.reject(error));

    const wasSuccessful = await createTask()(dispatch, null, api);

    expect(wasSuccessful, "to be false").then(
      expect(dispatch, "to have a call satisfying", [
        {
          type: CREATE_TASK_FAILURE,
          payload: undefined
        }
      ])
    );
  });

  it("should call the api with the correct parameter", async () => {
    api.createTask.returns(Promise.resolve({}));

    await createTask()(dispatch, null, api);

    expect(api.createTask, "to have a call exhaustively satisfying", [
      {
        id: expect.it("to be a string"),
        text: "",
        lastModifiedDate: expect.it("to be a number")
      }
    ]);
  });
});
