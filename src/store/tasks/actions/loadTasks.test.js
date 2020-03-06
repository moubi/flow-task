import expect from "../../../testUtils/unexpected-react";
import sinon from "sinon";

import {
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAILURE
} from "../constants";

import { loadTasks } from "./loadTasks";

describe("loadTasks", () => {
  let dispatch, api;

  beforeEach(() => {
    api = {
      loadTasks: sinon.stub().named("loadTasks")
    };
    dispatch = sinon.stub().named("dispatch");
  });

  it(`should dispatch ${LOAD_TASKS_REQUEST}`, async () => {
    api.loadTasks.returns(Promise.resolve({}));
    await loadTasks()(dispatch, null, api);

    expect(dispatch, "to have a call exhaustively satisfying", [
      {
        type: LOAD_TASKS_REQUEST,
        payload: undefined
      }
    ]);
  });

  it(`should dispatch ${LOAD_TASKS_SUCCESS}`, async () => {
    api.loadTasks.returns(
      Promise.resolve({
        "1": {
          id: "1",
          text: "Task 1",
          lastModifiedDate: 1234
        },
        "2": {
          id: "2",
          text: "Task 2",
          lastModifiedDate: 3245
        }
      })
    );
    const wasSuccessful = await loadTasks()(dispatch, null, api);

    expect(wasSuccessful, "to be true").then(
      expect(dispatch, "to have a call exhaustively satisfying", [
        {
          type: LOAD_TASKS_SUCCESS,
          payload: {
            "1": {
              id: "1",
              text: "Task 1",
              lastModifiedDate: 1234
            },
            "2": {
              id: "2",
              text: "Task 2",
              lastModifiedDate: 3245
            }
          }
        }
      ])
    );
  });

  it(`should dispatch ${LOAD_TASKS_FAILURE}`, async () => {
    const error = new Error("Error message");
    api.loadTasks.returns(Promise.reject(error));

    const wasSuccessful = await loadTasks()(dispatch, null, api);

    expect(wasSuccessful, "to be false").then(
      expect(dispatch, "to have a call satisfying", [
        {
          type: LOAD_TASKS_FAILURE,
          payload: undefined
        }
      ])
    );
  });

  it("should call the api with the correct parameter", async () => {
    api.loadTasks.returns(Promise.resolve({}));

    await loadTasks()(dispatch, null, api);

    expect(api.loadTasks, "to have a call exhaustively satisfying", []);
  });
});
