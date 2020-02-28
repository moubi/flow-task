import expect from "../../testUtils/unexpected-react";
import React from "react";

import Loader from "./Loader";

describe("Loader", () => {
  it("should render default", () => {
    return expect(
      <Loader />,
      "when mounted",
      "to exhaustively satisfy",
      <div className="Loader">Loading...</div>
    );
  });
});
