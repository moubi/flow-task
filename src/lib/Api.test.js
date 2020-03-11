import expect from "../testUtils/unexpected-react";

import Api from "./Api";

describe("Api", () => {
  const api = Api;

  it("should load all columns", async () => {
    expect(api.loadColumns, "to be a function");
  });
});
