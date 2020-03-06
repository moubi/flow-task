import expect from "../../../testUtils/unexpected-react";
import sinon from "sinon";

import {
  UPDATE_COLUMN_REQUEST,
  UPDATE_COLUMN_SUCCESS,
  UPDATE_COLUMN_FAILURE
} from "../constants";

import { updateColumn } from "./updateColumn";

describe("updateColumn", () => {
  let dispatch, api;

  beforeEach(() => {
    api = {
      updateColumn: sinon.stub().named("updateColumn")
    };
    dispatch = sinon.stub().named("dispatch");
  });

  it(`should dispatch ${UPDATE_COLUMN_REQUEST}`, async () => {
    api.updateColumn.returns(Promise.resolve({}));
    await updateColumn("1", { id: "1", name: "To Do", tasks: [] })(
      dispatch,
      null,
      api
    );

    expect(dispatch, "to have a call exhaustively satisfying", [
      {
        type: UPDATE_COLUMN_REQUEST,
        payload: undefined
      }
    ]);
  });

  it(`should dispatch ${UPDATE_COLUMN_SUCCESS}`, async () => {
    api.updateColumn.returns(Promise.resolve({}));
    const wasSuccessful = await updateColumn("1", {
      id: "1",
      name: "To Do",
      tasks: []
    })(dispatch, null, api);

    expect(wasSuccessful, "to be true").then(
      expect(dispatch, "to have a call exhaustively satisfying", [
        {
          type: UPDATE_COLUMN_SUCCESS,
          payload: {
            id: "1",
            name: "To Do",
            tasks: []
          }
        }
      ])
    );
  });

  it(`should dispatch ${UPDATE_COLUMN_FAILURE}`, async () => {
    const error = new Error("Error message");
    api.updateColumn.returns(Promise.reject(error));

    const wasSuccessful = await updateColumn("1", {
      id: "1",
      name: "To Do",
      tasks: []
    })(dispatch, null, api);

    expect(wasSuccessful, "to be false").then(
      expect(dispatch, "to have a call satisfying", [
        {
          type: UPDATE_COLUMN_FAILURE,
          payload: undefined
        }
      ])
    );
  });

  it("should call the api with the correct parameter", async () => {
    api.updateColumn.returns(Promise.resolve({}));

    await updateColumn("1", { id: "1", name: "To Do", tasks: [] })(
      dispatch,
      null,
      api
    );

    expect(api.updateColumn, "to have a call exhaustively satisfying", [
      "1",
      {
        id: "1",
        name: "To Do",
        tasks: []
      }
    ]);
  });
});
