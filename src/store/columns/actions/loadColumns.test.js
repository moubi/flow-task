import expect from "../../../testUtils/unexpected-react";
import sinon from "sinon";

import {
  LOAD_COLUMNS_REQUEST,
  LOAD_COLUMNS_SUCCESS,
  LOAD_COLUMNS_FAILURE
} from "../constants";

import { loadColumns } from "./loadColumns";

describe("loadColumns", () => {
  let dispatch, api;

  beforeEach(() => {
    api = {
      loadColumns: sinon.stub().named("loadColumns")
    };
    dispatch = sinon.stub().named("dispatch");
  });

  it(`should dispatch ${LOAD_COLUMNS_REQUEST}`, async () => {
    api.loadColumns.returns(Promise.resolve({}));
    await loadColumns()(dispatch, null, api);

    expect(dispatch, "to have a call exhaustively satisfying", [
      {
        type: LOAD_COLUMNS_REQUEST,
        payload: undefined
      }
    ]);
  });

  it(`should dispatch ${LOAD_COLUMNS_SUCCESS}`, async () => {
    api.loadColumns.returns(
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
    const wasSuccessful = await loadColumns()(dispatch, null, api);

    expect(wasSuccessful, "to be true").then(
      expect(dispatch, "to have a call exhaustively satisfying", [
        {
          type: LOAD_COLUMNS_SUCCESS,
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

  it(`should dispatch ${LOAD_COLUMNS_FAILURE}`, async () => {
    const error = new Error("Error message");
    api.loadColumns.returns(Promise.reject(error));

    const wasSuccessful = await loadColumns()(dispatch, null, api);

    expect(wasSuccessful, "to be false").then(
      expect(dispatch, "to have a call satisfying", [
        {
          type: LOAD_COLUMNS_FAILURE,
          payload: undefined
        }
      ])
    );
  });

  it("should call the api with the correct parameter", async () => {
    api.loadColumns.returns(Promise.resolve({}));

    await loadColumns()(dispatch, null, api);

    expect(api.loadColumns, "to have a call exhaustively satisfying", []);
  });
});
