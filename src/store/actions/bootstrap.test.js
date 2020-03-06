import expect from "../../testUtils/unexpected-react";
import sinon from "sinon";

import { createBootstrapAction } from "./bootstrap";

describe("bootstrap", () => {
  let dispatch;
  let bootstrap;
  let loadColumnsStub;
  let loadTasksStub;

  beforeEach(() => {
    dispatch = sinon
      .stub()
      .named("dispatch")
      .resolves();

    loadColumnsStub = sinon
      .stub()
      .named("loadColumns")
      .returns({ type: "@columns/LOAD_COLUMNS_REQUEST" });

    loadTasksStub = sinon
      .stub()
      .named("loadTasks")
      .returns({ type: "@tasks/LOAD_TASKS_REQUEST" });

    bootstrap = createBootstrapAction({
      loadColumns: loadColumnsStub,
      loadTasks: loadTasksStub
    });
  });

  it("should return a Promise from the thunk", () => {
    return expect(bootstrap()(dispatch), "to be a", Promise);
  });

  it("should dispatch loadColumns, loadTasks in sequence", () => {
    bootstrap()(dispatch);

    return expect(dispatch, "to have calls satisfying", [
      [loadColumnsStub()],
      [loadTasksStub()]
    ]);
  });
});
